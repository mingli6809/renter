// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD22mBml-sDeLTcV76NAGHi0sexArMiZ2M",
    authDomain: "test-bb0e4.firebaseapp.com",
    projectId: "test-bb0e4",
    storageBucket: "test-bb0e4.appspot.com",
    messagingSenderId: "65667784079",
    appId: "1:65667784079:web:ef37d85cb7408c9764fffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);