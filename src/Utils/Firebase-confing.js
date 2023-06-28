
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtJZWzvsIVOmq7_eeSSNHispqBLR4ZNL4",
  authDomain: "netflix-ui-d45f8.firebaseapp.com",
  projectId: "netflix-ui-d45f8",
  storageBucket: "netflix-ui-d45f8.appspot.com",
  messagingSenderId: "738868808559",
  appId: "1:738868808559:web:896f23454e92351c15b69a",
  measurementId: "G-HKT92FVJLS"
};


const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
