import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCNyoZ7v00P-s6lBtjtNl89UiPKFLrj5Ds",
  authDomain: "react-auth-3950d.firebaseapp.com",
  projectId: "react-auth-3950d",
  storageBucket: "react-auth-3950d.appspot.com",
  messagingSenderId: "97202534012",
  appId: "1:97202534012:web:c733deba7a01ccad003bf9"
};

const app = initializeApp(firebaseConfig);
export const authentication =getAuth(app);

