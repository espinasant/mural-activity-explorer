# Assignment

**Software Engineer, Full Stack Take-Home Challenge**  
**Collaborative Board Activity Explorer**

---

## Time guidance

We respect your time and would like you to aim for a maximum of **~4 hours total**; we don't monitor you so time is on the honor system. Please let us know how long you took.

Prioritize what you think matters most and tell us what you'd do next with more time.

---

## Background

Mural is a visual collaboration platform where teams brainstorm, organize ideas, and make decisions together on a shared canvas.

During workshops or brainstorming sessions, many participants may contribute dozens or hundreds of sticky notes to a board.

Once a session ends, teams often want to understand:

- What activity happened on the board
- Who contributed what
- How ideas evolved over time

In this exercise, you will build a small full-stack application that helps users explore activity on a board.

---

## Task

Build a small full-stack application that allows users to explore activity on a board.

**Preferred stack:** React + TypeScript for the frontend, Node.js + TypeScript for the backend. You may use another stack, but please state your reasons in the write-up and explain tradeoffs. If you use our stack, we will evaluate idiomatic TypeScript/React/Node usage.

Your system should include both a frontend interface and a backend service.

The goal is not to build a production-ready system, but to demonstrate how you approach designing and implementing a collaborative feature.

You're free to make any UI/UX decisions you think best support the experience.

Because this is an open-ended exercise, it's important to prioritize intentionally; we'll evaluate how you scope the work and make trade-offs.

---

## Dataset

Sticky notes have the following JSON schema:

```json
{
  "id": "note_123",
  "text": "Login flow is confusing",
  "x": 412,
  "y": 891,
  "author": "user_7",
  "color": "yellow"
}
```

You are provided with a JSON file containing an array of sticky notes that you can use to try out your implementation.

You may assume:

- Boards may contain dozens or hundreds of notes
- Multiple authors may contribute
- Notes may appear across different areas of the board

---

## Key requirements

Your solution should:

### Load and render sticky notes from JSON files

The UI should be able to load a JSON file and display the notes clearly.

### Explore board activity

Provide ways for users to explore the notes. Examples include:

- Filtering notes by author
- Filtering notes by color
- Sorting notes by creation time
- Viewing statistics (e.g., notes per author)
- Showing board activity over time
- Highlighting recently added notes

### Be scalable in approach

We don't expect production-grade infrastructure, but we do expect a design that could scale.

### No need for a highly polished UI

Pixel-perfect design isn't required. We care more about the UX, how clearly the data is rendered, and how users interact with it.

> You do not need to implement all of the board activity options. Choose a small set of useful features and implement them well.

---

## Deliverables

Please submit a zipped folder or GitHub repository containing:

### Source Code

All code needed to run the project.

### README

Include clear instructions to set up and run the project and tests.

### Short write-up

Please include:

- How you approached the challenge and scoped the work
- What assumptions you made
- Architectural overview and decisions
- UX decisions
- If you used AI, how you used it
- Tradeoffs & next steps

The next stage of the interview process (should you advance) will include a systems design session based on your solution to this exercise. Come prepared to talk about your work and iterate on it.

---

## When you send us your solution

Please also include:

- How long you spent (approximately)
- Any feedback on the challenge

Please do not share this challenge or your solution on public channels. Thank you!
