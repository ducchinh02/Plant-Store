import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA4nfWRps30AA_XzfVmROLAgFJNQE8crD8",
  authDomain: "plant-store-320c8.firebaseapp.com",
  projectId: "plant-store-320c8",
  storageBucket: "plant-store-320c8.appspot.com",
  messagingSenderId: "454511757601",
  appId: "1:454511757601:web:6655905186673cc0c5d660",
  measurementId: "G-3NVKVLR37Q",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const store = firebase.firestore();

export { store, auth, storage };
