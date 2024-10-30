import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } = Constants.expoConfig.extra;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };