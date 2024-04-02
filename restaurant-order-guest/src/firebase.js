// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(process.env.FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "matja-ordering-app.firebaseapp.com",
  projectId: "matja-ordering-app",
  storageBucket: "matja-ordering-app.appspot.com",
  messagingSenderId: "279593979890",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
