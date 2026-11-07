
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});

// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   BOOKING FORM
========================= */

const bookingForm = document.getElementById("bookingForm");

const formMessage = document.getElementById("formMessage");

const dateInput = document.getElementById("date");


// Set minimum booking date to today

const today = new Date();

const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get form values

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const program = document.getElementById("program").value;

    const date = document.getElementById("date").value;

    const time = document.getElementById("time").value;


    // Check form validity

    if (!bookingForm.checkValidity()) {

        bookingForm.reportValidity();

        return;

    }


    // Additional validation

    if (name.length < 2) {

        formMessage.style.color = "#ff5555";

        formMessage.textContent =
            "Please enter a valid name.";

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        formMessage.style.color = "#ff5555";

        formMessage.textContent =
            "Please enter a valid 10-digit phone number.";

        return;

    }


    if (date < localDate) {

        formMessage.style.color = "#ff5555";

        formMessage.textContent =
            "Please select today or a future date.";

        return;

    }


    // Create booking information

    const bookingDetails = {

        name: name,

        email: email,

        phone: phone,

        program: program,

        date: date,

        time: time

    };


    // Display booking confirmation

    formMessage.style.color = "#25d366";

    formMessage.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Thank you, ${bookingDetails.name}!
        Your ${bookingDetails.program} session request
        for ${bookingDetails.date} at ${bookingDetails.time}
        has been received.
        Our team will contact you shortly.
    `;


    // Reset form

    bookingForm.reset();

    dateInput.min = localDate;

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements = document.querySelectorAll(
    ".service-card, .plan-card, .trainer-card, .testimonial-card"
);

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


animatedElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});
