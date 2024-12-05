import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_JPAKtc788Y4JjI25PlmgBOROC_aI4Zc",
  authDomain: "gym1-2f584.firebaseapp.com",
  projectId: "gym1-2f584",
  storageBucket: "gym1-2f584.firebasestorage.app",
  messagingSenderId: "10106474239",
  appId: "1:10106474239:web:785d53664b5718a32ac6ca",
  measurementId: "G-WW08CS29VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
