import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserId = null;
let chart;
let recentData = [];

const ctx = document.getElementById("healthChart").getContext("2d");
const form = document.getElementById("vitalsForm");

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    loadVitals("sugarLevel");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    systolic: +document.getElementById("systolic").value,
    diastolic: +document.getElementById("diastolic").value,
    heartRate: +document.getElementById("heartRate").value,
    sugarLevel: +document.getElementById("sugarLevel").value,
    sleepHours: +document.getElementById("sleepHours").value,
    date: document.getElementById("vitalDate").value
  };

  if (currentUserId) {
    await addDoc(collection(db, "users", currentUserId, "vitals"), data);
    form.reset();
    loadVitals(document.getElementById("vitalSelect").value);
  }
});

document.getElementById("vitalSelect").addEventListener("change", (e) => {
  loadVitals(e.target.value);
});

async function loadVitals(type) {
  const q = query(collection(db, "users", currentUserId, "vitals"), orderBy("date"));
  const snapshot = await getDocs(q);
  const allData = snapshot.docs.map(doc => doc.data());

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  recentData = allData.filter(d => new Date(d.date) >= sevenDaysAgo);

  const labels = recentData.map(d => d.date);
  let values;

  if (type === "bloodPressure") {
    values = {
      labels,
      datasets: [
        { label: "Systolic", data: recentData.map(d => d.systolic), borderColor: "#e63946", tension: 0.3 },
        { label: "Diastolic", data: recentData.map(d => d.diastolic), borderColor: "#1d3557", tension: 0.3 }
      ]
    };
  } else {
    const colorMap = {
      sugarLevel: "#f77f00",
      heartRate: "#219ebc",
      sleepHours: "#3a86ff"
    };
    values = {
      labels,
      datasets: [{
        label: type,
        data: recentData.map(d => d[type]),
        borderColor: colorMap[type],
        fill: false,
        tension: 0.3
      }]
    };
  }

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: values,
    options: {
      responsive: true,
      animation: { duration: 1000 },
      plugins: { legend: { position: "top" } }
    }
  });
}

document.getElementById("downloadPdfBtn").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(16);
  doc.text("🩺 Weekly Health Tracker Report", margin, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
  y += 10;

  if (recentData.length === 0) {
    doc.text("No data found for the past 7 days.", margin, y);
    doc.save("Weekly_Health_Report.pdf");
    return;
  }

  const latest = recentData[recentData.length - 1];
  const summary = [
    `Latest Entry: ${latest.date}`,
    `Blood Pressure: ${latest.systolic}/${latest.diastolic} mmHg`,
    `Heart Rate: ${latest.heartRate} bpm`,
    `Sugar Level: ${latest.sugarLevel} mg/dL`,
    `Sleep Hours: ${latest.sleepHours} hrs`
  ];
  for (const line of summary) {
    if (y + 10 > pageHeight) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 10;
  }

  // Create and render charts one by one
  const chartTypes = ["bloodPressure", "heartRate", "sugarLevel", "sleepHours"];
  for (const type of chartTypes) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    const tempCtx = canvas.getContext("2d");

    const labels = recentData.map(d => d.date);
    const datasets = type === "bloodPressure"
      ? [
          { label: "Systolic", data: recentData.map(d => d.systolic), borderColor: "#e63946", tension: 0.3 },
          { label: "Diastolic", data: recentData.map(d => d.diastolic), borderColor: "#1d3557", tension: 0.3 }
        ]
      : [{
          label: type,
          data: recentData.map(d => d[type]),
          borderColor: {
            heartRate: "#219ebc",
            sugarLevel: "#f77f00",
            sleepHours: "#3a86ff"
          }[type],
          fill: false,
          tension: 0.3
        }];

    new Chart(tempCtx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: false,
        animation: false,
        plugins: { legend: { display: true } }
      }
    });

    await new Promise(res => setTimeout(res, 400));

    const imgData = canvas.toDataURL("image/png");
    if (y + 90 > pageHeight) {
      doc.addPage();
      y = margin;
    }
    doc.text(type.toUpperCase(), margin, y);
    y += 5;
    doc.addImage(imgData, "PNG", margin, y, 170, 80);
    y += 90;
  }

  doc.save("Weekly_Health_Report.pdf");
});
