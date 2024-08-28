 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "helpdesk-mern.firebaseapp.com",
  projectId: "helpdesk-mern",
  storageBucket: "helpdesk-mern.appspot.com",
  messagingSenderId: "99367700772",
  appId: "1:99367700772:web:1c63359c4d8e4d70410bb1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
