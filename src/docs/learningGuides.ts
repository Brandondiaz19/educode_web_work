/** Guías públicas relacionadas con conceptos que el juego enseña realmente.
 * Basadas en el códice de Godot (script/archivo_ada.gd).
 * Nunca insertar datos de partida ni identificadores personales en la URL.
 */
export const learningGuides = [
  { id: 'objeto', title: 'Objeto', group: 'Fundamentos', summary: 'Conoce al objeto Spid y las acciones que puede ejecutar.', example: 'spid.minar()', tip: 'Respeta el nombre del objeto y los paréntesis.' },
  { id: 'metodo', title: 'Métodos', group: 'Fundamentos', summary: 'Aprende a invocar acciones del robot con la sintaxis correcta.', example: 'spid.norte()\nspid.minar()\nspid.transferir()', tip: 'Los métodos necesitan paréntesis, aunque no tengan argumentos.' },
  { id: 'secuencia', title: 'Secuencias', group: 'Fundamentos', summary: 'El orden de las instrucciones cambia el resultado de la misión.', example: 'spid.norte()\nspid.minar()\nspid.sur()\nspid.transferir()', tip: 'Extrae mineral antes de intentar transferirlo.' },
  { id: 'parametro', title: 'Parámetros', group: 'Fundamentos', summary: 'Controla cuántos pasos realiza Spid al ejecutar un movimiento.', example: 'spid.norte(2)\nspid.sur(2)', tip: 'No todos los comandos aceptan parámetros.' },
  { id: 'bucle_for', title: 'Bucle for', group: 'Control', summary: 'Repite acciones un número determinado de veces.', example: 'for i in range(2):\n    spid.norte()\n    spid.sur()', tip: 'Las instrucciones repetidas deben estar indentadas.' },
  { id: 'bucle_while', title: 'Bucle while', group: 'Control', summary: 'Repite instrucciones mientras se cumpla una condición.', example: 'while spid.tiene_espacio():\n    spid.minar()', tip: 'Piensa siempre en una condición de salida para evitar bucles infinitos.' },
  { id: 'condicional_if', title: 'Condicional if', group: 'Control', summary: 'Actúa solamente si se cumple una condición del entorno.', example: 'if spid.hay_mineral():\n    spid.minar()', tip: 'No olvides los dos puntos y la indentación.' },
  { id: 'variable', title: 'Variables', group: 'Organización', summary: 'Guarda datos que puedes reutilizar en las instrucciones.', example: 'pasos = 2\nspid.norte(pasos)', tip: 'Define una variable antes de utilizarla.' },
] as const
