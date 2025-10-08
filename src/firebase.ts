import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

import firebaseConfig from "../firebase.json";

const { MODE } = import.meta.env;

const getConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FB_API_KEY || "localKey",
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
  projectId: import.meta.env.VITE_FB_PROJECT_ID || "metis-57c1f",
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

const app = initializeApp(getConfig);

const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getDatabase(app);

if (MODE === "development") {
  connectAuthEmulator(
    auth,
    `http://localhost:${firebaseConfig.emulators.auth.port}`
  );
  connectDatabaseEmulator(
    db,
    "localhost",
    firebaseConfig.emulators.database.port
  );
}

export { auth, db };
