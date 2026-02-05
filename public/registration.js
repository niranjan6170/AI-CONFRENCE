document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENT REFERENCES ================= */
    const preRegistration = document.getElementById("preRegistration");
    const registrationForm = document.getElementById("registrationForm");
    const successMessage = document.getElementById("successMessage");

    const speakersSection = document.getElementById("speakers");
    const scheduleSection = document.getElementById("schedule");
    const speakersGrid = document.getElementById("speakersGrid");

    /* ================= CHECK IF USER ALREADY REGISTERED ================= */
    const isRegistered = localStorage.getItem("isRegistered");

    if (isRegistered === "true") {
        unlockWebsite();
        loadSpeakers();
    }

    /* ================= REGISTRATION FORM SUBMIT ================= */
    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const role = document.getElementById("role").value;
            const mode = document.getElementById("mode").value;

            if (!name || !email || !phone || !role || !mode) {
                alert("Please fill all the fields");
                return;
            }

            const userData = {
                name,
                email,
                phone,
                role,
                mode,
                registeredAt: new Date().toLocaleString()
            };

            try {
                /* SEND DATA TO SERVER */
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                if (!response.ok) {
                    alert("Registration failed");
                    return;
                }

                /* SAVE LOCAL FLAG FOR ACCESS */
                localStorage.setItem("isRegistered", "true");

                successMessage.style.display = "block";

                setTimeout(() => {
                    unlockWebsite();
                    loadSpeakers();
                }, 800);

                registrationForm.reset();

            } catch (error) {
                alert("Server error. Please try again.");
                console.error(error);
            }
        });
    }

    /* ================= UNLOCK WEBSITE ================= */
    function unlockWebsite() {
        preRegistration.style.display = "none";
        speakersSection.classList.remove("hidden");
        scheduleSection.classList.remove("hidden");
    }

    /* ================= LOAD SPEAKERS (DYNAMIC) ================= */
    async function loadSpeakers() {
        if (!speakersGrid) return;

        try {
            const response = await fetch("/speakers");
            const speakers = await response.json();

            speakersGrid.innerHTML = "";

            speakers.forEach(speaker => {
                speakersGrid.innerHTML += `
                    <div class="card speaker-card">
                        <img src="${speaker.image}" alt="${speaker.name}">
                        <h3>${speaker.name}</h3>
                        <p>${speaker.title}</p>
                    </div>
                `;
            });

        } catch (error) {
            speakersGrid.innerHTML = "<p>Unable to load speakers</p>";
            console.error("Speaker load error:", error);
        }
    }

});
