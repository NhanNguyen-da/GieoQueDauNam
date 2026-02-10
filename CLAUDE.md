# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese fortune stick drawing web app ("Gieo Que Tan Xuan") — fully client-side, no backend. Originally scaffolded from Google AI Studio. 100 hardcoded fortunes across 4 categories (love, career, family, health), each with a poem, interpretation, advice, lucky color/number.

## Tech Stack

- Angular 21 (standalone components, zoneless change detection via signals)
- TypeScript 5.9, Tailwind CSS, Vite 6.2
- ES Modules (`"type": "module"`)

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on port 3000
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

No test runner or linter is configured.

## Architecture

**Screen-based navigation** managed by `FortuneService` signals (no Angular Router):

```
AppComponent (src/app.component.ts) — switches screens via @switch on currentScreen signal
  ├── WelcomeComponent  → name input, stored in localStorage
  ├── CategoryComponent → select 1 of 4 categories
  ├── DrawingComponent  → 3D animated stick shaking (accelerometer + button)
  └── ResultComponent   → displays fortune details
```

**Key files:**
- `src/services/fortune.service.ts` — central state (signals): screen, userName, category, fortune. All screen transitions go through this service.
- `src/services/data.ts` — fortune database (100 entries, 25 per category). `Fortune` interface and `FORTUNES` record keyed by category string.
- `index.html` — contains all 3D CSS animations (hexagonal cup, sticks, plum blossoms) and the `glass-panel` utility class used across components.
- `index.tsx` — Angular bootstrap entry point with `provideZonelessChangeDetection()`.
- `assets/` — MP3 audio files for drawing sounds.

**Path alias:** `@/*` maps to project root (tsconfig.json).

## Patterns & Conventions

- **Inline templates & styles**: All components use inline `template` and `styles` in the `@Component` decorator — no separate `.html`/`.css` files.
- **Angular control flow**: Uses new `@switch`, `@case`, `@if`, `@for` block syntax (not `*ngIf`/`*ngFor`).
- **Signals everywhere**: Component state uses `signal()`, service state uses `signal()`. No RxJS observables for UI state.
- **Dependency injection**: Components use `inject()` function, not constructor injection.
- **All UI text is in Vietnamese.**

## Notes

- `GEMINI_API_KEY` in `.env.local` is a placeholder for potential future AI integration — currently unused.
- 3D animations are CSS-only (transforms on hexagonal cup faces labeled Duc, Loc, Phuc, Tho, An, Tai).
- Device motion API used for shake-to-draw on mobile (`DrawingComponent`).
- `WelcomeComponent` plays a random MP3 from `assets/` on start.
