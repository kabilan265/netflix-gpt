// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxLdk7Z76CoPGGFULu-AjdTk_5-X4SzBc",
  authDomain: "netflix-gpt-62a3c.firebaseapp.com",
  projectId: "netflix-gpt-62a3c",
  storageBucket: "netflix-gpt-62a3c.appspot.com",
  messagingSenderId: "882613741066",
  appId: "1:882613741066:web:7946579093c2847e8421f3",
  measurementId: "G-DJNZQ7R19L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);