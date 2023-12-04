import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDFNNEqNCLt_Y5VU5UfCP0vqW4xn67L9Vw",
    authDomain: "airbnbapp-3a80d.firebaseapp.com",
    projectId: "airbnbapp-3a80d",
    storageBucket: "airbnbapp-3a80d.appspot.com",
    messagingSenderId: "300921732906",
    appId: "1:300921732906:web:882b9576b032eeeeed6853",
    measurementId: "G-G7FCZ6V5LB"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);