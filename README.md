# Horse Racing Simulator

[![Tests](https://github.com/szymonmusial/horse-racing-simulator/actions/workflows/test.yml/badge.svg)](https://github.com/szymonmusial/horse-racing-simulator/actions/workflows/test.yml)

A web application for running an interactive horse racing simulation. It lets you generate a horse pool and race program, run 6 rounds sequentially with animated movement on the track, and view results after each round.

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)
- [License](#license)

---

## Project Description

Horse Racing Simulator is a single-page application that lets you:

- **Generate horses** — Create a pool of 20 horses with random names, unique colors, and condition score (1–100).
- **Generate race program** — Click **Generate** to build a schedule of 6 rounds; each round uses 10 random horses and a fixed distance (1200 m to 2200 m).
- **Run races** — Click **Start** to run rounds one at a time; the next round starts automatically after the previous one finishes.
- **Pause** — Pause the current round with **Pause**.
- **Watch animation** — Horses move along the track during each round; progress reflects simulated finish times.
- **View results** — See round results in the Results panel as each round completes.

The app uses no backend and is built as a recruitment/demo project.

---

## Tech Stack

| Category      | Technologies                    |
| ------------- | ------------------------------- |
| **Framework** | Vue 3 (Composition API)         |
| **State**     | Pinia                           |
| **Routing**   | Vue Router                      |
| **Styling**   | Tailwind CSS v4, Sass           |
| **Build**     | Vite                            |
| **Language**  | TypeScript                      |
| **Testing**   | Vitest (unit), Playwright (e2e) |
| **Linting**   | ESLint, Oxlint, Prettier        |

**Node:** `^20.19.0` or `>=22.12.0` (see `engines` in `package.json`).

---

## Getting Started Locally

### Prerequisites

- **Node.js** — Version 20.19.x or 22.12+ (see [engines](package.json) in `package.json`).

### Setup and run

1. Clone the repository:

   ```bash
   git clone https://github.com/szymonmusial/horse-racing-simulator.git
   cd horse-racing-simulator
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (e.g. `http://localhost:5173`) in your browser.

### Optional: run tests

- Unit tests: `npm run test:unit`
- E2E tests: `npm run test:e2e` (requires Playwright browsers: `npx playwright install`; on CI the app is built first).

---

## Available Scripts

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start Vite dev server                    |
| `npm run build`       | Type-check and build for production      |
| `npm run preview`     | Serve production build locally           |
| `npm run test:unit`   | Run unit tests (Vitest)                  |
| `npm run test:e2e`    | Run end-to-end tests (Playwright)        |
| `npm run build-only`  | Build only (no type-check)               |
| `npm run type-check`  | Run TypeScript check (`vue-tsc --build`) |
| `npm run lint`        | Run Oxlint and ESLint with auto-fix      |
| `npm run lint:oxlint` | Run Oxlint only                          |
| `npm run lint:eslint` | Run ESLint only                          |
| `npm run format`      | Format `src/` and `tests/` with Prettier |

---

## Project Scope

- **Race view (`/`)** — Single screen: header (Generate, Start, Pause), horse list panel, race track panel (animated horses for current round), race program panel (6 rounds), and race results panel (results per round).
- **Pinia store (`useRaceStore`)** — State: horses, rounds, display round, canStart, canPause. Actions: generateProgram, start, pause, stop. Program and simulation logic live in composables used by the store.
- **Program generation (`useRaceProgram`)** — Generates 20 horses (name, color, condition) and 6 rounds (each: 10 random horses, distance from 1200 m to 2200 m).
- **Simulation (`useRaceSimulation`)** — Runs rounds one by one, animation loop, placement calculation, auto-transition to next round; exposes start, pause, stop.
- **Race UI components** — RaceHeader, RaceHorseListPanel, RaceTrackPanel (RacePreview), RaceProgramPanel, RaceResultsPanel (RaceSummary), plus track/lane/horse and round cards.
- **Styling** — Tailwind CSS v4 and Sass; layout and components styled for the race dashboard.
- **Tests** — Unit tests (Vitest) for components, store, composables, utils; E2E tests (Playwright) for race view flow.

---

## Project Status

This project was created as a **recruitment / demo** application. Core features (horse and program generation, sequential rounds, animated track, results, Pinia store, Vue 3 + TypeScript) are implemented. Unit and E2E tests run in CI on push/PR to `main` or `master`.
