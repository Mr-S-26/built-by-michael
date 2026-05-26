# Feud Frenzy — Comprehensive Technical Walkthrough

## Product Summary

Feud Frenzy is a Family-Feud-inspired live game show app for conferences and events. It runs **100% offline** on a single laptop with dual screens: a Controller window for the operator and an Audience window for the projector.

**Current Version:** 1.4.0
**Platform:** Windows (Electron)
**Status:** Production — deployed at live events

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Platform | Electron 28 |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 |
| Build | Vite + electron-vite |
| Validation | Zod |
| Audio | Custom `audio://` protocol |
| IDs | uuid v13 |
| Packaging | electron-builder (NSIS installer) |

---

## Project Structure

```
feud-frenzy/
├── src/
│   ├── main/                          # Electron main process
│   │   ├── index.ts                   # App entry, protocol registration, window creation
│   │   ├── windows.ts                 # Controller + Audience window creation & display detection
│   │   ├── game-state.ts              # GameStateManager — reducer pattern, all game logic
│   │   ├── ipc-handlers.ts            # IPC handlers for game commands + audio
│   │   ├── library-ipc-handlers.ts    # IPC handlers for question library CRUD
│   │   ├── library-manager.ts         # Persistent JSON file storage for question libraries
│   │   └── audio-manager.ts           # Audio file discovery and playback via IPC broadcast
│   │
│   ├── preload/                       # Context bridge scripts (CommonJS output)
│   │   ├── controller.ts              # Exposes all game + library + buzzer + audio IPC methods
│   │   └── audience.ts                # Exposes state updates, audio events, and teamBuzzed
│   │
│   ├── renderer/                      # React UI (two separate entry points)
│   │   ├── controller/                # Operator interface
│   │   │   ├── App.tsx                # Main layout — tabs: Gameplay, Library, Buzzer, Audio & Logo
│   │   │   ├── main.tsx               # React entry point
│   │   │   ├── index.html             # HTML shell
│   │   │   ├── components/
│   │   │   │   ├── AnswerControls.tsx  # Current question, team select, answer reveal/unreveal buttons
│   │   │   │   ├── GameControls.tsx    # Start Round, Wrong Answer, Steal, Next Round, End Game, status
│   │   │   │   ├── ScoreControls.tsx   # Team names (editable), scores, +/- adjustment buttons
│   │   │   │   ├── QuestionLoader.tsx  # JSON file upload + Load from Library button
│   │   │   │   ├── AudioControls.tsx   # Test sounds, volume slider, mute toggle
│   │   │   │   ├── LogoControls.tsx    # Upload/clear logos for top-left and top-right positions
│   │   │   │   ├── QuestionLibrary.tsx # Library management — stats, add, import JSON, filters, list
│   │   │   │   ├── AddQuestion.tsx     # Multi-step form for creating question sets (3 rounds)
│   │   │   │   ├── QuestionList.tsx    # Expandable list of question sets with delete/mark used
│   │   │   │   ├── LibraryQuestionSelector.tsx  # Modal for selecting sets to load into game
│   │   │   │   ├── BuzzerSettings.tsx  # Enable/disable buzzer, key mapping, lockout, test
│   │   │   │   └── BuzzerNotifications.tsx      # Toast notification system for buzzer events
│   │   │   └── hooks/
│   │   │       └── useBuzzer.ts        # Keyboard listener + buzzer state change notifications
│   │   │
│   │   ├── audience/                   # Projector display
│   │   │   ├── App.tsx                 # State listener, screen routing, audience-side buzzer listener
│   │   │   ├── main.tsx               # React entry point
│   │   │   ├── index.html             # HTML shell
│   │   │   └── components/
│   │   │       ├── GameBoard.tsx       # Main game layout — question, answers, scores, strikes, logos
│   │   │       ├── AnswerSlots.tsx     # Answer cards — blue hidden, green revealed, dynamic sizing
│   │   │       ├── QuestionDisplay.tsx # Yellow question box at top
│   │   │       ├── ScoreDisplay.tsx    # Team name + score card with active/locked buzzer states
│   │   │       ├── StrikeIndicators.tsx # Red X circles (up to 3)
│   │   │       ├── RoundPoints.tsx     # Yellow round points counter (team1 + team2 combined)
│   │   │       ├── BuzzIndicator.tsx   # "BUZZ IN!" / "Team X BUZZED!" display
│   │   │       ├── IdleScreen.tsx      # Pre-round screen (GET READY, ROUND 2, ROUND 3, TIEBREAKER)
│   │   │       ├── EndScreen.tsx       # Game over — winner announcement, final scores
│   │   │       └── LoadingScreen.tsx   # Startup animation — logo zoom, sparkles, voice-over
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAudio.ts            # Listens for AUDIO_PLAY events, manages HTMLAudioElements
│   │   │   └── useDebounce.ts         # Generic debounce hook (used for button lockout)
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css            # Tailwind directives + base resets
│   │   │
│   │   └── global.d.ts                # ElectronAPI TypeScript interface for window.electron
│   │
│   ├── shared/                        # Shared between main and renderer
│   │   ├── types.ts                   # All TypeScript interfaces: GameState, Question, Answer, QuestionSet, etc.
│   │   ├── constants.ts               # IPC channel names (game, library, buzzer, audio, state)
│   │   └── schemas.ts                 # Zod validation schemas for questions and library data
│   │
│   └── assets/
│       ├── audio/
│       │   ├── correct.wav            # Correct answer sound
│       │   ├── wrong.wav              # Wrong answer / strike sound
│       │   ├── buzz.wav               # Team buzz-in sound
│       │   └── voice-over.mp3         # Startup voice-over
│       ├── img/
│       │   ├── background.png         # Audience game board background
│       │   ├── logo.png               # Feud Frenzy logo (loading screen)
│       │   ├── logo.ico               # App icon
│       │   └── logo-256.ico           # App icon (256px)
│       └── questions/
│           └── sample.json            # Sample question set for testing
│
├── data/libraries/                    # Dev-mode persistent storage
│   ├── general-library.json           # General question library
│   └── custom-library.json            # Custom question library
│
├── electron.vite.config.ts            # Vite config — 3 builds: main, preload (CJS), renderer
├── electron-builder.json              # NSIS installer config for Windows
├── tailwind.config.js                 # Custom animations (reveal, sparkle, zoom, bounce-dot, etc.)
├── postcss.config.js                  # PostCSS with Tailwind + autoprefixer
├── tsconfig.json                      # TypeScript config for renderer
├── tsconfig.node.json                 # TypeScript config for main/preload
└── package.json                       # Scripts: dev, build, package:win
```

---

## Architecture

### Dual Window System

The app creates two Electron BrowserWindows on launch:

1. **Controller Window** (`windows.ts:createControllerWindow`)
   - 1200x800 on primary display
   - Has full game control IPC access
   - Closing this window quits the entire app

2. **Audience Window** (`windows.ts:createAudienceWindow`)
   - Fullscreen on external display (falls back to primary if no external)
   - Read-only — only receives state updates
   - `frame: false`, `alwaysOnTop: true`, `skipTaskbar: true`

### State Flow

```
Controller UI  →  IPC invoke  →  Main Process (GameStateManager)  →  IPC broadcast  →  Both Windows
                                       ↓
                                 game-state.ts
                                 (reducer pattern)
```

- **GameStateManager** (`game-state.ts`) holds the single source of truth
- Controller sends commands via `ipcRenderer.invoke()` → `ipcMain.handle()`
- After each state change, main process broadcasts new state to ALL windows via `STATE_UPDATE`
- Both windows subscribe via `onStateUpdate` callback

### IPC Channels

All channels defined in `src/shared/constants.ts`:

**Game Commands** (Controller → Main):
- `game:load-questions`, `game:start-round`, `game:reveal-answer`, `game:unreveal-answer`
- `game:wrong-answer`, `game:update-score`, `game:set-team-name`
- `game:next-round`, `game:end-game`, `game:toggle-question-visibility`
- `game:set-logo`, `game:steal-success`, `game:steal-failed`

**Buzzer Commands**:
- `game:team-buzzed`, `game:reset-buzzer-lockout`
- `game:set-buzzer-config`, `game:toggle-buzzer-mode`

**Library Commands**:
- `library:get-all`, `library:get-by-type`, `library:get-stats`
- `library:add-question`, `library:update-question`, `library:delete-question`
- `library:mark-used`, `library:mark-unused`, `library:reset-all`

**Events** (Main → Renderers):
- `state:update` — full GameState broadcast after every change
- `audio:play-event` — triggers audio playback in renderer
- `app:error` — error notifications to controller

### Audio System

- Custom `audio://` protocol registered in main process (`index.ts`)
- `AudioManager` discovers `.wav`/`.mp3` files in assets directory
- On game events (reveal, wrong answer, buzz), main process calls `audioManager.play()`
- AudioManager broadcasts `AUDIO_PLAY` event to all windows with file URL + volume
- `useAudio` hook in renderers creates `HTMLAudioElement` instances and plays them
- Volume/mute controlled via IPC from AudioControls component

---

## Game State

### GameState Interface (`types.ts`)

```typescript
interface GameState {
  status: 'idle' | 'active' | 'ended';
  questions: Question[];              // All loaded questions for the session
  currentQuestionIndex: number;        // Which round we're on (0, 1, 2, 3+)
  currentQuestion: Question | null;    // Active question with answer states
  teamNames: { team1: string; team2: string };
  teamScores: { team1: number; team2: number };
  strikes: number;                     // 0-3 for current round
  maxStrikes: number;                  // Always 3
  roundPoints: { team1: number; team2: number };  // Per-team accumulator during round
  controllingTeam: 1 | 2;             // Who's playing
  stealMode: boolean;                  // Triggered at 3 strikes
  isTiebreaker: boolean;              // Auto-set after Round 3 tie
  questionVisible: boolean;           // Toggle question display
  logoTopLeft: string | null;         // Base64 data URL
  logoTopRight: string | null;        // Base64 data URL
  buzzerMode: boolean;
  buzzerLockout: {
    activeTeam: 1 | 2 | null;
    waitingForBuzz: boolean;
    buzzPhase: 'faceoff' | 'challenge' | 'playing' | null;
  };
  buzzerConfig: {
    team1Key: string;                  // Default "1"
    team2Key: string;                  // Default "2"
    lockoutDuration: number;           // Default 500ms
  };
  audioEnabled: boolean;
  volume: number;
  muted: boolean;
}
```

### Answer Interface

```typescript
interface Answer {
  text: string;
  points: number;
  revealed: boolean;
  revealedByTeam?: 1 | 2;  // Tracks which team revealed (for unreveal)
}
```

### Game Commands (Reducer)

The `GameStateManager.dispatch()` method handles all state transitions via a switch/case reducer:

| Command | Effect |
|---------|--------|
| `LOAD_QUESTIONS` | Validates via Zod, stores questions, resets game |
| `START_ROUND` | Sets status to active, loads current question |
| `REVEAL_ANSWER` | Marks answer revealed, adds points to team's roundPoints, checks 300-pt win |
| `UNREVEAL_ANSWER` | Marks answer unrevealed, subtracts points from original team's roundPoints |
| `WRONG_ANSWER` | Increments strikes; at 3 strikes activates steal mode |
| `UPDATE_SCORE` | Manual score adjustment (+/- delta) |
| `SET_TEAM_NAME` | Updates team display name |
| `NEXT_ROUND` | Transfers per-team roundPoints to totals, advances round, checks tiebreaker/win |
| `END_GAME` | Sets status to ended |
| `TOGGLE_QUESTION_VISIBILITY` | Shows/hides question on audience |
| `SET_LOGO` | Sets logo for topLeft or topRight position |
| `STEAL_SUCCESS` | All round points (both teams) go to stealing team |
| `STEAL_FAILED` | All round points go to original team |
| `TEAM_BUZZED` | Face-off logic: faceoff → challenge → playing phases |
| `RESET_BUZZER_LOCKOUT` | Manual buzzer reset |
| `SET_BUZZER_CONFIG` | Update key mapping or lockout duration |
| `TOGGLE_BUZZER_MODE` | Enable/disable buzzer system |

---

## Controller UI Layout (v1.4.0)

### Tab Structure

4 tabs in the controller header:

1. **Gameplay** — main game operation
2. **Question Library** — manage question sets
3. **Buzzer Settings** — configure USB buzzers
4. **Audio & Logo** — audio controls + logo upload

### Gameplay Tab Layout

```
┌──────────────────────────────────────────────┐
│ [AnswerControls]          │ [QuestionLoader]  │
│  - Current Question       │  - Upload JSON    │
│  - Team selector          │  - Load from Lib  │
│  - Answer buttons         │                   │
│    (click=reveal,         ├───────────────────│
│     click revealed=undo)  │ [ScoreControls]   │
│                           │  - Team 1 name    │
├───────────────────────────│    + score + +/-   │
│ [GameControls]            │  - Team 2 name    │
│  - Start Round            │    + score + +/-   │
│  - Wrong Answer / Steal   │                   │
│  - Next Round             │                   │
│  - End Game               │                   │
│  - Status panel           │                   │
│  - Buzzer status          │                   │
└──────────────────────────────────────────────┘
```

- Left column: AnswerControls (when question loaded) + GameControls stacked together
- Right column: QuestionLoader + ScoreControls stacked
- Both columns use `items-start` to avoid empty space

---

## Question System

### JSON File Format (for gameplay loading)

```json
[
  {
    "id": "round1",
    "text": "Name something you find at a beach",
    "answers": [
      { "text": "Sand", "points": 40 },
      { "text": "Water", "points": 30 },
      { "text": "Towel", "points": 15 },
      { "text": "Sunscreen", "points": 10 },
      { "text": "Umbrella", "points": 5 }
    ]
  }
]
```

- Flat array of questions (1 question = 1 round)
- 3 questions minimum for a full game (Round 1, 2, 3)
- Optional 4th question for tiebreaker
- 3-8 answers per question
- Validated by `questionArraySchema` (Zod)

### Question Set Format (library storage)

```json
{
  "questionSets": [{
    "id": "uuid",
    "name": "Set Name",
    "library": "general",
    "rounds": {
      "round1": { "text": "...", "answers": [...] },
      "round2": { "text": "...", "answers": [...] },
      "round3": { "text": "...", "answers": [...] }
    },
    "used": false,
    "createdAt": "ISO-timestamp",
    "lastUsed": null
  }]
}
```

- Groups 3 rounds into a single set
- Two libraries: `general-library.json` and `custom-library.json`
- Dev storage: `data/libraries/`
- Production storage: `%AppData%/Feud Frenzy/libraries/`

### Import JSON to Library

The Question Library tab has an "Import from JSON File" section that:
- Accepts the flat game JSON format
- Groups every 3 questions into a QuestionSet
- Names sets after the file name (e.g., "myquestions - Set 1")
- Lets user choose General or Custom library
- Files with < 3 questions show an error

---

## Gameplay Mechanics

### Standard Game Flow

1. Load questions (JSON file or from library)
2. Start Round → question appears on audience
3. Operator selects team and reveals answers → points go to that team's round points
4. Wrong Answer → strike added (3 strikes = steal mode)
5. Next Round → per-team round points transfer to team totals
6. After Round 3 → game ends (highest score wins) or tiebreaker if tied
7. 300-point instant win → game ends immediately when any team reaches 300

### Per-Team Round Points (v1.4.0)

Round points are tracked per team, not as a single pool:
- When Team 1 reveals an answer, points go to `roundPoints.team1`
- When Team 2 reveals an answer, points go to `roundPoints.team2`
- At round end, each team gets their own accumulated points
- In steal mode, ALL round points (both teams) go to the winner

### Unreveal Answer (v1.4.0)

Clicking a revealed answer undoes it:
- Answer goes back to hidden state on audience screen
- Points are subtracted from the original revealing team's round points
- Each answer tracks `revealedByTeam` to know which team to subtract from
- Visual: revealed answers hover red, show "Revealed — click to undo"

### Round 3 Double Points

All points in Round 3 (index 2) are multiplied by 2x. This applies to both reveal and unreveal calculations.

### Steal Mode

Triggered at 3 strikes:
- Control switches to opposing team
- Operator sees STEAL MODE banner with two buttons:
  - Steal Success → stealing team gets ALL round points
  - Steal Failed → original team gets ALL round points

### Tiebreaker

After Round 3, if scores are tied and neither team hit 300:
- Status goes to idle with `isTiebreaker: true`
- Uses the 4th question from the loaded set
- Audience shows "TIEBREAKER!" screen
- Game ends after tiebreaker round

### Buzzer System (Face-Off)

When buzzer mode is enabled:
1. Round starts → `waitingForBuzz: true`, audience shows "BUZZ IN!"
2. First team to press their key → enters `faceoff` phase
3. If they answer correctly → `playing` phase, normal 3-strike gameplay
4. If wrong → `challenge` phase, other team gets a chance
5. If other team also wrong → buzzer resets, both can buzz again
6. Strikes only count in `playing` phase

USB buzzers send keyboard characters — app listens on both windows.

---

## Audience Display

### Screen States

| State | Component | Trigger |
|-------|-----------|---------|
| Loading | `LoadingScreen` | App startup (3 seconds) |
| Idle | `IdleScreen` | Before round starts |
| Active | `GameBoard` | During round |
| Ended | `EndScreen` | Game over |

### Visual Design

- Background: `background.png` with blur overlay
- Question: Yellow gradient box, 4xl uppercase text
- Answers: 2-column grid, blue hidden → green revealed with scale animation
- Dynamic sizing: large (<=4 answers), medium (<=6), small (<=8)
- Scores: White cards with gradient text, glow effects
- Strikes: Red gradient circles with X marks
- Round Points: Yellow-orange gradient counter
- Badges: Double Points (yellow), Steal Mode (red-orange), Tiebreaker (red-purple)
- Logos: Absolute positioned top-left and top-right
- Active team (buzzer): Green glow + scale up; locked team dims

### Custom Animations (`tailwind.config.js`)

- `reveal` — scale + rotateY for answer card flip
- `zoom-in` — logo entrance on loading screen
- `scale-pulse` — logo breathing effect
- `sparkle-1/2/3` — sparkle emojis around logo
- `bounce-dot-1/2/3` — loading dots with staggered delay

---

## Build & Distribution

### Development

```bash
npm run dev          # Start Electron with hot reload (opens both windows)
```

### Production Build

```bash
npm run build        # Build main + preload + renderer with Vite
npm run package:win  # Build + create Windows NSIS installer
```

### Installer Output

- Location: `release/Feud Frenzy-{version}-Setup.exe`
- One-click NSIS installer, per-user (no admin required)
- Creates desktop + Start Menu shortcuts
- Bundles all assets (audio, images) via `extraResources`
- Audio files accessible at `process.resourcesPath/assets/audio/`

### Build Configuration

- `electron.vite.config.ts`: Three Vite builds — main (SSR), preload (CJS), renderer (SPA with two entry points)
- `electron-builder.json`: NSIS target, x64 only, code signing disabled
- Preload scripts must output CommonJS (not ESM) for Electron compatibility

---

## Key Implementation Patterns

### Preload Security Bridge

Both preload scripts inline IPC channel names (don't import from shared) to avoid code splitting issues. They expose a typed `window.electron` API via `contextBridge.exposeInMainWorld()`.

### Button Lockout

1-second disable after any reveal/unreveal action to prevent accidental double-clicks during live events. Implemented via `isDisabled` state + `setTimeout`.

### Buzzer Keyboard Listening

Both controller (`useBuzzer.ts`) and audience (`App.tsx`) windows listen for keyboard events. Uses `useRef` for the game state reference to avoid stale closures in event handlers.

### Toast Notifications

`BuzzerNotifications` uses a module-level listener pattern (`buzzerNotify` function) so any code can trigger notifications without prop drilling. Auto-dismiss after 3 seconds, max 5 visible.

### Library Storage

`LibraryManager` reads/writes JSON files synchronously with `readFileSync`/`writeFileSync`. Each operation re-reads the file to avoid stale data. Zod validates on read.

---

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| 1.0.0 | Jan 28, 2026 | V1 — Core game, dual windows, audio, animations |
| 1.0.1 | Feb 4, 2026 | V2 — Question library system, Windows installer |
| 1.2.0 | Feb 26, 2026 | V3 — USB buzzer integration with face-off mechanic |
| 1.3.0 | May 26, 2026 | Reorganized controller UI, unreveal answer, per-team round points |
| 1.4.0 | May 26, 2026 | Import JSON to library feature |
