// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLKA2IGruf5e6PPahlsA8eQAXiOML9CSU",
  authDomain: "mern-blog-aa33d.firebaseapp.com",
  projectId: "mern-blog-aa33d",
  storageBucket: "mern-blog-aa33d.appspot.com",
  messagingSenderId: "179693904614",
  appId: "1:179693904614:web:2ede17aca77f40ea46d127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app