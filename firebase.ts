import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHMDTa0HJAI-U_N9RGFu9LSb13MVsGzEg",
  authDomain: "teme-e2bf3.firebaseapp.com",
  projectId: "teme-e2bf3",
  storageBucket: "teme-e2bf3.appspot.com",
  messagingSenderId: "538684536235",
  appId: "1:538684536235:web:04640f8c4aa4fbd2500eee",
  measurementId: "G-4LS2R3C7X9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
