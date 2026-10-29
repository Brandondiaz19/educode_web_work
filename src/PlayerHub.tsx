import { useEffect, useState, type FormEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { learningGuides } from './docs/learningGuides'
import './PlayerHub.css'

type Progress = {
  current_mission_id: string | null
  completed_missions: unknown
  unlocked_knowledge: unknown
  minerals_ship: number | null
  minerals_spid: number | null
  map_tier: number | null
  updated_at: string | null
}
const safeList = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
const readable = (id: string) => id.replace(/_/g, ' ')

export default function PlayerHub() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(false)
  const [progressError, setProgressError] = useState('')

  useEffect(() => {
    if (!supabase) { setChecking(false); return }
    const client = supabase
    let active = true
    void client.auth.getUser().then(({ data, error }) => {
      if (active) { setUser(error ? null : data.user); setChecking(false) }
    }).catch(() => { if (active) { setUser(null); setChecking(false) } })
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null)
    })
    return () => { active = false; data.subscription.unsubscribe() }
  }, [])

  useEffect(() => {
    if (!supabase || !user) { setProgress(null); setProgressError(''); return }
    const client = supabase
    let active = true
    const userId = user.id
    setLoadingProgress(true)
    setProgress(null)
    setProgressError('')
    // Sólo consulta la fila del usuario autenticado, además de las restricciones RLS del servidor.
    void client.from('player_progress')
      .select('current_mission_id,completed_missions,unlocked_knowledge,minerals_ship,minerals_spid,map_tier,updated_at')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        setLoadingProgress(false)
        if (error) {
          setProgressError('No fue posible consultar el progreso. Verifica que esta web use el mismo proyecto Supabase que el juego y que RLS permita leer solo los datos propios.')
        } else setProgress(data as Progress | null)
      })
    return () => { active = false }
  }, [user?.id])

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || authBusy) return
    setAuthBusy(true); setNotice('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      setPassword('')
      if (error) setNotice('No se pudo iniciar sesión. Revisa tus credenciales.')
    } catch { setNotice('No se pudo conectar con el servicio de autenticación.') }
    finally { setAuthBusy(false) }
  }

  async function signOut() {
    if (!supabase || authBusy) return
    setAuthBusy(true)
    const { error } = await supabase.auth.signOut()
    setAuthBusy(false)
    if (error) setNotice('No se pudo cerrar sesión. Inténtalo nuevamente.')
    else { setUser(null); setProgress(null); setNotice('Sesión cerrada.') }
  }

  return <div className="spido-hub">
    <a className="spido-hub-skip" href="#hub-content">Saltar al contenido</a>
    <header className="spido-hub-header"><div className="spido-hub-container spido-hub-nav">
      <a href="/" className="spido-hub-logo">SPIDO<span>CODE</span></a>
      <nav aria-label="Navegación"><a href="/">Inicio</a><a href="/docs">Archivo A.D.A.</a></nav>
    </div></header>
    <main id="hub-content" className="spido-hub-container spido-hub-main">
      <p className="spido-hub-kicker">CENTRO DE CONTROL // PERFIL DEL JUGADOR</p>
      <h1>Tu aventura, <span>tu progreso.</span></h1>
      <p className="spido-hub-lead">Consulta los datos guardados de tu partida de SpidoCode. Este panel no modifica misiones, minerales ni inventario.</p>
      {!supabase ? <section className="spido-hub-panel" role="status"><h2>Configuración pendiente</h2><p>El portal aún no tiene configuradas sus variables públicas de Supabase. No se puede acceder al perfil.</p></section>
      : checking ? <p role="status">Comprobando sesión…</p>
      : !user ? <section className="spido-hub-panel spido-hub-auth">
          <h2>Inicia sesión</h2><p>Usa la misma cuenta que utilizas en el videojuego.</p>
          <form onSubmit={signIn}>
            <label>Correo electrónico<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button type="submit" disabled={authBusy}>{authBusy ? 'Ingresando…' : 'Entrar a mi perfil'}</button>
          </form>
          <p className="spido-hub-note">Las credenciales se procesan mediante Supabase Auth. Nunca aparecen en la URL ni se registran en esta página.</p>
        </section>
      : <section aria-label="Progreso del jugador">
          <div className="spido-hub-account"><div><small>CUENTA CONECTADA</small><strong>{user.email ?? 'Cuenta de jugador'}</strong></div><button type="button" disabled={authBusy} onClick={signOut}>Cerrar sesión</button></div>
          {loadingProgress ? <p role="status">Cargando progreso…</p>
          : progressError ? <div className="spido-hub-panel" role="alert"><h2>Progreso no disponible</h2><p>{progressError}</p></div>
          : !progress ? <div className="spido-hub-panel" role="status"><h2>Sin partida sincronizada</h2><p>Esta cuenta todavía no tiene una partida remota registrada. Abre SpidoCode con esa cuenta para generar progreso.</p></div>
          : <>
              <div className="spido-hub-stats">
                <article><small>MISIÓN ACTUAL</small><strong>{progress.current_mission_id ? readable(progress.current_mission_id) : 'Sin datos'}</strong></article>
                <article><small>MISIONES COMPLETADAS</small><strong>{safeList(progress.completed_missions).length}</strong></article>
                <article><small>MINERALES EN NAVE</small><strong>{progress.minerals_ship ?? 'Sin datos'}</strong></article>
                <article><small>MINERALES DE SPID</small><strong>{progress.minerals_spid ?? 'Sin datos'}</strong></article>
                <article><small>NIVEL DEL MAPA</small><strong>{progress.map_tier ?? 'Sin datos'}</strong></article>
                <article><small>CONOCIMIENTOS</small><strong>{safeList(progress.unlocked_knowledge).length}</strong></article>
              </div>
              <section className="spido-hub-panel" aria-labelledby="hub-codex-heading">
                <div className="spido-hub-codex-heading">
                  <div><p className="spido-hub-kicker">ARCHIVO A.D.A. // SINCRONIZADO</p><h2 id="hub-codex-heading">Tu Códice de programación</h2></div>
                  <span className="spido-hub-codex-total">{learningGuides.filter((guide) => safeList(progress.unlocked_knowledge).includes(guide.id)).length} / {learningGuides.length} guías disponibles</span>
                </div>
                <p>Los conocimientos desbloqueados se leen de tu partida. Puedes estudiar sus guías sin modificar el progreso del juego.</p>
                <div className="spido-hub-codex-grid">
                  {learningGuides.map((guide) => {
                    const unlocked = safeList(progress.unlocked_knowledge).includes(guide.id)
                    return <article key={guide.id} className={`spido-hub-codex-card ${unlocked ? 'is-unlocked' : 'is-locked'}`}>
                      <span>{guide.group} · {unlocked ? 'Desbloqueado' : 'Pendiente en el juego'}</span>
                      <h3>{guide.title}</h3>
                      <p>{unlocked ? guide.summary : 'Continúa avanzando en SpidoCode para desbloquear este conocimiento.'}</p>
                      {unlocked && <a href={`/docs?tema=${encodeURIComponent(guide.id)}#guias`}>Estudiar con A.D.A. ↗</a>}
                    </article>
                  })}
                </div>
                {safeList(progress.unlocked_knowledge).some((id) => !learningGuides.some((guide) => guide.id === id)) &&
                  <p className="spido-hub-note">Otros conocimientos registrados: {safeList(progress.unlocked_knowledge).filter((id) => !learningGuides.some((guide) => guide.id === id)).map(readable).join(', ')}. Todavía no tienen guía web publicada.</p>}
              </section>
              <p className="spido-hub-note">Última sincronización registrada: {progress.updated_at ? new Date(progress.updated_at).toLocaleString('es-CL') : 'Sin datos'}. Solo lectura.</p>
            </>}
        </section>}
      {notice && <p role="status" className="spido-hub-notice">{notice}</p>}
    </main>
    <footer className="spido-hub-footer"><div className="spido-hub-container"><span>© 2026 SPIDOCODE</span><a href="/">Volver al inicio ↑</a></div></footer>
  </div>
}
