import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqJP_z-X8JxT92aKyr1nJagRJYYGr8YgM",
  authDomain: "todo-app-dff14.firebaseapp.com",
  projectId: "todo-app-dff14",
  storageBucket: "todo-app-dff14.appspot.com",
  messagingSenderId: "690802080132",
  appId: "1:690802080132:web:60658a9fac7e8a53ef85d1",
  measurementId: "G-2SFGGF6RFT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;
