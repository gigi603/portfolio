# Unfate demo

Coded demo of Unfate V2, rebuilt from the Figma prototype and embedded in the portfolio
(case study page + full screen at `/demo/unfate/`). Everything runs in the browser: no server,
no real account, and the state resets on reload.

Stack: Vue 3 (`<script setup>`, Composition API), TypeScript strict, Vite, Pinia, Vue Router, Vitest, ESLint flat config.

```
src/
  app/        entry component, router, global styles
  pages/      one component per route, composed from features
  layouts/    app shell (navigation, top bar, side panel)
  features/   auth, catalog, course, exam, settings: components, stores, data, types
  shared/     UI building blocks and generic composables (toast, locale)
```

Commands (from this folder): `npm run dev`, `npm test`, `npm run lint`, `npm run build`.
The root `npm run build` builds this app into `public/demo/unfate` before building the portfolio.
