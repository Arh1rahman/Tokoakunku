// js/firebase.js

// Firebase App & Service
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs,
  deleteDoc, doc, updateDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXKSzuh5GDeTqlS1v9cOHFkz6irsA9Sz0",
  authDomain: "tokoakunku-37524.firebaseapp.com",
  projectId: "tokoakunku-37524",
  storageBucket: "tokoakunku-37524.appspot.com", // ← diperbaiki dari ".app" ke ".appspot.com"
  messagingSenderId: "22018759928",
  appId: "1:22018759928:web:6cb447547b72209982af0d",
  measurementId: "G-BH2TZB0QDW"
};

// Inisialisasi Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ===== 🔐 Autentikasi =====
window.handleRegister = (email, password) => createUserWithEmailAndPassword(auth, email, password);
window.handleLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// ===== 🧾 Firestore: Akun Game =====
window.saveAkunGame = (data) => addDoc(collection(db, "akunGame"), data);
window.getSemuaAkun = () => getDocs(collection(db, "akunGame"));
window.deleteAkunById = (id) => deleteDoc(doc(db, "akunGame", id));

window.updateAkunStatus = (id, status) => {
  const akunRef = doc(db, "akunGame", id);
  return updateDoc(akunRef, { status });
};

window.listenToAkun = (callback) => {
  const akunRef = collection(db, "akunGame");
  return onSnapshot(akunRef, callback);
};

// ===== ☁️ Firebase Storage =====
window.uploadGambar = async (file) => {
  const storageRef = ref(storage, `akunImages/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// ===== 👮 Admin Email =====
const ADMIN_EMAILS = ["rapirapi68@gmail.com"];
window.isAdmin = (email) => ADMIN_EMAILS.includes(email);

// ===== Export Opsional =====
export { db, storage, auth };
