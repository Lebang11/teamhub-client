// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDAjLzlQ75TvWKUcc2TG37muEg9SZJVZV8",
  authDomain: "team-hub-18735.firebaseapp.com",
  projectId: "team-hub-18735",
  storageBucket: "team-hub-18735.appspot.com",
  messagingSenderId: "795963822854",
  appId: "1:795963822854:web:99c767d5fd05dc3d024487",
  measurementId: "G-6GMR573WMH"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)