import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   apiKey: "AIzaSyCLuV65hHaqF3to-6wFCt60lDq44kbVWPU",
   authDomain: "hospitalapp-387104.firebaseapp.com",
   projectId: "hospitalapp-387104",
   storageBucket: "hospitalapp-387104.appspot.com",
   messagingSenderId: "172387330522",
   appId: "1:172387330522:web:488509267ca53df2d838e3",
   measurementId: "G-XM59CBMWMR"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);