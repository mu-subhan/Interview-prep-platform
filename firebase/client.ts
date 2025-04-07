// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL5sWDz3Gb2wa87SjJAkKMnlwFb8ZeZ8U",
  authDomain: "interview-prepwise-772e6.firebaseapp.com",
  projectId: "interview-prepwise-772e6",
  storageBucket: "interview-prepwise-772e6.firebasestorage.app",
  messagingSenderId: "574482034417",
  appId: "1:574482034417:web:d704f01dc41c04d3e78350",
  measurementId: "G-71267BE8KE"
};
// Initialization of  the  Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);