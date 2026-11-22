// Calcule le ratio de contraste WCAG 2.2 entre deux couleurs hex.
// Usage : node contraste.mjs "#texte" "#fond" [["#texte2" "#fond2"] ...]
// Formule : https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
const lum = (hex) => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const args = process.argv.slice(2)
if (args.length < 2 || args.length % 2) {
  console.error('Usage : node contraste.mjs "#texte" "#fond" [...]')
  process.exit(1)
}
for (let i = 0; i < args.length; i += 2) {
  const [a, b] = [lum(args[i]), lum(args[i + 1])]
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  // Pas d'arrondi vers le haut : 4.499 échoue (WCAG).
  const r = Math.floor(ratio * 100) / 100
  const verdict = ratio >= 7 ? 'AAA texte' : ratio >= 4.5 ? 'AA texte' : ratio >= 3 ? 'gros texte / UI seulement' : 'ÉCHEC'
  console.log(`${args[i]} sur ${args[i + 1]} : ${r}:1 → ${verdict}`)
}
