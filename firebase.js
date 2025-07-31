import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXKSzuh5GDeTqlS1v9cOHFkz6irsA9Sz0",
  authDomain: "tokoakunku-37524.firebaseapp.com",
  projectId: "tokoakunku-37524",
  storageBucket: "tokoakunku-37524.firebasestorage.app",
  messagingSenderId: "22018759928",
  appId: "1:22018759928:web:6cb447547b72209982af0d",
  measurementId: "G-BH2TZB0QDW"
};

// ✅ Inisialisasi Firebase hanya sekali
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (e) {
  console.error("Firebase init error:", e);
}

const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Fungsi Login & Register
window.handleRegister = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

window.handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔥 Fungsi simpan dan ambil akun di Firestore
window.saveAkunGame = (data) => addDoc(collection(db, "akunGame"), data);
window.getSemuaAkun = () => getDocs(collection(db, "akunGame"));

const adminEmails = ["rapirapi68@gmail.com"];
window.isAdmin = (email) => {
  const adminEmails = ["rapirapi68@gmail.com"]; // Ganti dengan email admin kamu
  return adminEmails.includes(email);
};
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Fungsi hapus akun berdasarkan ID
window.deleteAkunById = (id) => deleteDoc(doc(db, "akunGame", id));

import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Fungsi untuk mengubah status akun
export async function updateStatusAkun(id, status) {
  const docRef = doc(db, "akunGame", id);
  await updateDoc(docRef, { status });
}

// Di bagian paling bawah firebase.js
const ADMIN_EMAILS = ["rapirapi68@gmail.com"]; // Ganti sesuai email admin kamu

export function isAdmin(email) {
  return ADMIN_EMAILS.includes(email);
}

import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function updateAkunStatus(id, status) {
  const akunRef = doc(db, "akunGame", id);
  await updateDoc(akunRef, { status });
}

// Jika pakai window global
window.isAdmin = (email) => ADMIN_EMAILS.includes(email);

if (snapshot.empty) {
  akunList.innerHTML = "<p style='color: #ccc;'>Belum ada data akun yang masuk.</p>";
}
akunList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-approve")) {
    await updateAkunStatus(id, "approved");
    alert("Akun disetujui.");
    location.reload();
  }

  if (e.target.classList.contains("btn-reject")) {
    await updateAkunStatus(id, "rejected");
    alert("Akun ditolak.");
    location.reload();
  }

  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Yakin ingin menghapus akun ini?")) {
      await deleteAkunById(id);
      alert("Data berhasil dihapus.");
      location.reload();
    }
  }
});
akunList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Yakin ingin menghapus akun ini?")) {
      await deleteAkunById(id);
      alert("Data berhasil dihapus.");
      location.reload();
    }
  }

  if (e.target.classList.contains("btn-approve")) {
    await updateStatusAkun(id, "disetujui");
    alert("Akun telah disetujui.");
    location.reload();
  }

  if (e.target.classList.contains("btn-reject")) {
    await updateStatusAkun(id, "ditolak");
    alert("Akun telah ditolak.");
    location.reload();
  }
});
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function updateStatusAkun(id, status) {
  const akunRef = doc(db, "akunGame", id);
  await updateDoc(akunRef, { status });
}

import { onSnapshot } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export function listenToAkun(callback) {
  const akunRef = collection(db, "akunGame");
  return onSnapshot(akunRef, callback);
}