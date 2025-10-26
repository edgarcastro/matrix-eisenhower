# Eisenhower Matrix Task Manager

A modern web application for prioritizing tasks using the Eisenhower Matrix methodology, with drag-and-drop functionality and real-time Firebase synchronization.

## 🔗 Live Demo

**[https://metis-57c1f.web.app/](https://metis-57c1f.web.app/)**

## 📋 What is the Eisenhower Matrix?

The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a time management tool that helps you prioritize tasks by urgency and importance. It divides tasks into four quadrants:

1. **Urgent and Important** (Do First) - Critical tasks that require immediate attention
2. **Not Urgent but Important** (Schedule) - Strategic tasks that contribute to long-term goals
3. **Urgent but Not Important** (Delegate) - Tasks that demand attention but can be delegated
4. **Not Urgent and Not Important** (Eliminate) - Low-value tasks that should be minimized

This method helps you focus on what truly matters and avoid getting caught up in seemingly urgent but ultimately unimportant tasks.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.6
- **Styling**: Tailwind CSS 4.1.13
- **UI Components**: Radix UI (Dialog, Checkbox, Label, Slot)
- **Drag & Drop**: Atlaskit Pragmatic Drag and Drop
- **Backend**: Firebase 12.3.0 (Authentication & Firestore Database)
- **Icons**: Lucide React
- **Package Manager**: Yarn 4.10.2

## ✨ Features

- ✅ Interactive drag-and-drop task management
- ✅ Four-quadrant Eisenhower Matrix layout
- ✅ Real-time data synchronization with Firebase
- ✅ User authentication
- ✅ Task completion tracking
- ✅ Responsive design for mobile and desktop
- ✅ Dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- Yarn package manager
- Firebase account (for authentication and database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/edgarcastro/matrix-eisenhower.git
cd workspace
```

2. Install dependencies:

```bash
yarn install
```

3. Set up Firebase configuration:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Add your Firebase configuration to `src/firebase.ts`

### Running the Application

#### Development Mode

```bash
yarn dev
```

This will start the Vite development server on `http://localhost:5173`

#### Development with Firebase Emulators

```bash
yarn start
```

This runs both the Vite dev server and Firebase emulators concurrently.

#### Build for Production

```bash
yarn build
```

This compiles TypeScript and builds the production bundle to the `dist` folder.

#### Preview Production Build

```bash
yarn preview
```

This serves the production build locally for testing.

#### Lint Code

```bash
yarn lint
```

Runs ESLint to check code quality.

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── List.tsx     # Matrix quadrant component
│   ├── ListItem.tsx # Individual task component
│   ├── Navbar.tsx   # Navigation bar
│   ├── Footer.tsx   # Footer component
│   ├── Login.tsx    # Authentication component
│   └── Share.tsx    # Share functionality
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── api.ts           # Firebase API functions
├── firebase.ts      # Firebase configuration
├── types.ts         # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
