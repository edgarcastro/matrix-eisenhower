import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const {
  REACT_APP_FB_ANALYTICS_ENABLED: analyticsEnabled,
  REACT_APP_ENVIRONMENT: environment,
} = process.env;

const getConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FB_API_KEY || 'localKey',
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID || 'localProjectId',
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
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

if (environment !== 'production') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectDatabaseEmulator(database, 'localhost', 9000);
}

export { auth, database };
