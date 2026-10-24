import { FormEvent, useEffect, useMemo, useState } from 'react'
import { supabase } from './lib/supabase'

const brand = {
  bg: '#07111F',
  panel: '#0B1630',
  panelMid: '#101A36',
  purple: '#6C4DFF',
  purpleLight: '#8B5CF6',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  green: '#4ADE80',
  phosphor: '#00FF66',
  amber: '#F59E0B',
  gold: '#FFD700',
  text: '#F5F7FF',
  muted: '#A7B0C5',
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function StarField({ count = 100 }: { count?: number }) {
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
    <span className={cn('spido-wordmark', compact && 'spido-wordmark-compact')} aria-label="SPIDOCODE">
      SPIDO<span>CODE</span>
    </span>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    ['El juego', '#juego'],
    ['Cómo se juega', '#como-jugar'],
    ['Misiones', '#misiones'],
    ['Documentación', '#documentacion'],
    ['Equipo', '#equipo'],
  ]
  return (
    <header className="spido-nav">
      <div className="spido-container spido-nav-row">
        <a href="#inicio" aria-label="SPIDOCODE — Inicio" onClick={() => setOpen(false)}><BrandMark compact /></a>
        <button className="spido-menu-toggle" type="button" aria-expanded={open} aria-controls="landing-navigation" onClick={() => setOpen(!open)}>
          {open ? 'Cerrar menú −' : 'Menú +'}
        </button>
        <nav id="landing-navigation" aria-label="Navegación principal" className={cn('spido-nav-links', open && 'is-open')}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              document.querySelector<HTMLButtonElement>('.spido-menu-toggle')?.focus()
            }
          }}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <span className="spido-nav-status"><span aria-hidden="true">●</span> En desarrollo</span>
      </div>
    </header>
  )
}

function SectionHeader({
  badge,
  badgeType = 'purple',
  doodle,
  title,
  subtitle,
}: {
  badge: string
  badgeType?: 'purple' | 'cyan' | 'green'
  doodle?: string
  title: string
  subtitle?: string
}) {
  const pillClass =
    badgeType === 'purple' ? 'pill-purple' : badgeType === 'cyan' ? 'pill-cyan' : 'pill-green'

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
        <div className={cn('pill-badge', pillClass)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
          {badge}
        </div>
        {doodle && (
          <span className="font-doodle text-xl text-green-400/90 tracking-wide select-none">
            {doodle}
          </span>
        )}
      </div>
      <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-100 tracking-tight leading-snug">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">{subtitle}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section id="inicio" className="spido-hero">
      <StarField count={65} />
      <div className="spido-container relative">
        <div className="spido-hero-layout">
          <div className="spido-hero-copy">
            <div className="spido-eyebrow"><span aria-hidden="true">＋</span> UNA MISIÓN. TU CÓDIGO.</div>
            <div className="spido-hero-brand"><BrandMark /></div>
            <h1>Aprende programación.<br /><span>Explora un nuevo mundo.</span></h1>
            <p>Programa junto a Spid. Explora un entorno espacial, resuelve misiones y aprende con cada intento.</p>
        <div className="spido-actions">
          <a href="#juego" className="spido-button">Conocer el juego <span aria-hidden="true">↗</span></a>
          <a href="#documentacion" className="spido-button spido-button-secondary">Documentación <span aria-hidden="true">↓</span></a>
        </div>
            <div className="spido-hero-companion"><span>SPID / TU COMPAÑERO</span><p>Un pequeño robot con aspecto de computador y patas. Una gran aventura por descubrir.</p></div>
          </div>
        <figure className="spido-capture">
          <div className="spido-capture-bar"><span><span className="spido-live-dot" aria-hidden="true" /> SPIDOCODE / ARTE OFICIAL</span><span>MENÚ DEL JUEGO</span></div>
          <img src="/images/spidocode/menu-spid.png" alt="Spid, robot con pantalla y patas, sobre un asteroide low-poly con cristales verdes y fondo espacial violeta" width="1672" height="941" fetchPriority="high" />
          <figcaption><span>SPID Y SU MUNDO</span><span>Fondo oficial del menú de SPIDOCODE.</span></figcaption>
        </figure>
        </div>
        <div className="spido-hero-footer"><span>APRENDER HACIENDO</span><span>CÓDIGO + EXPLORACIÓN + PROGRESIÓN</span><a href="#juego">Explorar <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  )
}

function GameExperience() {
  return (
    <>
      <section id="juego" className="spido-container spido-section">
        <div className="spido-section-intro">
          <p className="spido-eyebrow">01 / EL JUEGO</p>
          <h2>Pequeñas instrucciones.<br /><span>Grandes descubrimientos.</span></h2>
          <p>SPIDOCODE combina programación y exploración espacial. El código deja de ser algo abstracto: se convierte en movimiento, recursos y nuevas posibilidades dentro del mundo.</p>
        </div>
        <div className="spido-experience-grid">
          <article className="spido-feature spido-feature-spid">
            <span className="spido-feature-number">01 / SPID</span>
            <img className="spido-character-art" src="/images/spidocode/menu-spid.png" alt="Spid en el arte oficial del menú del videojuego" width="1672" height="941" loading="lazy" />
            <h3>Conoce a Spid.</h3>
            <p>Un robot con aspecto de computador y patas, listo para explorar. Tú preparas las instrucciones; la misión te invita a observar, aprender y volver a intentar.</p>
            <div className="spido-feature-note">EXPLORA · OBSERVA · VUELVE A INTENTAR</div>
          </article>
          <article className="spido-feature">
            <span className="spido-feature-number">02 / EDITOR DE CÓDIGO</span>
            <h3>Escribe. Ejecuta. Comprende.</h3>
            <p>Combina instrucciones, repeticiones y decisiones desde el editor del juego. El resultado de tu código se convierte en una acción visible.</p>
            <div className="spido-code-preview" aria-label="Conceptos de programación"><span>01</span> instrucciones<br /><span>02</span> bucles<br /><span>03</span> condicionales</div>
          </article>
          <article className="spido-feature">
            <span className="spido-feature-number">03 / A.D.A.</span>
            <h3>Una pista para seguir.</h3>
            <p>A.D.A. acompaña el aprendizaje con orientación y pistas para comprender errores y seguir avanzando.</p>
            <div className="spido-feature-note spido-note-cyan">ASISTENCIA EN EL JUEGO</div>
          </article>
        </div>
      </section>
      <section id="como-jugar" className="spido-how">
        <div className="spido-container spido-section">
          <div className="spido-section-intro">
            <p className="spido-eyebrow">02 / CÓMO SE JUEGA</p>
            <h2>Tu lógica marca el camino.</h2>
          </div>
          <ol className="spido-steps">
            {[
              ['Observa la misión', 'Descubre el objetivo, el entorno y los recursos disponibles.'],
              ['Prepara tus instrucciones', 'Usa el editor para planificar acciones y resolver el desafío.'],
              ['Ejecuta y aprende', 'Observa el resultado, ajusta tu código y sigue explorando.'],
            ].map(([title, copy], index) => <li key={title}><span className="spido-step-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}
          </ol>
          <div className="spido-progression"><span className="spido-eyebrow">EXPLORACIÓN Y PROGRESIÓN</span><p>Superar desafíos y reunir recursos abre nuevas posibilidades: más terreno para explorar y nuevas herramientas de programación para tus próximas misiones.</p></div>
        </div>
      </section>
    </>
  )
}

function DocumentationNotice() {
  return (
    <section id="documentacion" className="spido-container spido-section">
      <div className="spido-docs">
        <div><p className="spido-eyebrow">04 / ARCHIVO DE MISIÓN</p><h2>Detrás del juego,<br />un proyecto por descubrir.</h2><p>Estamos preparando un espacio para consultar el diseño del juego, su arquitectura y el proceso de desarrollo.</p></div>
        <div className="spido-docs-status"><span className="spido-status-label">DOCUMENTACIÓN</span><strong>En preparación</strong><p>Los documentos todavía no están publicados. Mientras tanto, puedes consultar las notas de diseño y desarrollo de esta página.</p><a href="#notas-tecnicas">Consultar notas actuales <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  )
}

function TeamAndTechnology() {
  return (
    <section id="equipo" className="spido-container spido-team">
      <div>
        <p className="spido-eyebrow">05 / EQUIPO Y TECNOLOGÍAS</p>
        <h2>Construido para aprender.</h2>
        <p>Un proyecto universitario que une desarrollo de videojuegos y aprendizaje de programación.</p>
      </div>
      <div className="spido-tech-groups">
        <div><h3>El videojuego</h3><ul aria-label="Tecnologías del juego">{['Godot 4', 'GDScript', 'Supabase'].map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
        <div><h3>Esta web</h3><ul aria-label="Tecnologías de la web">{['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
      </div>
    </section>
  )
}

function ResponsibilitiesSection() {
  const pillars = [
    {
      step: '01 / CORE SYSTEM',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Parser & Lógica GDScript',
      desc: 'Motor CodeExecutor con parser seguro para GDScript/Python educativo. Comandos con parámetros numéricos (rover.norte(2)), bucle while con límite de seguridad de 50 iteraciones, y modos de ejecución dual: continua (Ctrl+Enter) y paso a paso (F10).',
      badge: 'IMPLEMENTADO',
      highlight: 'Detención reactiva al cumplir meta',
    },
    {
      step: '02 / CORE SYSTEM',
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16m-8 4v6" />
        </svg>
      ),
      title: 'Auth & Guardado Supabase',
      desc: 'Integración completa con Supabase PostgreSQL y Row Level Security (RLS). ProgressService sincroniza minerales de la nave vs rover, conocimientos del códice, misiones cumplidas y tiers desbloqueados del mapa (0 a 3).',
      badge: 'PERSISTENTE',
      highlight: 'Carga remota de inventario',
    },
    {
      step: '03 / CORE SYSTEM',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: '3D, GridMap & A.D.A.',
      desc: 'Mundo procedural en mundo.gd (corredor 1x3, sector 2x3 con 2 depósitos dinámicos y sector 3x3). Árbol radial en interfaz.gd con conexiones vectoriales Line2D reactivas y asistente A.D.A. con diálogos contextuales de felicitación.',
      badge: 'MOTOR GODOT 4',
      highlight: 'Botón táctico Vuelta a Base',
    },
  ]

  return (
    <section id="responsabilidades" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="RESPONSIBILITIES"
          badgeType="purple"
          doodle="~ Work done ~"
          title="Construir la misión, de la sintaxis al espacio."
          subtitle="Cada componente del juego está diseñado para cerrar la brecha entre escribir una instrucción abstracta y experimentar su efecto físico en tiempo real."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((item) => (
            <div key={item.title} className="bento-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#07111F] border border-purple-500/30 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300 bg-cyan-950/40">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-green-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {item.badge}
                </span>
                <span className="text-slate-400">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GDDBlueprintSection() {
  const [activeTab, setActiveTab] = useState<'andamiaje' | 'specs' | 'recursos'>('andamiaje')

  const scaffoldingPhases = [
    {
      phase: 'Fase 1 (~60% Guiado)',
      title: 'Calibración Inicial (1x3)',
      desc: 'Corredor lineal fijo. Depósito determinista en (0,2). A.D.A. asiste con sintaxis explícita de métodos rover.minar() y rover.transferir().',
      curva: '60% Guiado / 40% Autonomía',
    },
    {
      phase: 'Fase 2 (~50% Guiado)',
      title: 'Automatización & Bucles',
      desc: 'El alumno modela la repetición con bucle while para viajes continuos entre el depósito y la nave nodriza.',
      curva: '50% Guiado / 50% Autonomía',
    },
    {
      phase: 'Fase 3 (~40% Guiado)',
      title: 'Percepción Sensorial (2x3)',
      desc: 'Sector 2x3 con depósitos aleatorios. Nace la necesidad de dotar de ojos al rover con if rover.hay_mineral() antes de perforar.',
      curva: '40% Guiado / 60% Autonomía',
    },
    {
      phase: 'Fase 4 (~30% Guiado)',
      title: 'Cuadrante Abierto (3x3)',
      desc: 'A.D.A. solo define el objetivo macro. El alumno diseña libremente algoritmos completos de barrido, minería y retorno seguro.',
      curva: '30% Guiado / 70% Autonomía',
    },
    {
      phase: 'Fase 5 (Autonomía Total)',
      title: 'Sonda Espacial Autónoma',
      desc: 'Desafíos de exploración y extracción con mínima intervención humana y optimización de líneas de código.',
      curva: '100% Autonomía / Maestría',
    },
  ]

  const specs = [
    ['Genre', 'Simulación Educativa & Minería Espacial'],
    ['Engine', 'Godot 4.x + GDScript'],
    ['Platform', 'PC & WebGL'],
    ['Mechanics', 'Parser en tiempo real, Sensores & Minería'],
    ['Connectivity', 'Supabase Auth & PostgreSQL Cloud Save'],
    ['Visual Style', '3D Low-Poly espacial & Terminal Retro-futurista'],
    ['Pedagogy', 'Fading Scaffolding (Andamiaje con Retirada Progresiva)'],
    ['QoL Systems', 'Ejecución dual (Paso a Paso F10) & Vuelta a Base'],
  ]

  return (
    <section id="gdd" className="py-20 relative bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="GDD - BENTO"
          badgeType="green"
          doodle="reglas antes que píxeles"
          title="Blueprint del sistema de juego"
          subtitle="Documento de Dirección de Diseño oficial (GDD v1.6): reglas mecánicas, andamiaje pedagógico y arquitectura técnica."
        />

        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-6 items-start">
          {/* GDD Book sticker card */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-16 h-20 rounded-lg bg-green-500/20 border-2 border-green-400/60 p-3 shadow-[0_0_25px_rgba(74,222,128,0.25)] flex flex-col justify-between mb-6">
                <span className="font-mono text-xs font-bold text-green-300">GDD</span>
                <span className="font-mono text-[9px] text-green-400">v1.6</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">GDD SPIDOCODE</h3>
              <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                SISTEMA PEDAGÓGICO & A.D.A.
              </p>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                "El jugador no aprende programación respondiendo cuestionarios ni memorizando sintaxis previa: aprende porque
                necesita programar el rover para superar las restricciones operativas de un entorno espacial hostil."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VERSIÓN:</span>
                <span className="text-slate-200">1.6 (Actualizada)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ESTADO:</span>
                <span className="text-green-400">10 Misiones Implementadas</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CÓDICE:</span>
                <span className="text-cyan-300">While ➔ If ➔ For</span>
              </div>
            </div>
          </div>

          {/* Interactive GDD Panel */}
          <div className="bento-card p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-purple-500/20 pb-4 mb-6 flex-wrap">
              <button
                onClick={() => setActiveTab('andamiaje')}
                className={cn(
                  'px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all',
                  activeTab === 'andamiaje'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(108,77,255,0.4)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                Curva de Andamiaje (Fading Scaffolding)
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={cn(
                  'px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all',
                  activeTab === 'specs'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(108,77,255,0.4)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                Especificaciones del GDD
              </button>
            </div>

            {activeTab === 'andamiaje' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-green-400 mb-3">
                  METAS DE AUTONOMÍA: 60% ➔ 50% ➔ 40% ➔ 30% GUIADO
                </div>
                {scaffoldingPhases.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    className="p-3.5 rounded-lg border border-purple-500/15 bg-[#07111F]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-400/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-400 text-[10px] font-mono font-bold text-purple-300 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-display font-semibold text-white text-sm">{phase.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 pl-7">{phase.desc}</p>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 self-start sm:self-auto whitespace-nowrap">
                      {phase.curva}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {specs.map(([key, value]) => (
                  <div key={key} className="p-3.5 rounded-lg bg-[#07111F]/70 border border-slate-800">
                    <div className="font-mono text-[10px] text-cyan-400 uppercase">{key}</div>
                    <div className="font-display font-medium text-sm text-slate-200 mt-1">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function GameStoryAndADA() {
  const [activeCodeMode, setActiveCodeMode] = useState<'success' | 'error'>('success')

  return (
    <section id="historia" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="GAME STORY"
          badgeType="purple"
          doodle="plot twist: compila"
          title="Un Rover. Una nave rota. Cero margen de error."
          subtitle="En el cinturón de asteroides, los errores lógicos tienen consecuencias físicas. La IA de soporte táctico A.D.A. acompaña al alumno traduciendo fallos en pistas progresivas."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Narrative Card */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-green-400 tracking-wider mb-3">
                CHAPTER_01 // AWAKENING
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                El despertar en el asteroide hostil
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Varado en un cinturón de asteroides hostil tras una anomalía de salto hiperespacial, el Rover MK-I es
                reactivado por <b>A.D.A. (Asistente Digital Avanzado)</b>, la inteligencia artificial de soporte táctico de
                la nave nodriza.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Para reparar los propulsores principales y regresar a casa, el jugador debe asumir el control
                algorítmico del rover, programando rutinas de navegación, sensores y extracción de minerales raros.
              </p>

              {/* Quote box from GDD */}
              <div className="mt-6 p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  A.D.A. // CANAL DE TRANSMISIÓN
                </div>
                <blockquote className="font-display italic text-sm text-cyan-100">
                  "No necesitas suerte, necesitas una sintaxis válida. Revisa tu indentación y dale ojos al rover antes de
                  perforar."
                </blockquote>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-2 font-mono text-center text-xs">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">DIAGNÓSTICO</div>
                <div className="text-green-400 font-bold">Pistas x3</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">CONSOLA</div>
                <div className="text-cyan-300 font-bold">#00FF66 CRT</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px]">AUTORÍA</div>
                <div className="text-purple-300 font-bold">100% Alumno</div>
              </div>
            </div>
          </div>

          {/* Interactive A.D.A. CRT Terminal */}
          <div className="crt-terminal rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-green-400 font-mono text-xs sm:text-sm">
            <div>
              {/* Terminal top bar */}
              <div className="flex items-center justify-between border-b border-green-500/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider">A.D.A. TELEMETRY TERMINAL // v1.6</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCodeMode('success')}
                    className={cn(
                      'px-2.5 py-1 rounded text-[11px] transition-all',
                      activeCodeMode === 'success'
                        ? 'bg-green-500/30 border border-green-400 text-green-300'
                        : 'text-slate-500 hover:text-green-400'
                    )}
                  >
                    Simular Éxito
                  </button>
                  <button
                    onClick={() => setActiveCodeMode('error')}
                    className={cn(
                      'px-2.5 py-1 rounded text-[11px] transition-all',
                      activeCodeMode === 'error'
                        ? 'bg-red-500/30 border border-red-400 text-red-300'
                        : 'text-slate-500 hover:text-red-400'
                    )}
                  >
                    Simular Error
                  </button>
                </div>
              </div>

              {/* Code display inside CRT */}
              {activeCodeMode === 'success' ? (
                <div className="space-y-1.5 leading-relaxed bg-black/40 p-4 rounded-lg border border-green-500/20">
                  <div className="text-slate-500"># MISIÓN 08 // CICLO AUTÓNOMO REACTIVO</div>
                  <div>
                    <span className="text-purple-400">while</span> rover.tiene_espacio():
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">if</span> rover.hay_mineral():
                  </div>
                  <div className="pl-8 text-green-300">
                    rover.minar() <span className="text-slate-500"># Extrae muestra</span>
                  </div>
                  <div className="pl-4">rover.norte(1)</div>
                  <div className="text-cyan-300 mt-3 pt-2 border-t border-green-500/20">
                    ✓ [CodeExecutor]: Sintaxis validada correctamente.
                    <br />✓ [mundo.gd]: Minerales entregados &gt;= 3.
                    <br />✓ [ProgressService]: Progreso guardado en Supabase.
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 leading-relaxed bg-black/40 p-4 rounded-lg border border-red-500/30 text-red-300">
                  <div className="text-slate-500"># ERROR DETECTADO POR CODEEXECUTOR</div>
                  <div>
                    <span className="text-purple-400">while</span> rover.tiene_espacio():
                  </div>
                  <div className="pl-4 bg-red-950/60 p-1 rounded border-l-2 border-red-400 text-white">
                    rover.minar() <span className="text-red-400"># [!] ERROR: PERFORACIÓN EN CASILLA ESTÉRIL</span>
                  </div>
                  <div className="pl-4">rover.norte()</div>
                  <div className="mt-3 pt-2 border-t border-red-500/20 text-green-400">
                    <span className="font-bold text-cyan-300">[A.D.A. PISTA]:</span> "El Sector 2x3 tiene depósitos
                    estocásticos. Agrega <code className="text-white">if rover.hay_mineral():</code> antes de perforar
                    para evitar daños al actuador."
                  </div>
                </div>
              )}
            </div>

              <div className="mt-6 pt-4 border-t border-green-500/30 flex items-center justify-between text-[11px] text-green-400/80">
              <span>ESTADO DEL MOTOR: PASO A PASO DISPONIBLE (F10)</span>
              <span>BUFFER: 50 ITERACIONES MÁX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UserFlowSection() {
  const steps = [
    {
      num: '01',
      title: 'Misión en Panel',
      desc: 'Objetivo macro sin revelar soluciones.',
      tag: 'mission_service.gd',
    },
    {
      num: '02',
      title: 'Editor de Código',
      desc: 'TextEdit integrado en Godot con resaltado.',
      tag: 'interfaz.gd',
    },
    {
      num: '03',
      title: 'CodeExecutor',
      desc: 'Parser seguro con validación de sintaxis.',
      tag: 'Parser AST',
    },
    {
      num: '04',
      title: '¿Sintaxis OK?',
      desc: 'Bifurcación lógica de control.',
      tag: 'Decisión',
      isDecision: true,
    },
    {
      num: '05',
      title: 'Rover 3D Ejecuta',
      desc: 'Movimiento físico sobre el GridMap.',
      tag: 'rover.gd',
    },
    {
      num: '06',
      title: 'Minería Reactiva',
      desc: 'Detención al cumplir meta mineral.',
      tag: 'mundo.gd',
    },
    {
      num: '07',
      title: 'Supabase Save',
      desc: 'Persistencia remota con RLS.',
      tag: 'ProgressService',
    },
  ]

  return (
    <section id="flujo" className="py-20 relative bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="USER FLOW"
          badgeType="purple"
          doodle="if syntax == OK"
          title="Del briefing al guardado, sin romper la cadena."
          subtitle="La arquitectura de ejecución de SPIDOCODE conecta el input educativo del alumno directamente con el motor de física y la persistencia en la nube."
        />

        {/* Pedagogical Callout Box: IF before FOR */}
        <div className="mb-10 p-5 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-[#0B1630] to-purple-950/30">
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            DECISIÓN PEDAGÓGICA CLAVE: CONDICIONAL 'IF' ANTES DEL BUCLE 'FOR'
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Debido a la <b>naturaleza estocástica</b> de los terrenos 2x3 y 3x3, los minerales se generan aleatoriamente.
            Si el alumno usara un bucle <code>for</code> fijo sin condicionales, el rover perforaría casillas estériles a
            ciegas. Al enseñar <code>if rover.hay_mineral()</code> primero, el alumno adopta el{' '}
            <b>Ciclo Percepción-Acción (Sense-Act Cycle)</b> fundamental de la robótica.
          </p>
        </div>

        {/* Visual Pipeline / Flow Nodes */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className={cn(
                'bento-card p-4 flex flex-col justify-between relative',
                step.isDecision && 'border-purple-400 shadow-[0_0_20px_rgba(108,77,255,0.25)]'
              )}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                  <span>{step.num}</span>
                  <span className={step.isDecision ? 'text-purple-300 font-bold' : 'text-cyan-400'}>
                    {step.isDecision ? 'CHECK' : 'PIPELINE'}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 font-mono text-[9px] text-slate-500 truncate">
                {step.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Flow Result Branching */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 font-mono font-bold flex items-center justify-center text-xs flex-none">
              ✕
            </div>
            <div>
              <div className="font-display font-bold text-sm text-red-300">Si la sintaxis falla</div>
              <p className="text-xs text-slate-300 mt-1">
                A.D.A. activa pistas pedagógicas escalonadas (Nivel 1: Concepto ➔ Nivel 2: Dónde mirar ➔ Nivel 3: Ejemplo
                análogo) sin reiniciar el código escrito.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-green-500/30 bg-green-950/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 font-mono font-bold flex items-center justify-center text-xs flex-none">
              ✓
            </div>
            <div>
              <div className="font-display font-bold text-sm text-green-300">Si la sintaxis es válida</div>
              <p className="text-xs text-slate-300 mt-1">
                El Rover ejecuta en tiempo real, extrae minerales, se activa la pausa de celebración de 3s y se sincroniza
                el progreso en Supabase Cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RadialTreeAndAssetsSection() {
  const [selectedNode, setSelectedNode] = useState<{
    branch: string
    title: string
    cost: string
    color: string
    desc: string
    codeSample: string
  }>({
    branch: 'Rama de Programación',
    title: 'CONDICIONAL IF',
    cost: '10 Minerales',
    color: '#33CCFF',
    desc: 'Requiere Bucle While. Habilita el módulo de bifurcación lógica y la lectura activa del sensor rover.hay_mineral().',
    codeSample: 'if rover.hay_mineral():\n    rover.minar()',
  })

  const branches = [
    {
      name: 'Programación',
      color: '#33CCFF',
      colorName: 'Cian',
      nodes: [
        {
          title: 'BUCLE WHILE',
          cost: '15 Min',
          desc: 'Desbloquea repetición continua y ciclos controlados por condición (while rover.tiene_espacio():).',
          codeSample: 'while rover.tiene_espacio():\n    rover.norte()',
        },
        {
          title: 'CONDICIONAL IF',
          cost: '10 Min',
          desc: 'Requiere Bucle While. Habilita lectura activa del sensor rover.hay_mineral() e inspección previa.',
          codeSample: 'if rover.hay_mineral():\n    rover.minar()',
        },
        {
          title: 'BUCLE FOR',
          cost: '10 Min',
          desc: 'Requiere Condicional IF. Habilita repeticiones definidas con rangos exactos (for ciclo in range(N)).',
          codeSample: 'for i in range(3):\n    rover.norte(1)',
        },
      ],
    },
    {
      name: 'Terreno',
      color: '#4ADE80',
      colorName: 'Verde Esmeralda',
      nodes: [
        {
          title: 'CORREDOR 1X3',
          cost: '1 Min',
          desc: 'Tier 1 de mapa. Desbloquea extensión norte inicial (3 casillas en línea) con depósito de calibración.',
          codeSample: '# Terreno determinista\ndeposito = (0, 2)',
        },
        {
          title: '+3 CASILLAS (2x3)',
          cost: '10 Min',
          desc: 'Tier 2 de mapa. Expande a 6 casillas (2x3) activando generación procedural de 2 minerales aleatorios.',
          codeSample: '# 2 yacimientos dinámicos\nmapa.regenerar_sector_2x3()',
        },
        {
          title: 'SECTOR 3X3',
          cost: '20 Min',
          desc: 'Tier 3 de mapa. Cuadrante completo de 9 casillas con 3 depósitos minerales simultáneos aleatorios.',
          codeSample: '# Cuadrante completo 3x3\nmapa.generar_estocastico_3x3()',
        },
      ],
    },
    {
      name: 'Hardware',
      color: '#FFD700',
      colorName: 'Dorado',
      nodes: [
        {
          title: 'MINERÍA RÁPIDA',
          cost: '15 Min',
          desc: 'Optimización de los actuadores de perforación del rover, reduciendo significativamente la latencia de minado.',
          codeSample: '# Optimización hardware\nactuador.latencia_minado *= 0.5',
        },
      ],
    },
  ]

  const minerals = [
    { name: 'Cuarzo Espacial', color: '#22D3EE', desc: 'Calibración y combustible inicial (Tier 1)' },
    { name: 'Titanio Asteroidal', color: '#E2E8F0', desc: 'Refuerzo de chasis y expansión 2x3 (Tier 2)' },
    { name: 'Plasma Oscuro', color: '#C084FC', desc: 'Procesadores lógicos y cuadrante 3x3 (Tier 3)' },
  ]

  return (
    <section id="arbol" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="ASSETS & UPGRADES"
          badgeType="purple"
          doodle="model sheet -> engine"
          title="Diseñado como sistema, construido para jugar."
          subtitle="Arquitectura radial del Centro de Mejoras en 3 ramas funcionales con conexiones vectoriales Line2D reactivas al desbloqueo."
        />

        {/* Radial Tree Interactive Showcase */}
        <div className="grid lg:grid-cols-[1.4fr_.9fr] gap-6 mb-12">
          <div className="bento-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <span className="font-mono text-xs text-green-400 font-bold">
                ÁRBOL RADIAL DE MEJORAS // Line2D REACTIVO
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                Haz clic en un nodo para inspeccionar requisitos
              </span>
            </div>

            <div className="space-y-6">
              {branches.map((b) => (
                <div key={b.name} className="p-4 rounded-xl border border-slate-800 bg-[#07111F]/70">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                    <span className="font-display font-bold text-sm text-white">Rama {b.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">({b.colorName})</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2.5">
                    {b.nodes.map((node) => {
                      const isSelected = selectedNode.title === node.title
                      return (
                        <button
                          key={node.title}
                          onClick={() =>
                            setSelectedNode({
                              branch: `Rama de ${b.name}`,
                              title: node.title,
                              cost: node.cost,
                              color: b.color,
                              desc: node.desc,
                              codeSample: node.codeSample,
                            })
                          }
                          className={cn(
                            'p-3 rounded-lg border text-left transition-all',
                            isSelected
                              ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                          )}
                        >
                          <div className="font-display font-semibold text-xs text-white">{node.title}</div>
                          <div className="font-mono text-[10px] mt-1 font-bold" style={{ color: b.color }}>
                            {node.cost}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Node Inspector Card */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-slate-400 uppercase">{selectedNode.branch}</div>
              <h3 className="font-display font-bold text-2xl text-white mt-1" style={{ color: selectedNode.color }}>
                {selectedNode.title}
              </h3>
              <div className="inline-block mt-2 font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-green-400">
                COSTE: {selectedNode.cost}
              </div>

              <p className="text-sm text-slate-300 mt-4 leading-relaxed">{selectedNode.desc}</p>

              <div className="mt-6">
                <div className="font-mono text-[11px] text-cyan-300 mb-2">CÓDIGO HABILITADO EN EL CÓDICE:</div>
                <pre className="p-3.5 rounded-lg bg-black/60 border border-purple-500/20 font-mono text-xs text-green-300 overflow-x-auto">
                  {selectedNode.codeSample}
                </pre>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 font-mono text-[11px] text-slate-400">
              Conexión vectorial Line2D: <span className="text-green-400">Activa al comprar nodo precursor</span>
            </div>
          </div>
        </div>

        {/* Resource Library & Real Engine Captures */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {minerals.map((m) => (
            <div key={m.name} className="bento-card p-4 flex items-center gap-3.5">
              <span className="w-5 h-5 rounded-full flex-none shadow-md" style={{ backgroundColor: m.color }} />
              <div>
                <div className="font-display font-bold text-sm text-white">{m.name}</div>
                <div className="text-xs text-slate-400">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <figure className="spido-capture">
          <div className="spido-capture-bar"><span>RECURSO OFICIAL DEL MENÚ</span><span>SPIDOCODE</span></div>
          <img src="/images/spidocode/menu-spid.png" alt="Entorno espacial oficial de SPIDOCODE con Spid y cristales verdes" width="1672" height="941" loading="lazy" />
          <figcaption><span>ARTE DEL MENÚ</span><span>Las capturas actuales de gameplay y del editor todavía no están disponibles para esta galería.</span></figcaption>
        </figure>
      </div>
    </section>
  )
}

function HowToPlayAndMissionsSection() {
  const [missionFilter, setMissionFilter] = useState<'all' | 'live' | 'integracion' | 'roadmap'>('live')
  const [showAllMissions, setShowAllMissions] = useState(false)

  const missions = [
    {
      id: 1,
      name: 'Primera Muestra',
      code: 'recolectar_primer_mineral',
      concept: 'Métodos y Objetos',
      objective: 'Aprender llamadas a rover.minar() y rover.transferir(). Extraer y almacenar muestra en nave.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 2,
      name: 'Expansión Corredor',
      code: 'comprar_casillas tier 1',
      concept: 'Progresión de Terreno',
      objective: 'Reunir 1 mineral y adquirir [ CORREDOR 1X3 ] en Centro de Mejoras para habilitar avance norte.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 3,
      name: 'Ruta de Calibración',
      code: 'ruta_calibracion',
      concept: 'Secuencia Algorítmica',
      objective: 'Programar secuencia coordinada: norte, minar, sur y transferir en una sola ejecución continua.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 4,
      name: 'Trabajo Continuo',
      code: 'trabajo_continuo',
      concept: 'Bucle While Básico',
      objective: 'Automatizar ciclo de suministro continuo (ida y vuelta al depósito) repitiendo con while.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 5,
      name: 'Expansión Sector 2x3',
      code: 'comprar_casillas tier 2',
      concept: 'Expansión Territorial',
      objective: 'Ahorrar 10 minerales y adquirir [ +3 CASILLAS ]. Desbloquea terreno 2x3 con 2 depósitos aleatorios.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 6,
      name: 'Adquisición de Sensor',
      code: 'comprar_if',
      concept: 'Módulo Condicional',
      objective: 'Acumular 10 minerales y adquirir [ CONDICIONAL IF ] en Mejoras. Habilita rover.hay_mineral().',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 7,
      name: 'Señales Inciertas',
      code: 'senales_inciertas',
      concept: 'Sensores y Condicional IF',
      objective: 'Navegar terreno variable. Usar if rover.hay_mineral(): rover.minar() antes de extraer.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 8,
      name: 'Ciclo Autónomo',
      code: 'ciclo_autonomo',
      concept: 'Automatización Reactiva',
      objective: 'Patrulla continua combinando while rover.tiene_espacio(): con if rover.hay_mineral():.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 9,
      name: 'Expansión Sector 3x3',
      code: 'comprar_mapa_3x3',
      concept: 'Cuadrante 3x3 (Tier 3)',
      objective: 'Acumular 20 minerales y adquirir [ SECTOR 3X3 ]. A.D.A. asiste con recordatorio si se ejecuta código antes.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 10,
      name: 'Barrido de Cuadrante',
      code: 'exploracion_3x3',
      concept: 'Integración Holística',
      objective: 'Cuadrante 3x3 con 3 minerales aleatorios simultáneos. Extraer y transferir >= 3 minerales.',
      status: 'live',
      badgeText: 'IMPLEMENTADO',
    },
    {
      id: 11,
      name: 'Recolección Programada',
      code: 'ciclo_recoleccion',
      concept: 'Bucle FOR e Índices',
      objective: 'Emplear for ciclo in range(N): para barridos de cuadrante con repeticiones prefijadas.',
      status: 'integracion',
      badgeText: 'EN INTEGRACIÓN',
    },
    {
      id: 12,
      name: 'Camino Largo',
      code: 'camino_largo',
      concept: 'Parámetros de Métodos',
      objective: 'Control de trayectorias con parámetros numéricos: rover.norte(distancia), rover.sur(distancia).',
      status: 'integracion',
      badgeText: 'EN INTEGRACIÓN',
    },
    {
      id: 13,
      name: 'Retorno a Base',
      code: 'retorno_base',
      concept: 'Condición Inversa (not)',
      objective: 'Navegación orientada por sensor de base: while not rover.en_base(): para repatriación autónoma.',
      status: 'roadmap',
      badgeText: 'ROADMAP',
    },
    {
      id: 14,
      name: 'Parámetros Dinámicos',
      code: 'variables',
      concept: 'Variables de Usuario',
      objective: 'Asignación de datos en tiempo de ejecución: pasos = 3; rover.norte(pasos).',
      status: 'roadmap',
      badgeText: 'ROADMAP',
    },
    {
      id: 15,
      name: 'Rutinas Reutilizables',
      code: 'funciones',
      concept: 'Funciones Propias (def)',
      objective: 'Definición modular de rutinas de usuario: def prospectar(): rover.minar().',
      status: 'roadmap',
      badgeText: 'ROADMAP',
    },
  ]

  const filteredMissions = missions.filter((m) => {
    if (missionFilter === 'all') return true
    return m.status === missionFilter
  })

  return (
    <section id="misiones" className="py-20 relative bg-[#060E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="03 / MISIONES"
          badgeType="purple"
          doodle="aprende a tu ritmo"
          title="Cada misión, una nueva forma de pensar."
          subtitle="Explora los desafíos descritos en el diseño actual del proyecto. Sus estados distinguen la base implementada, la integración y las próximas etapas."
        />

        {/* Mission Explorer */}
        <div className="bento-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5 mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Bitácora de misiones</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Plan de misiones de la versión anterior · pendiente de revisión
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                aria-pressed={missionFilter === 'live'}
                onClick={() => { setMissionFilter('live'); setShowAllMissions(false) }}
                className={cn(
                  'px-3 py-1 rounded-full font-mono text-xs font-bold transition-all',
                  missionFilter === 'live'
                    ? 'bg-green-500/30 border border-green-400 text-green-300'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                Implementadas (1-10)
              </button>
              <button
                aria-pressed={missionFilter === 'integracion'}
                onClick={() => { setMissionFilter('integracion'); setShowAllMissions(false) }}
                className={cn(
                  'px-3 py-1 rounded-full font-mono text-xs font-bold transition-all',
                  missionFilter === 'integracion'
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                En Integración (11-12)
              </button>
              <button
                aria-pressed={missionFilter === 'roadmap'}
                onClick={() => { setMissionFilter('roadmap'); setShowAllMissions(false) }}
                className={cn(
                  'px-3 py-1 rounded-full font-mono text-xs font-bold transition-all',
                  missionFilter === 'roadmap'
                    ? 'bg-purple-500/30 border border-purple-400 text-purple-300'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                Roadmap (13-15)
              </button>
              <button
                aria-pressed={missionFilter === 'all'}
                onClick={() => { setMissionFilter('all'); setShowAllMissions(false) }}
                className={cn(
                  'px-3 py-1 rounded-full font-mono text-xs font-bold transition-all',
                  missionFilter === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                )}
              >
                Todas (15)
              </button>
            </div>
          </div>

          <div id="mission-list" className="grid md:grid-cols-2 gap-4">
            {(showAllMissions ? filteredMissions : filteredMissions.slice(0, 4)).map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#07111F]/70 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-slate-400">
                      MISIÓN #{m.id < 10 ? `0${m.id}` : m.id}
                    </span>
                    <span
                      className={cn(
                        'status-badge font-mono text-[9px] font-bold px-2 py-0.5 rounded-full',
                        m.status === 'live'
                          ? 'status-live'
                          : m.status === 'integracion'
                          ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                          : 'text-slate-400 bg-slate-900 border border-slate-800'
                      )}
                    >
                      {m.badgeText}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">{m.name}</h4>
                  <div className="font-mono text-xs text-cyan-300 mb-2">{m.concept}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.objective}</p>
                </div>
              </div>
            ))}
          </div>
          {filteredMissions.length > 4 && (
            <button type="button" className="spido-missions-toggle" aria-expanded={showAllMissions} aria-controls="mission-list" onClick={() => setShowAllMissions(!showAllMissions)}>
              {showAllMissions ? 'Mostrar menos misiones' : `Ver las ${filteredMissions.length} misiones de esta categoría`} <span aria-hidden="true">{showAllMissions ? '−' : '+'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="spido-footer">
      <div className="spido-container">
        <div className="spido-footer-top"><a href="#inicio" aria-label="Volver al inicio de SPIDOCODE"><BrandMark compact /></a><p>Aprende programación. Explora un nuevo mundo.</p><a href="#inicio">Volver arriba ↑</a></div>
        <div className="spido-footer-bottom"><span>© 2026 SPIDOCODE · PROYECTO UNIVERSITARIO</span><a href="/reset-password">Restablecer contraseña</a><span>EN DESARROLLO / HECHO CON GODOT</span></div>
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
        setMessage('Crea una contraseña nueva para tu cuenta de SPIDOCODE.')
      }
    }

    const { data: listener } = client.auth.onAuthStateChange((event, session) => {
      if (!active) return
      if (event === 'PASSWORD_RECOVERY' && session) {
        setStatus('ready')
        setMessage('Crea una contraseña nueva para tu cuenta de SPIDOCODE.')
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
      setMessage('Tu contraseña fue actualizada correctamente. Ya puedes volver a SPIDOCODE e iniciar sesión.')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setStatus('ready')
      const raw = error instanceof Error ? error.message : 'No fue posible actualizar la contraseña.'
      if (/expired|invalid.*token|jwt/i.test(raw)) {
        setStatus('invalid')
        setMessage('El enlace expiró o ya no es válido. Solicita un correo de recuperación nuevo desde SPIDOCODE.')
      } else {
        setMessage('No pudimos actualizar la contraseña. Inténtalo nuevamente en unos segundos.')
      }
    }
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-16"
      style={{ background: brand.bg }}
    >
      <StarField count={150} />
      <div className="absolute inset-0 nebula-bg" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-8 right-6 font-mono text-[10px] hidden sm:flex items-center gap-2 text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> AUTH CHANNEL ONLINE
      </div>

      <section className="reset-card relative z-10 w-full max-w-md">
        <div className="font-mono text-[10px] tracking-[.18em] uppercase text-green-400">
          SECURE RECOVERY // SPIDOCODE
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl mt-3 text-white">Restablecer contraseña</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">{message}</p>

        {status === 'success' ? (
          <div className="mt-7 rounded-lg border border-green-500/30 bg-green-500/10 p-5">
            <div className="font-display font-semibold text-green-400">Contraseña actualizada ✓</div>
            <p className="text-sm mt-2 leading-6 text-slate-300">Puedes cerrar esta pestaña y volver al juego.</p>
          </div>
        ) : status === 'invalid' ? (
          <div className="mt-7 rounded-lg border border-red-500/30 bg-red-500/10 p-5">
            <div className="font-display font-semibold text-red-300">Enlace no disponible</div>
            <p className="text-sm mt-2 leading-6 text-slate-300">
              Vuelve a SPIDOCODE y solicita "¿Olvidaste tu contraseña?" nuevamente.
            </p>
          </div>
        ) : (
          <form className="mt-7 space-y-5" onSubmit={submit}>
            <PasswordField label="Nueva contraseña" value={password} onChange={setPassword} autoComplete="new-password" />
            <PasswordField
              label="Confirmar contraseña"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />
            <div className="text-[11px] font-mono text-slate-500">
              MIN_LENGTH: 6 // CREDENTIALS ENCRYPTED IN TRANSIT
            </div>
            <button
              className="btn-primary w-full justify-center"
              type="submit"
              disabled={status === 'checking' || status === 'submitting'}
            >
              <span>{status === 'submitting' ? 'Actualizando…' : 'Actualizar contraseña'}</span>
            </button>
          </form>
        )}

        <div className="mt-7 pt-5 border-t border-slate-800 flex justify-between gap-3 font-mono text-[10px] text-slate-500">
          <span>SUPABASE AUTH</span>
          <a href="/" className="hover:text-cyan-300 underline">
            Volver a la Misión
          </a>
        </div>
      </section>
    </main>
  )
}

function LandingPage() {
  return (
    <div className="spido-site">
      <a className="spido-skip-link" href="#contenido">Saltar al contenido</a>
      <Nav />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <GameExperience />
        <div className="spido-campaign"><HowToPlayAndMissionsSection /></div>
        <DocumentationNotice />
        <TeamAndTechnology />
        <section id="notas-tecnicas" className="spido-container spido-reference">
          <details>
            <summary>Notas de diseño y desarrollo <span>GDD, sistemas y progresión</span></summary>
            <p className="spido-reference-notice">Referencia conservada de la versión anterior. Los estados y detalles técnicos están pendientes de revisión para SPIDOCODE.</p>
            <ResponsibilitiesSection />
            <GDDBlueprintSection />
            <GameStoryAndADA />
            <UserFlowSection />
            <RadialTreeAndAssetsSection />
          </details>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  if (pathname === '/reset-password') return <ResetPasswordPage />
  return <LandingPage />
}
