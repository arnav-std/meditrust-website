const teamMembers = [
    {
      name: "Dr. Rajeev Sharma",
      specialty: "Urology",
      qualification: "MBBS, MS (Urology)",
      experience: "21+ years",
      photo: "images/26.jpg"
    },
    {
      name: "Dr. Priya Rajan",
      specialty: "Orthopedic",
      qualification: "MBBS, MS (Ortho)",
      experience: "20+ years",
      photo: "images/4.jpg"
    },
    {
      name: "Dr. Kiran Rao",
      specialty: "Cardiology",
      qualification: "MBBS, DM (Cardiology)",
      experience: "20+ years",
      photo: "images/36.jpg"
    }
  ];
  
  const teamContainer = document.getElementById("teamContainer");
  
  teamMembers.forEach(member => {
    const div = document.createElement("div");
    div.className = "team-member";
    div.innerHTML = `
      <img src="${member.photo}" alt="${member.name}">
      <h4>${member.name}</h4>
      <p><strong>Specialty:</strong> ${member.specialty}</p>
      <p><strong>Qualification:</strong> ${member.qualification}</p>
      <p><strong>Experience:</strong> ${member.experience}</p>
    `;
    teamContainer.appendChild(div);
  });
  