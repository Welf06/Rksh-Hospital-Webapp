import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
   authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
   projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
   storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
   messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
   appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
   measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
};

export const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);