import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration (replace with your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCuT8vN5qJ9RHWi1LV9Hlt_91d4eIgNU9c",
  authDomain: "tutorapp-28cc8.firebaseapp.com",
  projectId: "tutorapp-28cc8",
  storageBucket: "tutorapp-28cc8.firebasestorage.app",
  messagingSenderId: "570000210952",
  appId: "1:570000210952:web:408530fcf47ff41c3f25bd",
  measurementId: "G-J1QPFKSF01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
