 const messages = [
    "Web Developer",
    "Backend Developer",
    "Frontend Developer",
    "Software Engineer",
];

let index = 0;
let charIndex = 0;
let currentMessage = '';
const typingSpeed = 100; // Speed in milliseconds

function type() {
    if (charIndex < messages[index].length) {
        currentMessage += messages[index].charAt(charIndex);
        document.getElementById("typing-text").textContent = currentMessage;
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(deleteMessage, 100); // Wait before deleting the message
    }
}

function deleteMessage() {
    if (charIndex > 0) {
        currentMessage = currentMessage.slice(0, -1);
        document.getElementById("typing-text").textContent = currentMessage;
        charIndex--;
        setTimeout(deleteMessage, typingSpeed);
    } else {
        index = (index + 1) % messages.length; // Cycle through messages
        charIndex = 0;
        setTimeout(type, 100); // Wait before typing the next message
    }
}

// Start the typing effect
window.onload = () => {
    type();
};


// send mail
function sendMail() {
    // Get form values
    const recipient = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Construct the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Open the mailto link
    window.location.href = mailtoLink;
}




//



// Typing Animation
document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    window.addEventListener("load", () => {
        document.querySelector(".preloader").style.display = "none"
    })


    // Animate skill bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll(".progress-in")
        progressBars.forEach((progress) => {
            const value = progress.getAttribute("data-value")
            progress.style.width = value + "%"
        })
    }, 1000)

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    })

    // Portfolio filter
    const filterButtons = document.querySelectorAll(".portfolio-filter button")
    const portfolioItems = document.querySelectorAll(".portfolio-item")

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"))
            // Add active class to clicked button
            this.classList.add("active")

            const filterValue = this.getAttribute("data-filter")

            portfolioItems.forEach((item) => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block"
                    setTimeout(() => {
                        item.style.opacity = "1"
                        item.style.transform = "scale(1)"
                    }, 100)
                } else {
                    item.style.opacity = "0"
                    item.style.transform = "scale(0.8)"
                    setTimeout(() => {
                        item.style.display = "none"
                    }, 300)
                }
            })
        })
    })

    // Navigation
    const navLinks = document.querySelectorAll(".nav a")
    const sections = document.querySelectorAll(".section")

    // Function to set active nav link
    function setActiveLink() {
        let currentSection = ""

        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= sectionTop - 300) {
                currentSection = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active")
            }
        })
    }

    // Set active link on scroll
    window.addEventListener("scroll", setActiveLink)

    // Smooth scrolling for nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetSection = document.querySelector(targetId)

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth",
            })

            // For mobile: close the menu after clicking a link
            document.querySelector(".aside").classList.remove("open")
        })
    })

    // Mobile nav toggler
    const navToggler = document.querySelector(".nav-toggler")
    const aside = document.querySelector(".aside")

    navToggler.addEventListener("click", function () {
        aside.classList.toggle("open")
        this.classList.toggle("open")
    })

    // Email sending function
    window.sendMail = () => {
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value

        if (!name || !email || !subject || !message) {
            alert("Please fill all fields")
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address")
            return
        }

        // Here you would typically send the email using a service
        // For demonstration, we'll just show a success message
        alert("Thank you for your message! I will get back to you soon.")

        // Clear the form
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("subject").value = ""
        document.getElementById("message").value = ""
    }
})
