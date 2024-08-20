import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaXf5QrSzwQo01QLiQXpHTyl2_lRdsQcA",
  authDomain: "netflix-clone-react-8b927.firebaseapp.com",
  projectId: "netflix-clone-react-8b927",
  storageBucket: "netflix-clone-react-8b927.appspot.com",
  messagingSenderId: "494376152443",
  appId: "1:494376152443:web:72ea37d4f5a098a65d21de",
  measurementId: "G-2DVLTHER0P"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);