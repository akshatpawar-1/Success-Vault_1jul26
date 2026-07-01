import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBywl2knABXOR0N01pIgh742Ksvy4uKWtg",
  authDomain: "success-vault-1jul26.firebaseapp.com",
  databaseURL: "https://success-vault-1jul26-default-rtdb.firebaseio.com",
  projectId: "success-vault-1jul26",
  storageBucket: "success-vault-1jul26.firebasestorage.app",
  messagingSenderId: "26851013977",
  appId: "1:26851013977:web:8e524ba1f5141a34b14848"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;