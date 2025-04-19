import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  
  import {
    getFirestore,
    doc,
    setDoc
  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  
  
  // Firebase config (same as in your firebase-config.js)
  const firebaseConfig = {
    apiKey: "AIzaSyAwkibqUpHYu_V52kyqsw4I-up96GpqJtc",
    authDomain: "loginapp-47943.firebaseapp.com",
    projectId: "loginapp-47943",
    storageBucket: "loginapp-47943.appspot.com",
    messagingSenderId: "210937720299",
    appId: "1:210937720299:web:c65b4412d87f7469fa7dae",
    measurementId: "G-W4VSHZ1WKM"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // Get form elements
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  
  // Switch between forms
  function showSignup() {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  }
  
  function showLogin() {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  }
  
  function showPopup(message, next) {
    popupMessage.innerText = message;
    popup.style.display = "flex";
    popup.onclick = () => {
      popup.style.display = "none";
      if (next) next();
    };
  }
  
  window.showSignup = showSignup;
  window.showLogin = showLogin;
  window.closePopup = () => (popup.style.display = "none");
  
  // Signup logic
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = signupForm.signupName.value;
    const phone = signupForm.signupPhone.value;
    const email = signupForm.signupEmail.value;
    const password = signupForm.signupPassword.value;
    const confirm = signupForm.signupConfirmPassword.value;
  
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        email,
        createdAt: new Date()
      });
  
      showPopup("Signup Successful!", () => {
        showLogin();
      });
    } catch (err) {
      alert(err.message);
    }
  });
  
  // Login logic
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.loginEmail.value;
    const password = loginForm.loginPassword.value;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showPopup("Login Successful!", () => {
        window.location.href = "../../main.html"; // Redirect to the main page
      });
    } 
    catch (err) {
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      const errorMsg = document.getElementById("loginError");
    
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
    
      errorMsg.textContent = "Invalid credentials. Please try again.";
      errorMsg.style.display = "block";
    }

  });
  
  