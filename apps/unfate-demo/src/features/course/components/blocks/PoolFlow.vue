<template>
  <!-- Diagram "How a pool works" (Figma: Schéma · Fonctionnement d'un pool) -->
  <figure class="flow">
    <figcaption class="flow-title">How a pool works</figcaption>
    <div class="flow-row">
      <div class="node"><b>Trader</b><span>swaps ETH ⇄ USDC</span></div>
      <div class="arrow"><span>trades against the pool</span></div>
      <div class="node node-pool"><b>ETH / USDC pool</b><span class="tokens"><i>10 ETH</i><i>20,000 USDC</i></span><span>x × y = k</span></div>
      <div class="arrow arrow-back"><span>deposits both tokens</span></div>
      <div class="node"><b>Liquidity provider</b><span>gets LP tokens + a share of fees</span></div>
    </div>
    <p class="note">Each swap pays a 0.3% fee that stays in the pool and is shared between LPs.</p>
  </figure>
</template>

<style scoped>
.flow { margin: 8px 0 24px; padding: 18px 20px; border-radius: 12px; background: var(--uf-field); }
.flow-title { font-weight: 700; font-size: 15px; margin-bottom: 12px; }
.flow-row { display: grid; grid-template-columns: 1fr auto 1.2fr auto 1fr; gap: 10px; align-items: center; }
.node { display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center; padding: 14px 10px; background: #fff; border: 1.5px solid #d6d8e7; border-radius: 10px; font-size: 12px; color: var(--uf-muted); }
.node b { color: var(--uf-text); font-size: 13px; }
.node-pool { border-color: var(--uf-blue); }
.tokens { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.tokens i { font-style: normal; font-weight: 700; color: var(--uf-text); background: var(--uf-blue-bg); padding: 4px 8px; border-radius: 6px; }
.arrow { font-size: 11px; color: var(--uf-blue-dark); text-align: center; max-width: 80px; }
.arrow::before { content: '→'; display: block; font-size: 22px; line-height: 1; }
.arrow-back::before { content: '←'; }
.note { font-size: 12px; color: var(--uf-muted); margin-top: 12px; }
@media (max-width: 760px) {
  .flow-row { grid-template-columns: 1fr; }
  .arrow { max-width: none; }
  .arrow::before { content: '↓'; }
  .arrow-back::before { content: '↑'; }
}
</style>
