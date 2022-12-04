// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARkYwYX0pAEMGyTarUJVMeeT1W1vnMo4U",
    authDomain: "covid-19-tracker-7905d.firebaseapp.com",
    projectId: "covid-19-tracker-7905d",
    storageBucket: "covid-19-tracker-7905d.appspot.com",
    messagingSenderId: "335142207697",
    appId: "1:335142207697:web:fb3e2e200f754582e685f0",
    measurementId: "G-59ER4CD689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);