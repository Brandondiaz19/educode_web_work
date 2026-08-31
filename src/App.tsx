import { FormEvent, useEffect, useMemo, useState } from 'react'
import menuPerfil from './assets/menu-perfil.png'
import authScreen from './assets/auth.png'
import menuSesion from './assets/menu-sesion.png'
import { supabase } from './lib/supabase'

const brand = {
  bg: '#07111F',
  panel: '#0B1630',
  panelMid: '#101A36',
  purple: '#6C4DFF',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  green: '#4ADE80',
  text: '#F5F7FF',
  muted: '#A7B0C5',
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function StarField({ count = 120 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        dur: `${(Math.random() * 4 + 2).toFixed(1)}s`,
        delay: `${(Math.random() * 5).toFixed(1)}s`,
        opacity: Math.random() * 0.6 + 0.2,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <span
          className="star"
          key={star.id}
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              '--dur': star.dur,
              '--delay': star.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn('rounded flex items-center justify-center', compact ? 'w-8 h-8' : 'w-10 h-10')}
        style={{
          background: 'linear-gradient(135deg, #6C4DFF, #3B82F6)',
          boxShadow: '0 0 20px rgba(108,77,255,.45)',
        }}
      >
        <svg width={compact ? 18 : 22} height={compact ? 18 : 22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M11 2.5L19 7v8l-8 4.5L3 15V7l8-4.5Z" stroke="white" strokeWidth="1.6" />
          <circle cx="11" cy="11" r="3" fill="white" />
          <path d="M11 2.5V8M19 7l-4.8 2.8M3 7l4.8 2.8" stroke="white" strokeWidth="1" opacity=".75" />
        </svg>
      </div>
      <span className="font-display font-bold tracking-[0.12em]" style={{ fontSize: compact ? 17 : 20 }}>
        EDU_<span style={{ color: brand.green }}>CODE</span>
      </span>
    </div>
  )
}

function OfficialLogo({ className }: { className: string }) {
  return <img src="/images/educode-logo.png" alt="Edu_Code" className={cn('block object-contain', className)} />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['Proyecto', '#proyecto'],
    ['Cómo funciona', '#como-funciona'],
    ['Gameplay', '#gameplay'],
    ['Progresión', '#progresion'],
    ['A.D.A.', '#ada'],
  ]

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,17,31,.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : undefined,
        borderBottom: scrolled ? '1px solid rgba(108,77,255,.16)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-5">
        <a href="#inicio" aria-label="Ir al inicio">
          <BrandMark compact />
        </a>
        <div className="hidden lg:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link text-sm">
              {label}
            </a>
          ))}
        </div>
        <a className="btn-outline px-4! py-2! text-sm!" href="#gameplay">
          Ver proyecto
        </a>
      </div>
    </nav>
  )
}

function ScreenshotFrame({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="product-frame group">
      <div className="window-bar">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="window-dot bg-red-400" />
          <span className="window-dot bg-yellow-300" />
          <span className="window-dot bg-green-400" />
        </div>
        <span className="font-mono text-[11px] sm:text-xs truncate" style={{ color: brand.muted }}>
          Edu_Code // {label}
        </span>
        <span className="font-mono text-[10px] ml-auto hidden sm:block" style={{ color: brand.green }}>
          BUILD REAL
        </span>
      </div>
      <img src={src} alt={alt} className="w-full block transition-transform duration-500 group-hover:scale-[1.012]" />
    </div>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28" style={{ background: brand.bg }}>
      <StarField count={170} />
      <div className="absolute inset-0 pointer-events-none nebula-bg" />
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-60" />
      <div className="absolute top-24 left-5 sm:left-8 font-mono text-[10px] sm:text-xs flex items-center gap-2" style={{ color: brand.green }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        SYSTEM ONLINE
      </div>
      <div className="absolute top-24 right-5 sm:right-8 font-mono text-[10px] sm:text-xs hidden md:block" style={{ color: brand.muted }}>
        EDU_CODE // ASTEROID LAB
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 text-center">
        <div className="section-label mb-5">EDU_CODE // LEARNING MISSION</div>
        <OfficialLogo className="mx-auto w-[min(78vw,620px)] h-auto" />
        <h1 className="font-display font-bold leading-[.98]" style={{ fontSize: 'clamp(2.7rem, 7vw, 6.2rem)', letterSpacing: '-0.035em' }}>
          Aprende programación
          <br />
          <span className="gradient-text">controlando tu Rover</span>
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mt-7 leading-7 sm:leading-8" style={{ color: brand.muted }}>
          Escribe código real, ejecútalo y observa cómo tus instrucciones afectan un entorno 3D de minería espacial. Edu_Code convierte conceptos de programación en acciones visibles dentro del juego.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#como-funciona" className="btn-primary"><span>Explorar Edu_Code</span></a>
          <a href="#gameplay" className="btn-outline">Ver implementación real</a>
        </div>

        <div className="mt-14 sm:mt-16 max-w-5xl mx-auto">
          <ScreenshotFrame src={menuPerfil} alt="Menú principal real de Edu_Code con perfil autenticado" label="menú principal" />
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px]" style={{ color: brand.muted }}>
            <span><b style={{ color: brand.green }}>●</b> Supabase Auth</span>
            <span><b style={{ color: brand.cyan }}>●</b> Progreso por usuario</span>
            <span><b style={{ color: brand.purple }}>●</b> Godot 4 / 3D</span>
            <span><b style={{ color: '#f6d365' }}>●</b> Proyecto en desarrollo</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  ['01', 'Aprende el concepto', 'Cada sistema introduce una idea de programación dentro de una misión concreta.'],
  ['02', 'Escribe código', 'El jugador utiliza el editor integrado para darle instrucciones reales al Rover.'],
  ['03', 'Ejecuta', 'El parser interpreta las instrucciones y las conecta con el comportamiento del mundo 3D.'],
  ['04', 'Observa y progresa', 'El resultado aparece en pantalla: movimiento, minería, mejoras y nuevos desbloqueos.'],
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="section-shell">
      <div className="section-heading">
        <div className="section-label">FLUJO DE APRENDIZAJE</div>
        <h2>Del código a una acción visible</h2>
        <p>La idea central de Edu_Code es acortar la distancia entre escribir una instrucción y entender qué provoca.</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-11">
        {steps.map(([number, title, text]) => (
          <article className="card-glow p-6 relative overflow-hidden" key={number}>
            <div className="font-mono text-5xl font-bold absolute -right-1 -top-3 select-none" style={{ color: 'rgba(108,77,255,.13)' }}>{number}</div>
            <div className="font-mono text-xs mb-5" style={{ color: brand.green }}>STEP_{number}</div>
            <h3 className="font-display font-semibold text-xl mb-3">{title}</h3>
            <p className="text-sm leading-6" style={{ color: brand.muted }}>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

const realFeatures = [
  ['Mundo 3D + Rover', 'Entorno construido en Godot 4 con Rover controlado mediante instrucciones del jugador.', 'IMPLEMENTADO'],
  ['Editor de código', 'TextEdit integrado, parser básico y ejecución directa de comandos sobre el Rover.', 'IMPLEMENTADO'],
  ['Minería y mejoras', 'Minerales para el Rover y la nave, tienda de sintaxis y expansión del mapa.', 'IMPLEMENTADO'],
  ['Cuenta y progreso', 'Supabase Auth, RLS y progreso individual cargado y guardado por cuenta.', 'IMPLEMENTADO'],
  ['Modo invitado', 'Nueva partida sin cuenta y sin persistencia remota, separada del progreso autenticado.', 'IMPLEMENTADO'],
  ['A.D.A.', 'Sistema de asistencia pensado para traducir errores y entregar pistas progresivas durante las misiones.', 'EN DESARROLLO'],
]

function ProjectStatus() {
  return (
    <section id="proyecto" className="section-shell pt-4!">
      <div className="section-heading">
        <div className="section-label">ESTADO REAL DEL PROYECTO</div>
        <h2>Una landing conectada con lo que sí existe</h2>
        <p>No hay “200 misiones” inventadas ni promesas de producto terminado. Esta web muestra la implementación actual y el roadmap real de Edu_Code.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
        {realFeatures.map(([title, desc, status]) => (
          <article className="card-glow p-6" key={title}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-display font-semibold text-lg">{title}</h3>
              <span className={cn('status-badge', status === 'IMPLEMENTADO' ? 'status-live' : 'status-dev')}>{status}</span>
            </div>
            <p className="text-sm leading-6" style={{ color: brand.muted }}>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Gameplay() {
  return (
    <section id="gameplay" className="relative py-24 sm:py-28 overflow-hidden" style={{ background: '#060E1A' }}>
      <StarField count={80} />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="section-heading text-left! mx-0!">
          <div className="section-label">IMPLEMENTACIÓN REAL</div>
          <h2>La interfaz que ya corre en Godot</h2>
          <p>Estas capturas corresponden al proyecto actual, no a mockups de una plataforma ficticia.</p>
        </div>
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-6 mt-11 items-start">
          <ScreenshotFrame src={menuSesion} alt="Menú principal de Edu_Code sin sesión iniciada" label="acceso y partida" />
          <ScreenshotFrame src={authScreen} alt="Pantalla de inicio de sesión y registro de Edu_Code" label="Supabase Auth" />
        </div>
        <div className="mt-7 grid md:grid-cols-3 gap-4">
          <Stat value="GODOT 4" label="Motor y mundo 3D" />
          <Stat value="SUPABASE" label="Auth + PostgreSQL + RLS" />
          <Stat value="CLOUD SAVE" label="Carga y guardado por cuenta" />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-5 py-4 rounded-lg border" style={{ background: 'rgba(11,22,48,.7)', borderColor: 'rgba(108,77,255,.18)' }}>
      <div className="font-mono text-sm font-bold" style={{ color: brand.cyan }}>{value}</div>
      <div className="text-sm mt-1" style={{ color: brand.muted }}>{label}</div>
    </div>
  )
}

const roadmap = [
  { label: 'Fundamentos y comandos', state: 'live' },
  { label: 'Minería y recursos', state: 'live' },
  { label: 'Bucles for / while', state: 'live' },
  { label: 'Condicionales', state: 'dev' },
  { label: 'POO avanzada', state: 'next' },
  { label: 'SQL', state: 'next' },
  { label: 'Java', state: 'next' },
]

function Progression() {
  return (
    <section id="progresion" className="section-shell">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="section-label">PROGRESIÓN</div>
          <h2 className="section-title-left">Aprender también desbloquea el mundo</h2>
          <p className="section-copy-left">
            Los minerales sirven como recurso para adquirir nuevas capacidades. La sintaxis desbloqueada y la expansión del mapa forman parte del progreso que Edu_Code ya puede guardar en Supabase para cada usuario.
          </p>
          <div className="mt-7 p-5 rounded-lg border font-mono text-xs leading-6" style={{ background: brand.panel, borderColor: 'rgba(74,222,128,.2)', color: brand.muted }}>
            <span style={{ color: brand.green }}>player_progress</span><br />
            ├── minerals_ship<br />
            ├── minerals_rover<br />
            ├── map_tier<br />
            └── unlocked_syntax
          </div>
        </div>
        <div className="relative p-6 sm:p-8 rounded-2xl border" style={{ background: 'linear-gradient(145deg,#0B1630,#0B1326)', borderColor: 'rgba(108,77,255,.28)' }}>
          <div className="font-mono text-[11px] mb-6" style={{ color: brand.muted }}>SKILL TREE // ROADMAP</div>
          <div className="space-y-3">
            {roadmap.map((item, index) => (
              <div className="flex items-center gap-4" key={item.label}>
                <div className={cn('roadmap-node', `roadmap-${item.state}`)}>{index + 1}</div>
                <div className="flex-1 py-3 border-b" style={{ borderColor: 'rgba(167,176,197,.1)' }}>
                  <div className="font-display font-medium">{item.label}</div>
                  <div className="font-mono text-[10px] mt-1 uppercase tracking-wider" style={{ color: item.state === 'live' ? brand.green : item.state === 'dev' ? '#f6d365' : brand.muted }}>
                    {item.state === 'live' ? 'disponible / base implementada' : item.state === 'dev' ? 'en desarrollo' : 'próximamente'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ADA() {
  return (
    <section id="ada" className="relative py-24 sm:py-28 overflow-hidden" style={{ background: '#060E1A' }}>
      <div className="absolute inset-0 nebula-bg opacity-70" />
      <StarField count={70} />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-center">
          <div className="ada-orb-wrap">
            <div className="ada-orb hologram">
              <span className="font-display font-bold text-4xl" style={{ color: brand.cyan }}>A.D.A.</span>
            </div>
            <div className="font-mono text-[10px] mt-5 text-center" style={{ color: brand.green }}>ASSISTANCE MODULE // ROADMAP</div>
          </div>
          <div>
            <div className="section-label">SISTEMA DE ASISTENCIA</div>
            <h2 className="section-title-left">Errores convertidos en pistas, no en paredes</h2>
            <p className="section-copy-left">
              A.D.A. está diseñado para interpretar errores del código y responder con mensajes progresivos y contextualizados. La meta es acompañar el aprendizaje sin entregar la solución completa de inmediato.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {['Errores de sintaxis amigables', 'Pistas progresivas', 'Contexto de la misión', 'Asistencia sin resolver por ti'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm p-3 rounded border" style={{ borderColor: 'rgba(34,211,238,.15)', background: 'rgba(34,211,238,.04)', color: brand.muted }}>
                  <span style={{ color: brand.cyan }}>◇</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Technologies() {
  const tech = ['Godot 4', 'GDScript', 'Supabase', 'PostgreSQL', 'RLS', 'GitHub', 'React', 'TypeScript']
  return (
    <section className="section-shell py-20!">
      <div className="section-heading">
        <div className="section-label">STACK</div>
        <h2>Un proyecto educativo, también construido como software real</h2>
      </div>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {tech.map((item) => <span className="tech-chip" key={item}>{item}</span>)}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative py-24 overflow-hidden border-y" style={{ background: brand.panel, borderColor: 'rgba(108,77,255,.15)' }}>
      <StarField count={50} />
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="relative max-w-3xl mx-auto text-center px-5">
        <div className="section-label mb-4">MISIÓN EN CURSO</div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl">Edu_Code está en desarrollo activo.</h2>
        <p className="mt-5 leading-7" style={{ color: brand.muted }}>
          El foco actual está en consolidar gameplay, progresión, persistencia en la nube y la experiencia educativa antes de convertir la landing en un producto público definitivo.
        </p>
        <a href="#inicio" className="btn-primary inline-block mt-8"><span>Volver a misión principal</span></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-9" style={{ background: '#040A13' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <BrandMark compact />
        <div className="font-mono text-[10px] text-center sm:text-right leading-5" style={{ color: '#63708A' }}>
          © 2026 EDU_CODE · PROYECTO UNIVERSITARIO<br />
          GODOT + SUPABASE // SYSTEM ONLINE
        </div>
      </div>
    </footer>
  )
}

function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
}) {
  const [visible, setVisible] = useState(false)
  return (
    <label className="block">
      <span className="reset-label">{label}</span>
      <div className="relative">
        <input
          className="reset-input pr-20!"
          type={visible ? 'text' : 'password'}
          value={value}
          minLength={6}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          required
        />
        <button type="button" className="password-toggle" onClick={() => setVisible((old) => !old)}>
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </label>
  )
}

function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'checking' | 'ready' | 'submitting' | 'success' | 'invalid'>('checking')
  const [message, setMessage] = useState('Validando enlace de recuperación…')

  useEffect(() => {
    const client = supabase
    if (!client) {
      setStatus('invalid')
      setMessage('La página todavía no tiene configuradas las variables públicas de Supabase.')
      return
    }

    let active = true
    const validateSession = async () => {
      const { data, error } = await client.auth.getSession()
      if (!active) return
      if (error || !data.session) {
        setStatus('invalid')
        setMessage('El enlace no contiene una sesión de recuperación válida o ya expiró.')
      } else {
        setStatus('ready')
        setMessage('Crea una contraseña nueva para tu cuenta de Edu_Code.')
      }
    }

    const { data: listener } = client.auth.onAuthStateChange((event, session) => {
      if (!active) return
      if (event === 'PASSWORD_RECOVERY' && session) {
        setStatus('ready')
        setMessage('Crea una contraseña nueva para tu cuenta de Edu_Code.')
      }
    })
    void validateSession()
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (status !== 'ready') return

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.')
      return
    }

    if (!supabase) {
      setStatus('invalid')
      setMessage('La página todavía no tiene configuradas las variables públicas de Supabase.')
      return
    }

    setStatus('submitting')
    setMessage('Actualizando contraseña…')

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error

      window.history.replaceState({}, document.title, '/reset-password')
      setStatus('success')
      setMessage('Tu contraseña fue actualizada correctamente. Ya puedes volver a Edu_Code e iniciar sesión.')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setStatus('ready')
      const raw = error instanceof Error ? error.message : 'No fue posible actualizar la contraseña.'
      if (/expired|invalid.*token|jwt/i.test(raw)) {
        setStatus('invalid')
        setMessage('El enlace expiró o ya no es válido. Solicita un correo de recuperación nuevo desde Edu_Code.')
      } else {
        setMessage('No pudimos actualizar la contraseña. Inténtalo nuevamente en unos segundos.')
      }
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-5 py-16" style={{ background: brand.bg }}>
      <StarField count={150} />
      <div className="absolute inset-0 nebula-bg" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-8 right-6 font-mono text-[10px] hidden sm:flex items-center gap-2" style={{ color: brand.green }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> AUTH CHANNEL ONLINE
      </div>

      <section className="reset-card relative z-10 w-full max-w-md">
        <OfficialLogo className="mx-auto w-[min(58vw,240px)] h-auto" />
        <div className="font-mono text-[10px] tracking-[.18em] uppercase" style={{ color: brand.green }}>SECURE RECOVERY // EDU_CODE</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-3">Restablecer contraseña</h1>
        <p className="mt-3 text-sm leading-6" style={{ color: brand.muted }}>{message}</p>

        {status === 'success' ? (
          <div className="mt-7 rounded-lg border p-5" style={{ borderColor: 'rgba(74,222,128,.28)', background: 'rgba(74,222,128,.06)' }}>
            <div className="font-display font-semibold" style={{ color: brand.green }}>Contraseña actualizada ✓</div>
            <p className="text-sm mt-2 leading-6" style={{ color: brand.muted }}>Puedes cerrar esta pestaña y volver al juego.</p>
          </div>
        ) : status === 'invalid' ? (
          <div className="mt-7 rounded-lg border p-5" style={{ borderColor: 'rgba(248,113,113,.3)', background: 'rgba(248,113,113,.06)' }}>
            <div className="font-display font-semibold text-red-300">Enlace no disponible</div>
            <p className="text-sm mt-2 leading-6" style={{ color: brand.muted }}>Vuelve a Edu_Code y solicita “¿Olvidaste tu contraseña?” nuevamente.</p>
          </div>
        ) : (
          <form className="mt-7 space-y-5" onSubmit={submit}>
            <PasswordField label="Nueva contraseña" value={password} onChange={setPassword} autoComplete="new-password" />
            <PasswordField label="Confirmar contraseña" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />
            <div className="text-[11px] font-mono" style={{ color: '#74809A' }}>MIN_LENGTH: 6 // CREDENTIALS ENCRYPTED IN TRANSIT</div>
            <button className="btn-primary w-full" type="submit" disabled={status === 'checking' || status === 'submitting'}>
              <span>{status === 'submitting' ? 'Actualizando…' : 'Actualizar contraseña'}</span>
            </button>
          </form>
        )}

        <div className="mt-7 pt-5 border-t flex justify-between gap-3 font-mono text-[10px]" style={{ borderColor: 'rgba(167,176,197,.12)', color: '#74809A' }}>
          <span>SUPABASE AUTH</span><span>SECURE RESET FLOW</span>
        </div>
      </section>
    </main>
  )
}

function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ProjectStatus />
        <Gameplay />
        <Progression />
        <ADA />
        <Technologies />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  if (pathname === '/reset-password') return <ResetPasswordPage />
  return <LandingPage />
}
