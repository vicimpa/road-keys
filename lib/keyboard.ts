export const keySymbols = `abcdefghijklmnopqrstuvwxyz1234567890-=+_)(*&^%$#@!/?\`'"\\|.,`
export const accessSymbols = keySymbols.split('')

accessSymbols.push(' ')

for (let sym of accessSymbols)
  if (sym !== sym.toUpperCase())
    accessSymbols.push(sym.toUpperCase())

accessSymbols.push('Enter')
accessSymbols.push('Escape')
accessSymbols.push('Backspace')

let onInputKey: (key: string) => void

export function subscribe(subscriber: (key: string) => void) {
  onInputKey = subscriber
}

window.addEventListener('keydown', (e: KeyboardEvent) => {
  e.preventDefault()
  if (accessSymbols.indexOf(e.key) === -1)
    return

  if (onInputKey)
    onInputKey(e.key)
})