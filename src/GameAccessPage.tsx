import './GameAccessPage.css'

const repository = 'https://github.com/LeaGaj04/spido-code'

export default function GameAccessPage() {
  return <div className="spido-access">
    <a className="spido-access-skip" href="#contenido-juego">Saltar al contenido</a>
    <header className="spido-access-header">
      <div className="spido-access-container spido-access-navigation">
        <a href="/" className="spido-access-wordmark">SPIDO<span>CODE</span></a>
        <nav aria-label="Navegación"><a href="/">Inicio</a><a href="/docs">Archivo A.D.A.</a></nav>
      </div>
    </header>
    <main id="contenido-juego" className="spido-access-container">
      <div className="spido-access-grid">
        <section className="spido-access-main">
          <p className="spido-access-eyebrow">ACCESO AL JUEGO // ESTACIÓN DE LANZAMIENTO</p>
          <h1>Tu próxima misión<br /><span>comienza aquí.</span></h1>
          <p>SpidoCode es un videojuego educativo desarrollado en Godot. Programa a Spid, resuelve desafíos y aprende explorando un entorno espacial.</p>
          <div className="spido-access-status" role="status"><span aria-hidden="true">●</span><div><strong>Versión pública aún no disponible</strong><p>El proyecto está en desarrollo. Todavía no existe una compilación descargable verificada en sus versiones oficiales de GitHub.</p></div></div>
          <div className="spido-access-actions">
            <a href={repository} target="_blank" rel="noopener noreferrer" className="spido-access-button">Ver proyecto en GitHub ↗</a>
            <a href="/docs" className="spido-access-button spido-access-secondary">Explorar guías A.D.A. ↗</a>
          </div>
        </section>
        <figure className="spido-access-art">
          <img src="/images/spidocode/menu-spid.png" alt="Arte oficial del menú espacial de SpidoCode" width="1672" height="941" />
          <figcaption>SPIDOCODE / ARTE OFICIAL DEL JUEGO</figcaption>
        </figure>
      </div>
      <section className="spido-access-info" aria-labelledby="estado-titulo">
        <div><p className="spido-access-eyebrow">01 / DISTRIBUCIÓN</p><h2 id="estado-titulo">Estado de lanzamiento</h2></div>
        <div className="spido-access-cards">
          <article><span>01 / CÓDIGO FUENTE</span><h3>Proyecto disponible</h3><p>El repositorio permite revisar el desarrollo. No constituye un instalador listo para jugar.</p><a href={repository} target="_blank" rel="noopener noreferrer">Abrir repositorio ↗</a></article>
          <article><span>02 / DESCARGA</span><h3>En preparación</h3><p>Publicaremos un enlace solo cuando exista una compilación probada, con versión y plataforma confirmadas.</p></article>
          <article><span>03 / APRENDIZAJE</span><h3>Guías disponibles</h3><p>Mientras tanto, puedes explorar las guías de programación de SpidoCode en Archivo A.D.A.</p><a href="/docs#guias">Consultar guías ↗</a></article>
        </div>
      </section>
    </main>
    <footer className="spido-access-footer"><div className="spido-access-container"><span>© 2026 SPIDOCODE · PROYECTO UNIVERSITARIO</span><a href="/">Volver al inicio ↑</a></div></footer>
  </div>
}
