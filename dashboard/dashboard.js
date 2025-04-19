import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAwkibqUpHYu_V52kyqsw4I-up96GpqJtc",
  authDomain: "loginapp-47943.firebaseapp.com",
  projectId: "loginapp-47943",
  storageBucket: "loginapp-47943.appspot.com",
  messagingSenderId: "210937720299",
  appId: "1:210937720299:web:c65b4412d87f7469fa7dae",
  measurementId: "G-W4VSHZ1WKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("profileForm");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userEmail = user.email;

    document.getElementById("userId").value = uid;
    document.getElementById("email").value = userEmail;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      document.getElementById("name").value = data.name || "";
      document.getElementById("phone").value = data.phone || "";
      document.getElementById("email").value = data.email || userEmail; // ✅ fallback to Firebase email
      document.getElementById("dob").value = data.dob || "";
      document.getElementById("address").value = data.address || "";
      document.getElementById("pincode").value = data.pincode || "";
      document.getElementById("city").value = data.city || "";
      document.getElementById("state").value = data.state || "";
      document.getElementById("whatsapp").value = data.whatsapp || "";
      document.getElementById("govtIdType").value = data.govtIdType || "";
      document.getElementById("govtIdNumber").value = data.govtIdNumber || "";
    }
  } else {
    window.location.href = "../login.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value, // ✅ make sure email gets saved too
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    pincode: document.getElementById("pincode").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    whatsapp: document.getElementById("whatsapp").value,
    govtIdType: document.getElementById("govtIdType").value,
    govtIdNumber: document.getElementById("govtIdNumber").value,
  };

  await setDoc(doc(db, "users", user.uid), formData, { merge: true });
  alert("Profile updated successfully.");
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  if (toggleButton && sidebar) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
});

