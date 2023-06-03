import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaho8lSZuVghuQEzwEYpDh-dOKZaIuoYI",
  authDomain: "salecars-e1215.firebaseapp.com",
  projectId: "salecars-e1215",
  storageBucket: "salecars-e1215.appspot.com",
  messagingSenderId: "1018047458602",
  appId: "1:1018047458602:web:847bf01fd5916f32964253",
  measurementId: "G-576QJ31HJY"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);