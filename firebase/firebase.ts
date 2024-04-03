import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  appId: process.env.NEXT_PUBLIC_API_APP_ID,
  projectId: process.env.NEXT_PUBLIC_API_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_API_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_API_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_API_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_API_MESSAGING_SENDER_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { fireDB, auth, storage };
