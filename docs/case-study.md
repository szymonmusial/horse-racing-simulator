# Horse Racing Simulator – Case Study

In this project, you are asked to create an interactive horse racing simulator.

---

## Requirements

### 1. Technology

- You may use **Vue.js**

### 2. Generate Horse List

- The horse list should contain **between 1 and 20 horses**, generated randomly.

### 3. Generate Race Schedule

- After clicking the **Generate** button, a race schedule must be created.
- The schedule should consist of **6 rounds**.

### 4. Start the Race

- When the **Start** button is clicked:
  - races begin,
  - rounds run **one at a time**.

### 5. Display Race Results

- Results for each race should appear in the **Results** field.
- Results should be displayed **sequentially** as each race finishes.

### 6. Animated Horse Movement

- Horses should visibly move during each race.

### 7. Coding Style

- Code should demonstrate:
  - clean architecture,
  - maintainability,
  - scalability suitable for large-scale projects.

---

## Rules and Conditions

1. The game should have a total of **20 horses** available.
2. Each horse must have a **unique color**.
3. Each horse has a **condition score** ranging from **1 to 100**.
4. Each race consists of **6 rounds**.
5. For each round:
   - select **10 random horses** from the available 20.

### Round Specifications

Rounds must occur with different track lengths:

| Round   | Distance    |
| ------- | ----------- |
| Round 1 | 1200 meters |
| Round 2 | 1400 meters |
| Round 3 | 1600 meters |
| Round 4 | 1800 meters |
| Round 5 | 2000 meters |
| Round 6 | 2200 meters |

---

## Technical Expectations

### State Management

- Use **Vuex Store** to manage game state and data.

### Component-Based Design

- Use Vue components to organize application structure effectively.

---

## Additional Notes

1. This project is an opportunity to demonstrate:
   - component structure,
   - code organization,
   - state management in a complex feature.
2. Aim to write code that is:
   - clear,
   - organized,
   - adaptable for future scaling.
3. You are encouraged to ask questions if anything is unclear.

Enjoy the challenge!

---

## Bonus

- ✅ Unit Tests
- ✅ E2E Tests

---

## Example

An example UI layout is provided in the original task document showing:

- horse list panel,
- animated race track,
- race program,
- results table updating after each round.
