# 🧩 RSS Puzzle

<img width="1920" height="916" alt="image" src="https://github.com/user-attachments/assets/c82d3628-106a-4b37-97a2-974e78800557" />

🎮 [Play the game]([https://www.google.com/url?sa=E&source=gmail&q=https://your-deploy-link-here.com](https://fiercesloth.github.io/rss-puzzle/))

**RSS Puzzle** is an interactive mini-game aimed at enhancing English language skills, developed as a task for **[RS School](https://rs.school/)**.
Players assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience where completing sentences gradually reveals a beautiful artwork.

This project is built from scratch as a **Single Page Application (SPA)** using **Vanilla TypeScript, SCSS Modules, and Vite**, strictly following a component-based architecture without any JavaScript frameworks.

> 📋 **Task Description & Rules:** \> You can find the detailed technical requirements and game rules here:
> [RS School RSS Puzzle Task](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/puzzle/README.md)

-----

## 🏗️ Technical Architecture

The project adheres to strict architectural constraints and modern frontend practices:

  * **Single Page Application (SPA):** Seamless routing between the Login, Main, Game, and Statistics screens (`PagePath`) without page reloads.
  * **Component-Based:** Built on a reusable `Component` base class, ensuring modularity of all UI elements (e.g., `PuzzleBoard`, `ControlPanel`, `ResultBoard`).
  * **Event-Driven Architecture:** Implemented custom event emitters (`appEmitter` for global routing and `gameEmitter` for isolated game logic) to handle communication between components, ensuring a loosely coupled architecture.
  * **Strict Typing:** Fully written in TypeScript with custom interfaces and enums for robust state and prop management.
  * **State Management:** A dedicated `dataManager` handles persistence using `localStorage`, saving user profiles, game progress, and settings.
  * **Modular Styling:** Styled using SCSS Modules, preventing class name collisions and keeping styles scoped to their respective components.
  * **Code Quality & CI:** Enforced by **ESLint** (Airbnb config), **Prettier**, and **Husky** (pre-commit hooks and branch name validation).

-----

## 🎮 Gameplay Mechanics

1.  **Authentication:** Players must enter their Name and Surname (validated via custom logic) to access the game.
2.  **Level and Round Progression:** The game features 6 progressive difficulty levels. Each level contains multiple rounds.
3.  **Sentence Assembly (Click-to-Move):** Players interact with the puzzle pieces dynamically by **clicking** on words in the Source Field to move them to the Result Board, and vice versa.
4.  **Artwork Reveal:** Successfully assembling sentences progressively builds a background image on the puzzle pieces. Upon completing a round, the full painting and its details (Author, Title, Year) are revealed.

-----

## 🛠️ Tools & Hints

To help the player assemble the correct sentence, a control panel with toggleable hints and actions is available:

  * **Translate (💡):** Displays the translation of the current sentence in the native language.
  * **Audio (🔊):** Plays the correct English pronunciation of the sentence.
  * **View (🖼️):** Toggles the background image pieces on the word cards to give visual clues based on the puzzle's final artwork.
  * **Check:** Validates the current word order. Incorrect words are highlighted in red, and correct ones in green.
  * **Give Up (Auto-complete):** Automatically places the words in the correct order but marks the sentence as "unknown" in the final statistics.

-----

## 📊 Statistics & Progress Tracking

At the end of each round, players are presented with a detailed `StatsCard`:

  - Displays the revealed artwork and its historical information.
  - Categorizes sentences into **Known** (solved independently) and **Unknown** (solved using the "Give Up" feature).
  - Allows players to listen to the pronunciation of any sentence directly from the results screen.

-----

## 💻 Tech Stack

  - **Language:** TypeScript
  - **Styling:** SCSS (Sass) / CSS Modules
  - **Build Tool:** Vite
  - **Linting & Formatting:** ESLint (Airbnb base/TypeScript), Prettier
  - **Git Hooks:** Husky, lint-staged, validate-branch-name
  - **Assets:** Custom image and audio datasets provided by RS School.

-----
