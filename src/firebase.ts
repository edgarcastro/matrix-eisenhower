import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const {
  VITE_FB_ANALYTICS_ENABLED: analyticsEnabled,
  VITE_EMULATORS_ENABLED: emulatorsEnabled,
} = import.meta.env;

const getConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FB_API_KEY || 'localKey',
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
  projectId: import.meta.env.VITE_FB_PROJECT_ID || 'localProjectId',
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

const app = initializeApp(getConfig);

const auth = getAuth(app);

if (analyticsEnabled) {
  (async function () {
    if (await isSupported()) {
      getAnalytics(app);
    }
  })();
}

const database = getDatabase(app);

console.log(emulatorsEnabled);
if (emulatorsEnabled === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectDatabaseEmulator(database, 'localhost', 9000);
}

export { auth, database };
