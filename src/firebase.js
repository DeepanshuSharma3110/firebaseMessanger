import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmS1DC4keQenj2hClfbVOTPtVaR7OkB4k",
  authDomain: "chat-ec491.firebaseapp.com",
  databaseURL:"https://chat-ec491-default-rtdb.firebaseio.com",
  projectId: "chat-ec491",
  storageBucket: "chat-ec491.appspot.com",
  messagingSenderId: "752345522321",
  appId: "1:752345522321:web:569bcfc5892655b441df30",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
