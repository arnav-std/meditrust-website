const doctors = [
  {
    name: "Dr. Suresh Iyer",
    experience: 10,
    department: "Neurology",
    timing: "10:00 - 16:00",
    days: "Mon - Sat",
    languages: "English | Tamil",
    qualification: "MBBS, MD, DM",
    image: "images/17.jpg"
  },
  {
    name: "Dr. Anjali Iyer",
    experience: 9,
    department: "Dental",
    timing: "08:30 - 13:00",
    days: "Mon - Thu",
    languages: "English | Tamil",
    qualification: "BDS, MDS",
    image: "images/12.jpg"
  },
  {
    name: "Dr. Rohan Gupta",
    experience: 5,
    department: "Dental",
    timing: "13:00 - 19:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "BDS",
    image: "images/9.jpg"
  },
  {
    name: "Dr. Neha Sharma",
    experience: 6,
    department: "Orthopaedic",
    timing: "10:00 - 16:00",
    days: "Tue - Fri",
    languages: "English | Punjabi",
    qualification: "MBBS, MS Ortho",
    image: "images/5.jpg"
  },
  {
    name: "Dr. Kunal Bhatt",
    experience: 12,
    department: "Urology",
    timing: "11:00 - 17:00",
    days: "Mon - Fri",
    languages: "English | Hindi",
    qualification: "MBBS, MCh",
    image: "images/18.jpg"
  },
  {
    name: "Dr. Manoj Rathi",
    experience: 15,
    department: "Neurology",
    timing: "10:00 - 17:00",
    days: "Tue - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MD, DM",
    image: "images/19.jpg"
  },
  {
    name: "Dr. Karan Sinha",
    experience: 8,
    department: "Orthopaedic",
    timing: "12:00 - 19:00",
    days: "Tue - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MS",
    image: "images/3.jpg"
  },
  {
    name: "Dr. Sangeeta Kapoor",
    experience: 13,
    department: "Neurology",
    timing: "09:00 - 14:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, DM Neuro",
    image: "images/16.jpg"
  },
  {
    name: "Dr. Meena Vaidya",
    experience: 13,
    department: "Urology",
    timing: "10:00 - 15:00",
    days: "Mon - Fri",
    languages: "English | Marathi",
    qualification: "MBBS, MS, MCh",
    image: "images/20.jpg"
  },
  {
    name: "Dr. Tarun Agarwal",
    experience: 11,
    department: "Dental",
    timing: "10:00 - 17:00",
    days: "Mon - Fri",
    languages: "English | Hindi",
    qualification: "BDS, MDS",
    image: "images/14.jpg"
  },
  {
    name: "Dr. Arvind Patel",
    experience: 18,
    department: "Orthopaedic",
    timing: "13:00 - 20:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MS",
    image: "images/7.jpg"
  },
  {
    name: "Dr. Sneha Kaur",
    experience: 7,
    department: "Dental",
    timing: "09:00 - 14:00",
    days: "Mon - Fri",
    languages: "English | Punjabi",
    qualification: "BDS, MDS",
    image: "images/10.jpg"
  },
  {
    name: "Dr. Swetha Srinivas",
    experience: 7,
    department: "Urology",
    timing: "12:00 - 16:00",
    days: "Mon - Thu",
    languages: "English | Tamil",
    qualification: "MBBS, MS",
    image: "images/21.jpg"
  },
  {
    name: "Dr. Anusha Naik",
    experience: 8,
    department: "Neurology",
    timing: "11:00 - 17:00",
    days: "Mon - Fri",
    languages: "English | Marathi",
    qualification: "MBBS, DM",
    image: "images/22.jpg"
  },
  {
    name: "Dr. Reena Shah",
    experience: 11,
    department: "Cardiology",
    timing: "13:00 - 19:00",
    days: "Tue - Sat",
    languages: "English | Gujarati",
    qualification: "MBBS, MD, DM",
    image: "images/23.jpg"
  },
  {
    name: "Dr. Rakesh Menon",
    experience: 15,
    department: "Orthopaedic",
    timing: "10:00 - 17:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MS Ortho",
    image: "images/1.jpg"
  },
  {
    name: "Dr. Naveen Raju",
    experience: 10,
    department: "Urology",
    timing: "13:00 - 18:00",
    days: "Mon - Sat",
    languages: "English | Telugu",
    qualification: "MBBS, MCh",
    image: "images/24.jpg"
  },
  {
    name: "Dr. Meenal Shetty",
    experience: 7,
    department: "Neurology",
    timing: "13:00 - 18:00",
    days: "Mon - Fri",
    languages: "English | Kannada",
    qualification: "MBBS, DM",
    image: "images/25.jpg"
  },
  {
    name: "Dr. Rajeev Sharma",
    experience: 21,
    department: "Urology",
    timing: "09:00 - 17:00",
    days: "Tue - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MCh",
    image: "images/26.jpg"
  },
  {
    name: "Dr. Rajan Kumar",
    experience: 19,
    department: "Neurology",
    timing: "08:30 - 14:30",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, DM",
    image: "images/27.jpg"
  },
  {
    name: "Dr. Siddharth Nair",
    experience: 10,
    department: "Orthopaedic",
    timing: "11:00 - 18:00",
    days: "Mon - Sat",
    languages: "English | Malayalam",
    qualification: "MBBS, D. Ortho",
    image: "images/6.jpg"
  },
  {
    name: "Dr. Devika Menon",
    experience: 14,
    department: "Cardiology",
    timing: "10:00 - 16:00",
    days: "Mon - Sat",
    languages: "English | Malayalam",
    qualification: "MBBS, DM Cardio",
    image: "images/28.jpg"
  },
  {
    name: "Dr. Sanjana Paul",
    experience: 9,
    department: "Urology",
    timing: "09:30 - 14:30",
    days: "Mon - Sat",
    languages: "English | Bengali",
    qualification: "MBBS, MS",
    image: "images/29.jpg"
  },
  {
    name: "Dr. Aman Verma",
    experience: 18,
    department: "Cardiology",
    timing: "09:00 - 15:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, DM Cardiology",
    image: "images/30.jpg"
  },
  {
    name: "Dr. Priya Rajan",
    experience: 20,
    department: "Orthopaedic",
    timing: "08:00 - 14:00",
    days: "Mon - Sat",
    languages: "English | Tamil",
    qualification: "MBBS, MNAMS",
    image: "images/4.jpg"
  },
  {
    name: "Dr. Shruti Verma",
    experience: 11,
    department: "Neurology",
    timing: "11:00 - 18:00",
    days: "Mon - Fri",
    languages: "English | Punjabi",
    qualification: "MBBS, DM",
    image: "images/31.jpg"
  },
  {
    name: "Dr. Divya Reddy",
    experience: 4,
    department: "Dental",
    timing: "14:00 - 18:00",
    days: "Wed - Sat",
    languages: "English | Telugu",
    qualification: "BDS",
    image: "images/15.jpg"
  },
  {
    name: "Dr. Anita Deshmukh",
    experience: 12,
    department: "Orthopaedic",
    timing: "09:00 - 15:00",
    days: "Mon - Fri",
    languages: "English | Marathi",
    qualification: "MBBS, DNB Ortho",
    image: "images/11.jpg"
  },
  {
    name: "Dr. Vikas Jain",
    experience: 16,
    department: "Cardiology",
    timing: "08:00 - 14:00",
    days: "Mon - Fri",
    languages: "English | Hindi",
    qualification: "MBBS, DM",
    image: "images/32.jpg"
  },
  {
    name: "Dr. Raghav Bansal",
    experience: 7,
    department: "Cardiology",
    timing: "12:00 - 18:00",
    days: "Tue - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, DM",
    image: "images/33.jpg"
  },
  {
    name: "Dr. Arjun Kapoor",
    experience: 16,
    department: "Urology",
    timing: "11:00 - 18:00",
    days: "Mon - Sat",
    languages: "English | Hindi",
    qualification: "MBBS, MCh Urology",
    image: "images/34.jpg"
  },
  {
    name: "Dr. Nikita Joshi",
    experience: 6,
    department: "Dental",
    timing: "11:00 - 16:00",
    days: "Mon - Sat",
    languages: "English | Gujarati",
    qualification: "BDS",
    image: "images/13.jpg"
  },
  {
    name: "Dr. Pallavi Joshi",
    experience: 9,
    department: "Cardiology",
    timing: "11:00 - 15:00",
    days: "Mon - Sat",
    languages: "English | Marathi",
    qualification: "MBBS, MD",
    image: "images/35.jpg"
  },
  {
    name: "Dr. Kiran Rao",
    experience: 20,
    department: "Cardiology",
    timing: "10:00 - 17:00",
    days: "Mon - Sat",
    languages: "English | Telugu",
    qualification: "MBBS, DM Cardio",
    image: "images/36.jpg"
  }
];

let currentPage = 1;
const perPage = 7;

function renderDoctors(filtered = doctors) {
  const list = document.getElementById("doctorsList");
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  list.innerHTML = paginated.map(doc => `
    <div class="doctor-card">
      <div class="doctor-info">
        <img src="${doc.image}" alt="${doc.name}" />
        <div class="doctor-details">
          <h3>${doc.name}</h3>
          <p>${doc.experience}+ Years Experience</p>
          <p>${doc.qualification} | ${doc.department}</p>
          <p>${doc.languages}</p>
          <p>${doc.timing} (${doc.days})</p>
        </div>
      </div>
      <button class="book-btn" onclick='openModal(${JSON.stringify(doc)})'>Book Appointment</button>
    </div>
  `).join("");

  renderPagination(filtered.length);
}

function renderPagination(total) {
  const pages = Math.ceil(total / perPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = currentPage === i ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      filterDoctors();
    };
    container.appendChild(btn);
  }
}

function openModal(doc) {
  document.getElementById("modalName").innerText = doc.name;
  document.getElementById("modalDept").innerText = doc.department;
  document.getElementById("modalExp").innerText = `${doc.experience}+ Years Experience`;
  document.getElementById("modalImg").src = doc.image;
  document.getElementById("appointmentModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("appointmentModal").style.display = "none";
}

function confirmAppointment() {
  const name = document.getElementById("modalName").innerText;
  const department = document.getElementById("modalDept").innerText;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const phone = document.getElementById("phoneNumber").value;

  if (!date || !time || !phone) {
    alert("❗Please fill out all fields before confirming.");
    return;
  }

  const message = `📅 *Appointment Booking*\n👨‍⚕️ Doctor: ${name}\n🏥 Department: ${department}\n📆 Date: ${date}\n⏰ Time: ${time}\n📞 Phone: ${phone}`;

  // Save the message temporarily in localStorage
  localStorage.setItem("tidioAppointmentMessage", message);

  // ✅ Show confirmation alert
  alert(`✅ Appointment Details Sent Successfully!\n`);

  // ✅ Redirect to main.html (Tidio lives here)
  window.location.href = "../../../main.html";
}


function filterDoctors() {
  const selectedDept = document.querySelector('input[name="department"]:checked')?.value || "All";
  const sort = document.getElementById("sortSelect").value;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  let filtered = [...doctors];

  if (selectedDept !== "All") {
    filtered = filtered.filter(doc => doc.department === selectedDept);
  }

  if (searchTerm.trim() !== "") {
    filtered = filtered.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.department.toLowerCase().includes(searchTerm) ||
      doc.qualification.toLowerCase().includes(searchTerm)
    );
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.experience - a.experience);
  } else if (sort === "low") {
    filtered.sort((a, b) => a.experience - b.experience);
  }

  renderDoctors(filtered);
}

document.getElementById("sortSelect").addEventListener("change", () => {
  currentPage = 1;
  filterDoctors();
});

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  filterDoctors();
});

document.getElementsByName("department").forEach(input => {
  input.addEventListener("change", () => {
    currentPage = 1;
    filterDoctors();
  });
});

renderDoctors();