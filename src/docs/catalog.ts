/** Catálogo público de Archivo A.D.A.
 * Publicar únicamente documentos revisados y aptos para difusión.
 * Agregar el PDF en public/docs/ y registrar su ruta explícita aquí.
 */
export const categories = [
  { id: 'proyecto', title: 'Proyecto', description: 'Acta, ficha, visión y alcance.', icon: '◇' },
  { id: 'arquitectura', title: 'Arquitectura', description: 'Diseño del software, componentes y decisiones.', icon: '⌘' },
  { id: 'base-datos', title: 'Base de datos', description: 'Modelo de datos, relaciones y seguridad.', icon: '▦' },
  { id: 'scrum', title: 'Scrum', description: 'Product Backlog, roadmap y seguimiento.', icon: '▤' },
  { id: 'requisitos', title: 'Requisitos', description: 'Historias de usuario y requisitos del sistema.', icon: '≡' },
  { id: 'diagramas', title: 'Diagramas', description: 'Modelos UML y flujos del videojuego.', icon: '⌁' },
  { id: 'pruebas', title: 'Pruebas', description: 'Casos, evidencias y resultados verificados.', icon: '✓' },
  { id: 'gdd', title: 'Diseño del juego', description: 'GDD, mecánicas y progresión pedagógica.', icon: '✦' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export type PublicDocument = {
  id: string
  title: string
  category: CategoryId
  summary: string
  version: string
  updated: string // YYYY-MM-DD; fecha real de la versión publicada
  file: `/docs/${string}.pdf`
}

/** Inicialmente vacío: aún no se han aprobado PDFs para publicar. */
export const publicDocuments: PublicDocument[] = []
