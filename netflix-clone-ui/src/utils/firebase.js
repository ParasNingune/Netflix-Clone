import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
Paste your firebase Config here
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
