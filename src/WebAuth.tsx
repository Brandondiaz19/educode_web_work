import { useState, type FormEvent } from 'react'
import { supabase } from './lib/supabase'
import './WebAuth.css'

export default function WebAuth({ mode }: { mode: 'register' | 'login' }) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [busy,setBusy] = useState(false)
  const [status,setStatus] = useState('')
  const [complete,setComplete] = useState(false)
  const registering = mode === 'register'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(!supabase || busy) return
    setStatus('')
    if(registering && password!==confirm){setStatus('Las contraseñas no coinciden.');return}
    if(registering && password.length<6){setStatus('La contraseña debe tener al menos 6 caracteres.');return}
    setBusy(true)
    try{
      if(registering){
        // Volver al dominio actual tras confirmar el correo.
        const {data,error}=await supabase.auth.signUp({
          email:email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
          },
        })
        if(error) throw error
        setComplete(true)
        setStatus(data.session ? 'Cuenta creada. Vuelve a SpidoCode e inicia sesión con las mismas credenciales.' : 'Solicitud recibida. Si es una cuenta nueva, revisa tu correo para confirmar el registro. Después vuelve a SpidoCode e inicia sesión.')
      }else{
        const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password})
        if(error) throw error
        setComplete(true)
        setStatus('Sesión iniciada. Puedes consultar tu progreso o volver al videojuego.')
      }
    }catch{
      setStatus(registering?'No fue posible completar el registro. Comprueba los datos o inténtalo más tarde.':'No fue posible iniciar sesión. Revisa tus credenciales.')
    }finally{setBusy(false);setPassword('');setConfirm('')}
  }
  return <div className="spido-web-auth">
    <a className="spido-auth-skip" href="#auth-main">Saltar al contenido</a>
    <header className="spido-auth-header"><div className="spido-auth-container"><a className="spido-auth-logo" href="/">SPIDO<span>CODE</span></a><nav aria-label="Navegación"><a href="/">Inicio</a><a href="/perfil">Mi progreso</a></nav></div></header>
    <main id="auth-main" className="spido-auth-container spido-auth-main">
      <div className="spido-auth-intro"><p className="spido-auth-kicker">CUENTA DE EXPLORADOR // SPIDOCODE</p><h1>{registering?'Únete a la':'Bienvenido de'} <span>{registering?'misión.':'vuelta.'}</span></h1><p>La misma cuenta funciona en el videojuego y en tu perfil web. No necesitas registrarte dos veces.</p></div>
      <section className="spido-auth-card" aria-label={registering?'Crear cuenta':'Iniciar sesión'}>
        <h2>{registering?'Crear una cuenta':'Iniciar sesión'}</h2>
        {!supabase?<p role="alert">La autenticación web todavía no está configurada. No es posible crear cuentas en este entorno.</p>:complete?<div role="status"><p>{status}</p><a className="spido-auth-primary" href={registering ? '/login' : '/perfil'}>{registering ? 'Ir a iniciar sesión' : 'Ir a mi perfil ↗'}</a></div>:<>
          <form onSubmit={submit} aria-busy={busy}>
            <label>Correo electrónico<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254}/></label>
            <label>Contraseña<input type="password" autoComplete={registering?'new-password':'current-password'} minLength={registering ? 6 : undefined} value={password} onChange={e=>setPassword(e.target.value)} required/></label>
            {registering&&<label>Repetir contraseña<input type="password" autoComplete="new-password" minLength={6} value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label>}
            <button className="spido-auth-primary" disabled={busy} type="submit">{busy?'Procesando…':registering?'Crear cuenta':'Entrar'}</button>
          </form>
          {status&&<p role="alert" className="spido-auth-error">{status}</p>}
        </>}
        <p className="spido-auth-switch">{registering?<>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></>:<>¿Aún no tienes cuenta? <a href="/registro">Regístrate</a></>}</p>
        <p className="spido-auth-hint">Tu cuenta se gestiona mediante Supabase Auth. Nunca compartimos la contraseña con el videojuego por URL.</p>
      </section>
      <aside className="spido-auth-help"><strong>¿Vienes del videojuego?</strong><p>Tras registrarte y confirmar tu correo si se solicita, vuelve a SpidoCode y utiliza las mismas credenciales en «Iniciar sesión».</p></aside>
    </main>
  </div>
}
