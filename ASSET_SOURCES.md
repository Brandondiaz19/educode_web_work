# Recursos oficiales de SPIDOCODE

Origen: checkout local del videojuego `rover-edu-code`.
Commit de referencia: `cab70759e0683a5e79de6039bf91b893af46e634`.
Los tres archivos se copiaron sin transformar; el repositorio del juego no se modificó.

| Archivo web (en `public/images/spidocode/`) | Origen en el juego | Uso | SHA-256 |
| --- | --- | --- | --- |
| `menu-spid.png` | `Fondos/estrellas_frames/frame_00.png` | Hero, presentación de Spid y galería de arte oficial | `998cd27bec1bd753a42669d8069ad6d8b7839d0ae1b89239fa8a8348df2fd6fd` |
| `PixelifySans.ttf` | `assets/fonts/PixelifySans.ttf` | Marca textual con la fuente utilizada por el menú | `9ba86cd010a4de309d263ceff8e8044092c9db7efda869620cb9ff1c4389e8a5` |
| `mineral.png` | `Minerales/MineralSpid.png` | Favicon: icono de mineral del juego, no retrato de Spid | `f61ba9478faf05581240aa00a8ac97fc91a36f20f4dfc83706e3038b05eb6833` |

## Evidencia de origen

- `escenas/menu_inicio.tscn` utiliza `frame_00.png` como textura de fondo.
- `script/menu_inicio.gd` anima esa misma serie de 36 frames.
- El nodo `Titulo` de `menu_inicio.tscn` contiene el texto `SPIDOCODE`; no referencia un logo PNG/SVG independiente.
- `project.godot` utiliza `assets/tema_global.tres`, cuyo `default_font` es `PixelifySans.ttf`.
- El fondo conserva sus 1672 × 941 píxeles originales. Se usa un frame estático en lugar del GIF de 15,6 MB para evitar una animación permanente y transferencia innecesaria.
- La marca de la web sigue siendo texto, ahora con la fuente del juego. No se presenta como un logo raster exportado.

## Recursos inspeccionados y pendientes

- `Modelados3D/Spid.glb` y `escenas/spid.tscn`: modelo y escena reales; no son capturas listas para web y no se copiaron.
- `escenas/mundo.tscn` y `script/interfaz.gd`: mundo y editor del juego; no se encontraron capturas actuales exportadas de gameplay/editor.
- `Fondos/fondo_menu_rover_3d_v4.png` y `Fondos/ROVER_FONDO.png` contienen EDUCODE: descartados para la UI pública.
- `public/images/figma/figma-board-*.png`, `public/images/educode-logo.png` y `src/assets/` se conservan como originales históricos, sin referencias visuales en la landing.
- La galería identifica el recurso como arte del menú, no como captura de gameplay, login o editor.
- Pendientes: capturas actuales del gameplay y editor; logo gráfico separado solo si el equipo dispone de una versión oficial exportada.

La atribución registra procedencia interna; no sustituye las licencias o créditos originales de los recursos del videojuego.
