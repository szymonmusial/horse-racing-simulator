# Product Requirements Document (PRD)

---

## 1. Overview

### 1.1 Product Name

Horse Racing Simulator

### 1.2 Purpose

The goal of this application is to create an interactive horse racing
simulation demonstrating front-end engineering skills, including
component architecture, state management, animation handling, and
scalable code organization.

The application allows users to:

- generate horses,
- create a race schedule,
- run races sequentially,
- observe animated horse movement,
- view race results.

---

## 2. Goals & Objectives

### Primary Goals

- Build an interactive racing simulation using Vue.js.
- Demonstrate clean architecture and maintainable code.
- Showcase state management using Vuex.
- Provide animated and sequential race execution.

### Success Criteria

- Users can generate horses and race schedules.
- Races run sequentially without manual intervention.
- Results are displayed after each round.
- Horse movement is visually animated.
- Code structure supports scalability.

---

## 3. Scope

### In Scope

- Horse generation
- Race scheduling
- Sequential race execution
- Animated race visualization
- Results tracking
- State management via Vuex
- Component-based architecture

### Out of Scope

- Backend integration
- Multiplayer functionality
- Persistent storage
- Authentication

---

## 4. Functional Requirements

### FR-1: Horse Generation

- System must generate a list containing **1--20 horses**.
- Total available horse pool: **20 horses**.
- Each horse must include:
  - unique color
  - condition score (range: 1--100)

---

### FR-2: Race Schedule Generation

- Clicking **Generate** creates a schedule of **6 rounds**.
- Each round selects **10 random horses** from the available pool.

---

### FR-3: Race Execution

- Clicking **Start** begins races.
- Races must run **one round at a time**.
- Next round starts automatically after the previous finishes.

---

### FR-4: Round Configuration

Round Distance

---

1 1200m
2 1400m
3 1600m
4 1800m
5 2000m
6 2200m

---

### FR-5: Animated Horse Movement

- Horses must visibly move during races.
- Animation reflects race progress.
- Movement must reset between rounds.

---

### FR-6: Results Display

- Results must appear after each round finishes.
- Results displayed sequentially.
- Must include ranking/positions.

---

## 5. Non-Functional Requirements

### Code Quality

- Clean and maintainable architecture.
- Scalable structure suitable for large projects.
- Separation of concerns.

### Performance

- Smooth animation performance.

### Maintainability

- Modular components.
- Predictable state updates.

---

## 6. Technical Requirements

### Framework

- Vue.js

### State Management

- Vuex store required.

### Architecture

- Component-based design.

---

## 7. Data Model (Conceptual)

### Horse

```ts
type Horse = {
  id: number
  name: string
  color: string
  condition: number // 1–100
}
```

### RaceRound

```ts
type RaceRound = {
  id: number
  distance: number
  horses: Horse[]
  results?: RaceResult[]
}
```

### RaceResult

```ts
type RaceResult = {
  position: number
  horseId: number
  finishTime: number
}
```

---

## 8. User Flow

1.  User opens application.
2.  User clicks **Generate**.
3.  Horses list and race schedule are created.
4.  User clicks **Start**.
5.  Round begins:
    - horses animate
    - race completes
    - results displayed
6.  Next round starts automatically.
7.  After Round 6 → simulation ends.

---

## 9. UI Requirements

The interface should include:

- Horse list panel (1--20 horses)
- Race track visualization
- Control buttons:
  - Generate
  - Start
  - Program/Schedule panel
  - Results panel

---

## 10. Edge Cases

- Start clicked before generation → disabled or ignored.
- Empty horse list → prevent race start.
- Duplicate horse selection within a round → not allowed.
- Race interruption handling.

---

## 11. Bonus Features (Optional)

- Unit Tests
- End-to-End Tests

---

## 12. Acceptance Criteria

- ✅ Horses generated within constraints.
- ✅ 6 rounds created with correct distances.
- ✅ Each round contains 10 unique horses.
- ✅ Races execute sequentially.
- ✅ Horses animate visually.
- ✅ Results displayed after each race.
- ✅ Vuex manages application state.
- ✅ Code structured for scalability.

---
