
import { initializeApp } from "firebase/app";

//hide apikey in .env
const firebaseConfig = {
  apiKey: "AIzaSyBrJYJct0mJZr2C5GZHmL6NGRzovqhu418",
  authDomain: "kpraise.firebaseapp.com",
  projectId: "kpraise",
  storageBucket: "kpraise.appspot.com",
  messagingSenderId: "211908109098",
  appId: "1:211908109098:web:ac51cb214f93e722467453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;