import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7GI9b28AjwyAum4OnFng9zQPzpe4OR2o",
  authDomain: "finance-4f328.firebaseapp.com",
  projectId: "finance-4f328",
  storageBucket: "finance-4f328.firebasestorage.app",
  messagingSenderId: "137230006676",
  appId: "1:137230006676:web:776db3f848da52301f7781",
  measurementId: "G-T0QFGL1CWT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
