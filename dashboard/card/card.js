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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Page load logic
window.onload = function () {
  const loader = document.getElementById("loader");
  const formSection = document.getElementById("formSection");
  const cardContainer = document.getElementById("cardContainer");
  const statusCanvas = document.getElementById("statusCanvas");
  const termsPopup = document.getElementById("termsPopup");

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const uid = user.uid;
      const cardRef = db.collection("users").doc(uid).collection("card");
      try {
        const snapshot = await cardRef.get();
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          const cardId = doc.id;
          const status = data.status?.toLowerCase();

          if (status === "accepted") {
            let updated = false;

            if (!data.cardNumber) {
              data.cardNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
              updated = true;
            }

            if (!data.coverageAmount) {
              data.coverageAmount = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
              updated = true;
            }

            if (updated) {
              await cardRef.doc(cardId).update({
                cardNumber: data.cardNumber,
                coverageAmount: data.coverageAmount
              });
            }

            showCard(data);
          } else {
            showStatusCanvas(status);
          }
        } else {
          termsPopup.style.display = "flex";
        }
      } catch (err) {
        console.error("Error checking application:", err);
        formSection.style.display = "block";
      } finally {
        loader.style.display = "none";
      }
    } else {
      alert("Please log in to access your insurance application.");
      loader.style.display = "none";
    }
  });
};

// DOMContentLoaded for button events
document.addEventListener("DOMContentLoaded", function () {
  const acceptBtn = document.getElementById("acceptTermsBtn");
  const cancelBtn = document.getElementById("cancelTermsBtn");
  const addBtn = document.getElementById("addMemberBtn");
  const form = document.getElementById("insuranceForm");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      document.getElementById("termsPopup").style.display = "none";
      document.getElementById("formSection").style.display = "block";
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      window.location.href = "../dashboard.html";
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const name = document.getElementById("familyName").value.trim();
      const aadhar = document.getElementById("familyAadhaar").value.trim();
      const relation = document.getElementById("familyRelation").value.trim();

      if (name && aadhar && relation) {
        const list = document.getElementById("familyMembers");
        const li = document.createElement("li");
        li.textContent = `${name} - ${aadhar} - ${relation}`;
        list.appendChild(li);

        // Clear fields
        document.getElementById("familyName").value = "";
        document.getElementById("familyAadhaar").value = "";
        document.getElementById("familyRelation").value = "";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return alert("User not logged in");

      const uid = user.uid;

      const familyList = [...document.getElementById("familyMembers").children].map((li) => {
        const [name, aadhar, relation] = li.textContent.split(" - ");
        return { name, aadhar, relation };
      });

      const formData = {
        fullName: form.fullName.value,
        gender: form.gender.value,
        dob: form.dob.value,
        mobileNumber: form.mobileNumber.value,
        panCardNumber: form.panCardNumber.value.toUpperCase(),
        address: form.address.value,
        state: form.state.value,
        district: form.district.value,
        village: form.village.value,
        pincode: form.pincode.value,
        familyMembers: familyList,
        status: "in progress",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      try {
        await db.collection("users").doc(uid).collection("card").add(formData);
        alert("Your form has been submitted!");
        document.getElementById("formSection").style.display = "none";
        showStatusCanvas("in progress");
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("Something went wrong.");
      }
    });
  }
});

// Show card function
function showCard(data) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.style.display = "block";
  cardContainer.innerHTML = `
    <div class="insurance-card card-box">
      <h3>MediTrust Card</h3>
      <p><span class="label">Name:</span> ${data.fullName}</p>
      <p><span class="label">DOB:</span> ${data.dob}</p>
      <p><span class="label">Address:</span> ${data.address}, ${data.village}, ${data.district}, ${data.state} - ${data.pincode}</p>
      <p><span class="label">Card Number:</span> ${data.cardNumber}</p>
      <p><span class="label">Coverage Amount:</span> ₹${data.coverageAmount}</p>
      <button onclick="downloadCard()" id="downloadCardBtn">Download Card</button>
    </div>
  `;
}

// Show status canvas
function showStatusCanvas(status) {
  const canvas = document.getElementById("statusCanvas");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 300;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00a3c8";
  ctx.font = "22px Segoe UI";

  let msg = "Application Status: " + status.toUpperCase();
  if (status === "in progress") msg = "Your Insurance Application is In Progress";
  if (status === "rejected") msg = "Your Insurance Application was Rejected";

  ctx.fillText(msg, 40, 150);
}

// Download PDF
function downloadCard() {
  const card = document.querySelector(".insurance-card");
  const downloadBtn = document.getElementById("downloadCardBtn");
  downloadBtn.style.display = "none";

  html2canvas(card).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
    pdf.save("MediTrust_Card.pdf");
    downloadBtn.style.display = "block";
  });
}
