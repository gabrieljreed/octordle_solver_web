# Wordle Solver Web

A static web app that helps you solve Wordle puzzles. Enter your guesses, set the tile colors, and get ranked suggestions for your next guess.

Built with TypeScript and Vite — no server required, runs entirely in the browser.

## How it works

The solver scores every valid guess against the remaining possible answers and ranks them by how well they split the remaining word pool into groups. The first guess (`SLATE`) is hardcoded; the best second guess is looked up from a precomputed table. From guess three onward, computation runs in a Web Worker so the UI stays responsive.

## Project structure

```
src/
  app.ts        # Top-level controller — wires everything together
  solver.ts     # Core logic: scoreGuess, generateGroups, getAllAnswers, filterWords
  worker.ts     # Web Worker wrapper around getAllAnswers
  grid.ts       # 6×5 tile grid — keyboard input and click-to-cycle colors
  keyboard.ts   # On-screen QWERTY keyboard for mobile
  panels.ts     # Best guesses list, group breakdown panel, remaining words panel
  data.ts       # Loads word lists and precomputed data at startup
  types.ts      # Shared TypeScript interfaces and enums
public/
  data/
    valid_answers.txt        # 3 361 valid Wordle answers
    valid_guesses.txt        # 12 972 additional valid guesses
    best_second_guesses.json # Precomputed best second guess for each SLATE result
tests/
  solver.test.ts  # Unit tests for all pure solver functions
```

## Setup

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
```

## Development

Start the local dev server with hot reload:

```bash
npm run dev
```

Open **http://localhost:5173/\<your-repo-name\>/** in your browser.

> The `base` path in `vite.config.ts` must match your repo name — see GitHub Pages below.

## Tests

```bash
npm test          # run once
npm run test:watch  # watch mode
```

## Build

```bash
npm run build
```

Output goes to `dist/` (or wherever `build.outDir` is set in `vite.config.ts`).

## GitHub Pages

1. **Set the base path.** Edit `vite.config.ts` and replace the `base` value with your exact GitHub repository name:

   ```ts
   base: "/your-repo-name/",
   ```

2. **Build:**

   ```bash
   npm run build
   ```

3. **Commit the output** (if serving from a docs folder on `main`):

   Change `build.outDir` in `vite.config.ts` to `"docs"`, rebuild, and commit the docs folder.

   ```ts
   build: {
     outDir: "docs",
     emptyOutDir: true,
   },
   ```

   ```bash
   npm run build
   git add docs/
   git commit -m "build: update production build"
   git push
   ```

4. **Enable Pages** on GitHub: **Settings → Pages → Branch: `main`, Folder: docs**.

Your app will be live at `https://<username>.github.io/<your-repo-name>/`.

