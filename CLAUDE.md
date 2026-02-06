# CLAUDE.md - AI Assistant Guide for Matrix Eisenhower

## Project Overview

Eisenhower Matrix Task Manager: a single-page React app for prioritizing tasks across four quadrants (Urgent/Important, Urgent/Not Important, Not Urgent/Important, Not Urgent/Not Important) with drag-and-drop and Firebase-backed persistence.

Live: https://metis-57c1f.web.app/

## Tech Stack

- **Runtime**: Node.js 22.15.0 (see `.nvmrc`)
- **Package manager**: Yarn 4.10.2 (Corepack-managed, see `.yarnrc.yml`)
- **Framework**: React 19.1.1 with TypeScript 5.8.3 (strict mode)
- **Bundler**: Vite 7.1.6
- **Styling**: Tailwind CSS 4.1.13 (via `@tailwindcss/vite` plugin)
- **UI components**: shadcn/ui (new-york style, stone base color) with Radix UI primitives
- **Icons**: Lucide React
- **Drag & Drop**: Atlaskit Pragmatic Drag and Drop
- **Backend**: Firebase 12.3.0 (Auth + Realtime Database)
- **Linting**: ESLint 9.35.0 with typescript-eslint, react-hooks, react-refresh plugins

## Commands

```bash
yarn dev          # Start Vite dev server (development mode)
yarn start        # Start Vite dev server + Firebase emulators concurrently
yarn build        # TypeScript check + Vite production build (tsc -b && vite build)
yarn lint         # Run ESLint across the project
yarn preview      # Preview production build locally
```

**Build check**: Always run `yarn build` to validate changes. It runs `tsc -b` first (catches type errors) then `vite build`.

**No test framework** is configured. There are no unit or integration tests in this project.

## Project Structure

```
src/
├── main.tsx              # Entry point (StrictMode, renders App)
├── App.tsx               # Root component: state management, drag-drop monitoring, quadrant layout
├── types.ts              # Core types: ListItem, List, EisenhowerList
├── api.ts                # Firebase CRUD: writeEisenhowerList(), readEisenhowerList()
├── firebase.ts           # Firebase init, emulator connection in dev mode
├── utils.ts              # formatFirebaseAuthError() - maps Firebase error codes to messages
├── index.css             # Tailwind imports, CSS variables (oklch), dark mode theme
├── vite-env.d.ts         # Vite type declarations
├── components/
│   ├── List.tsx           # Quadrant component (drop target, item list, add input)
│   ├── ListItem.tsx       # Individual task (draggable, checkbox, delete)
│   ├── Navbar.tsx         # Top nav with auth controls, dark mode toggle
│   ├── Login.tsx          # Auth dialog (sign in / sign up forms)
│   ├── Footer.tsx         # Footer with AboutMe link
│   ├── AboutMe.tsx        # Developer profile card
│   ├── Share.tsx          # Placeholder for future sharing feature
│   └── ui/               # shadcn/ui components (button, input, checkbox, dialog, label, tooltip, skeleton, spinner)
├── hooks/
│   └── useAuth.ts         # Auth state hook via onAuthStateChanged
└── lib/
    └── utils.ts           # cn() helper (clsx + tailwind-merge)
```

## Architecture

### Data Model

```typescript
type ListItem = { id: string; text: string; completed: boolean }
type List = { id: string; title: string; urgent: boolean; important: boolean; color?: string; darkColor?: string; styles: string; items?: ListItem[] }
type EisenhowerList = List[]
```

Four fixed quadrants with IDs "1"-"4" are defined in `App.tsx` as `initialLists`. Items are stored per-user in Firebase at `lists/{userId}`.

### State Management

- All task state lives in `App.tsx` via `useState<EisenhowerList>`
- Callbacks (add, remove, complete, move) are passed down as props
- Firebase writes happen on every state change via `handleWriteLists()`
- Initial data fetch happens on auth state change in a `useEffect`
- No global state library (no Redux, Zustand, etc.)

### Drag and Drop

- Uses `@atlaskit/pragmatic-drag-and-drop` (not react-dnd or dnd-kit)
- `ListItem` components are draggable via `draggable()` from the element adapter
- `List` components are drop targets via `dropTargetForElements()`
- `App.tsx` uses `monitorForElements()` to handle cross-quadrant moves
- Data attributes: `listId` and `itemId` are attached to drag source/target data

### Authentication

- Firebase Auth with email/password (sign in + sign up)
- `useAuth` hook wraps `onAuthStateChanged` listener
- Dev mode auto-connects to Firebase Auth emulator on port 9099

### Dark Mode

- Controlled via `data-theme` attribute on `<html>` element
- CSS custom variant: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))`
- Theme variables use oklch color space
- Toggled in Navbar component

## Key Conventions

### Imports

- Use `@/` path alias for all `src/` imports (configured in `tsconfig.json` and `vite.config.ts`)
- Example: `import { cn } from "@/lib/utils"`

### Components

- Functional components only, no class components
- PascalCase for component files and names
- Props defined via TypeScript interfaces/types inline or in `types.ts`
- UI primitives come from `src/components/ui/` (shadcn/ui pattern)

### Styling

- Tailwind utility classes for all styling
- Use `cn()` from `@/lib/utils` to merge conditional class names
- Component variants via `class-variance-authority` (CVA) in ui components
- Quadrant colors defined inline in `initialLists` (e.g., `bg-red-500 dark:bg-red-900`)

### TypeScript

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Target ES2020, module ESNext
- Avoid `any` types

### IDs

- New items get UUIDs via `uuid` v4 (`uuidv4()`)
- Quadrant list IDs are fixed strings: "1", "2", "3", "4"

## Environment Variables

Firebase config is provided via Vite env variables (prefix `VITE_`):

```
VITE_FB_API_KEY
VITE_FB_AUTH_DOMAIN
VITE_FB_DATABASE_URL
VITE_FB_PROJECT_ID
VITE_FB_STORAGE_BUCKET
VITE_FB_MESSAGING_SENDER_ID
VITE_FB_APP_ID
VITE_FB_MEASUREMENT_ID
VITE_FB_ANALYTICS_ENABLED
VITE_ENVIRONMENT
```

In development mode, the app connects to Firebase emulators automatically (Auth: 9099, Database: 9000, Hosting: 6000).

## CI/CD

- **On push to `main`**: GitHub Actions builds and deploys to Firebase Hosting (project `metis-57c1f`, live channel)
- **On pull request**: GitHub Actions builds and creates a Firebase Hosting preview deployment (project `tique-fb79a`)
- Build step: `yarn && yarn build`
- Firebase secrets are stored in GitHub repository secrets

## Firebase

- **Realtime Database** (not Firestore) at path `lists/{userId}`
- **Database rules**: authenticated users can read/write all data (`auth != null`)
- **Emulators** configured in `firebase.json` for local development
- Hosting serves from `dist/` with SPA rewrite (`** -> /index.html`)

## Adding shadcn/ui Components

The project uses shadcn/ui with the `new-york` style. Configuration is in `components.json`. New components go in `src/components/ui/`. The `cn()` utility from `@/lib/utils` is used for class merging.
