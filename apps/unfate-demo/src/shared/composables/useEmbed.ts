// The case study page shows the demo in a window with ?embed=1: the portfolio bar is hidden there.
// Read once at start-up, so the mode survives navigation inside the demo.
const embedded = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1'

export function useEmbed() {
  return { embedded }
}
