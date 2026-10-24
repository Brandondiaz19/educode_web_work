import { useMemo, useState } from 'react'
import { categories, publicDocuments, type CategoryId } from './catalog'
import './docs.css'

type Filter = CategoryId | 'todos'

export default function DocsPage() {
  const [category, setCategory] = useState<Filter>('todos')
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLocaleLowerCase('es')
  const matches = useMemo(() => publicDocuments.filter((doc) => {
    const inCategory = category === 'todos' || doc.category === category
    const text = [doc.title, doc.summary, categories.find((c) => c.id === doc.category)?.title].join(' ').toLocaleLowerCase('es')
    return inCategory && text.includes(normalized)
  }), [category, normalized])
  const selectedTitle = categories.find((entry) => entry.id === category)?.title
  return (
    <div className="spido-docs-page">
      <a className="spido-docs-skip" href="#archivo-contenido">Saltar al contenido</a>
      <header className="spido-docs-header">
        <div className="spido-docs-container spido-docs-header-inner">
          <a href="/" className="spido-docs-logo" aria-label="Volver a SpidoCode">SPIDO<span>CODE</span></a>
          <nav aria-label="Navegación de documentación">
            <a href="/">← Volver al juego</a>
            <a href="/docs" aria-current="page">Archivo A.D.A.</a>
          </nav>
        </div>
      </header>
      <main id="archivo-contenido" className="spido-docs-container">
        <section className="spido-docs-hero">
          <div className="spido-docs-kicker">ARCHIVO A.D.A. // BASE DE CONOCIMIENTO</div>
          <h1>Documentación <span>SpidoCode</span></h1>
          <p>Explora el diseño, desarrollo y aprendizaje detrás del videojuego. Los documentos estarán disponibles después de su revisión para publicación.</p>
          <div className="spido-docs-signal"><span aria-hidden="true">●</span> PORTAL EN PREPARACIÓN <span className="spido-docs-count">{publicDocuments.length} documentos publicados</span></div>
        </section>
        <section className="spido-docs-library" aria-labelledby="docs-categories-title">
          <div className="spido-docs-section-heading">
            <p>01 / EXPLORAR ARCHIVO</p>
            <h2 id="docs-categories-title">Áreas de documentación</h2>
            <span>Selecciona una categoría para filtrar los archivos disponibles.</span>
          </div>
          <div className="spido-docs-categories">
            {categories.map((item) => {
              const count = publicDocuments.filter((doc) => doc.category === item.id).length
              return <button key={item.id} type="button" aria-pressed={category === item.id} className="spido-docs-category" onClick={() => setCategory(category === item.id ? 'todos' : item.id)}>
                <span className="spido-docs-category-icon" aria-hidden="true">{item.icon}</span>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <small>{count === 0 ? 'En preparación' : `${count} documento${count === 1 ? '' : 's'}`}</small>
              </button>
            })}
          </div>
        </section>
        <section className="spido-docs-results" aria-labelledby="docs-results-title">
          <div className="spido-docs-section-heading">
            <p>02 / DOCUMENTOS PÚBLICOS</p>
            <h2 id="docs-results-title">{selectedTitle ?? 'Todos los documentos'}</h2>
            <span>Solo se muestran versiones aprobadas y archivos realmente disponibles.</span>
          </div>
          <div className="spido-docs-toolbar">
            <label htmlFor="docs-search">Buscar documentos</label>
            <input id="docs-search" type="search" placeholder="Título, tema o categoría…" value={query} onChange={(event) => setQuery(event.target.value)} />
            {(category !== 'todos' || query) && <button type="button" onClick={() => { setCategory('todos'); setQuery('') }}>Limpiar filtros</button>}
          </div>
          <p className="spido-docs-result-count" aria-live="polite">{matches.length} resultado{matches.length === 1 ? '' : 's'}</p>
          {matches.length ? <div className="spido-docs-items">{matches.map((doc) => <article key={doc.id} className="spido-docs-item">
            <span>{categories.find((c) => c.id === doc.category)?.title} / v{doc.version}</span>
            <h3>{doc.title}</h3><p>{doc.summary}</p>
            <small>Actualizado: {doc.updated}</small>
            <div className="spido-docs-item-actions"><a href={doc.file} target="_blank" rel="noopener noreferrer">Ver PDF ↗</a><a href={doc.file} download>Descargar PDF ↓</a></div>
          </article>)}</div>
          : <div className="spido-docs-empty" role="status">
            <div aria-hidden="true">▤</div>
            <h3>{publicDocuments.length === 0 ? 'Archivo en preparación' : 'Sin resultados para estos filtros'}</h3>
            <p>{publicDocuments.length === 0 ? 'Todavía no hay PDFs públicos aprobados. Estamos organizando los documentos académicos antes de publicarlos.' : 'Prueba otra categoría o modifica el texto de búsqueda.'}</p>
          </div>}
        </section>
        <aside className="spido-docs-guidance">
          <strong>PROTOCOLO A.D.A. / PUBLICACIÓN RESPONSABLE</strong>
          <p>Los informes y diagramas se publicarán únicamente tras comprobar versiones, contenido y privacidad. No se muestran documentos de prueba, borradores ni enlaces ficticios.</p>
        </aside>
      </main>
      <footer className="spido-docs-footer"><div className="spido-docs-container"><span>© 2026 SPIDOCODE · PROYECTO UNIVERSITARIO</span><a href="/">Volver a la landing ↑</a></div></footer>
    </div>
  )
}
