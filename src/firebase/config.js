import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbJHGph4kbJGYwkJJp4UHeE4iPdQJOnrM",
  authDomain: "miniblog-b4b03.firebaseapp.com",
  projectId: "miniblog-b4b03",
  storageBucket: "miniblog-b4b03.appspot.com",
  messagingSenderId: "964563101799",
  appId: "1:964563101799:web:a22c704c17d043a02b0cc2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };