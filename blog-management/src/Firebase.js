// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNdRhQv6CLdXd5ZE25wrl6JO59xlSLAqM",
    authDomain: "blog-management-7dff3.firebaseapp.com",
    databaseURL: "https://blog-management-7dff3-default-rtdb.firebaseio.com",
    projectId: "blog-management-7dff3",
    storageBucket: "blog-management-7dff3.appspot.com",
    messagingSenderId: "686185098075",
    appId: "1:686185098075:web:27a02789140919e1bcc87e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);