const firebaseConfig = {
    apiKey: "AIzaSyAwkibqUpHYu_V52kyqsw4I-up96GpqJtc",
    authDomain: "loginapp-47943.firebaseapp.com",
    projectId: "loginapp-47943",
    storageBucket: "loginapp-47943.appspot.com",
    messagingSenderId: "210937720299",
    appId: "1:210937720299:web:c65b4412d87f7469fa7dae",
    measurementId: "G-W4VSHZ1WKM"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  let reports = [];
  let currentPage = 1;
  const reportsPerPage = 4;
  
  // ✅ Auth state check and fetch user's reports from subcollection
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const snapshot = await db
          .collection("users")
          .doc(user.uid)
          .collection("reports")
          .orderBy("appointmentDate", "desc") // Make sure this field exists in Firestore
          .get();
  
        reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        displayReports();
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    } else {
      alert("You must be logged in to view reports.");
    }
  });
  
  // ✅ Display reports with pagination and filtering
  function displayReports() {
    const list = document.getElementById("reportsList");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    list.innerHTML = "";
  
    const filtered = reports.filter(r =>
      r.reportOf?.toLowerCase().includes(searchInput) ||
      r.doctor?.toLowerCase().includes(searchInput)
    );
  
    const start = (currentPage - 1) * reportsPerPage;
    const paginated = filtered.slice(start, start + reportsPerPage);
  
    if (paginated.length === 0) {
      list.innerHTML = "<p>No reports found.</p>";
    }
  
    paginated.forEach(r => {
      const div = document.createElement("div");
      div.className = "report-card";
      div.innerHTML = `
        <p><strong>Report Of:</strong> ${r.reportOf || "N/A"}</p>
        <p><strong>Doctor:</strong> ${r.doctor || "N/A"}</p>
        <p><strong>Booked On:</strong> ${r.bookedOn || "N/A"}</p>
        <p><strong>Appointment Date:</strong> ${r.appointmentDate || "N/A"}</p>
        <p><strong>Status:</strong> ${r.status || "N/A"}</p>
        ${r.status?.toLowerCase() === "ready" && r.reportLink ? `<p><a href="${r.reportLink}" target="_blank">View Report</a></p>` : ""}
      `;
      list.appendChild(div);
    });
  
    renderPagination(filtered.length);
  }
  
  // ✅ Pagination logic
  function renderPagination(total) {
    const pages = Math.ceil(total / reportsPerPage);
    const container = document.querySelector(".pagination");
    const pageInfo = document.getElementById("pageInfo");
    container.style.display = pages <= 1 ? "none" : "flex";
    pageInfo.textContent = `Page ${currentPage} of ${pages}`;
  }
  
  // ✅ Event listeners
  document.getElementById("searchInput").addEventListener("input", () => {
    currentPage = 1;
    displayReports();
  });
  
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayReports();
    }
  });
  
  document.getElementById("nextBtn").addEventListener("click", () => {
    const pages = Math.ceil(reports.length / reportsPerPage);
    if (currentPage < pages) {
      currentPage++;
      displayReports();
    }
  });
  