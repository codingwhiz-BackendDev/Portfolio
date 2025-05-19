document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded")

  // Initialize AOS animation library if it exists
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    })
  }

  // Initialize Typed.js if it exists
  if (typeof Typed !== "undefined") {
    const typed = new Typed("#typing-text", {
      strings: ["Backend Developer", "Web Developer", "Python Developer", "Django Expert"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    })
  }

  // Make sure all sections are visible by default
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "block"
    section.style.opacity = "1"
  })

  // Make sure main content is visible
  const mainContent = document.querySelector(".main-content")
  if (mainContent) {
    mainContent.style.display = "block"
    mainContent.style.opacity = "1"
  }

  // Preloader - hide after page loads
  window.addEventListener("load", () => {
    console.log("Window fully loaded")

    // Force the main content to be visible
    document.querySelector(".main-content").style.display = "block"
    document.querySelector(".main-content").style.opacity = "1"

    // Hide preloader with a slight delay
    setTimeout(() => {
      const preloader = document.querySelector(".preloader")
      if (preloader) {
        preloader.classList.add("hidden")

        // After transition completes, remove from DOM flow
        preloader.addEventListener("transitionend", () => {
          preloader.style.display = "none"
          document.body.style.overflow = "visible" // Ensure body is scrollable

          // Force refresh AOS animations if needed
          if (typeof AOS !== "undefined") {
            AOS.refresh()
          }
        })
      }
    }, 1000)
  })

  // Animate skills progress bars
  function animateSkills() {
    const progressBars = document.querySelectorAll(".progress-in")

    if (progressBars.length) {
      console.log("Animating progress bars")

      // Set initial width to data-value immediately
      progressBars.forEach((progressBar) => {
        const value = progressBar.getAttribute("data-value")
        progressBar.style.width = value + "%"
      })
    }
  }

  // Call animateSkills immediately
  animateSkills()

  // Navigation - Fix for mobile toggle
  const navToggler = document.querySelector(".nav-toggler")
  const aside = document.querySelector(".aside")

  if (navToggler && aside) {
    navToggler.addEventListener("click", () => {
      navToggler.classList.toggle("open")
      aside.classList.toggle("open")
      console.log("Nav toggler clicked")
    })
  }

  // Close menu when clicking on nav links
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggler && aside) {
        navToggler.classList.remove("open")
        aside.classList.remove("open")
      }
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav a").forEach((navLink) => {
          navLink.classList.remove("active")
          if (navLink.getAttribute("href") === "#" + sectionId) {
            navLink.classList.add("active")
          }
        })
      }
    })
  })

  // Portfolio Filter
  const filterButtons = document.querySelectorAll(".portfolio-filter button")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        button.classList.add("active")

        const filterValue = button.getAttribute("data-filter")

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
  }

  // Portfolio Details Popup
  const portfolioDetailsButtons = document.querySelectorAll(".portfolio-details")
  if (portfolioDetailsButtons.length) {
    portfolioDetailsButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const imgSrc = this.getAttribute("href")
        const portfolioOverlay = this.closest(".portfolio-overlay")
        const title = portfolioOverlay.querySelector("h4").textContent
        const description = portfolioOverlay.querySelector("p").textContent

        // Create modal
        const modal = document.createElement("div")
        modal.classList.add("portfolio-modal")
        modal.innerHTML = `
            <div class="portfolio-modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <img src="${imgSrc}" alt="${title}">
                <p>${description}</p>
            </div>
        `
        document.body.appendChild(modal)

        // Close modal
        const closeModal = modal.querySelector(".close-modal")
        closeModal.addEventListener("click", () => {
          modal.remove()
        })

        // Close modal when clicking outside
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.remove()
          }
        })
      })
    })
  }

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

    // Clear form
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("subject").value = ""
    document.getElementById("message").value = ""
  }
})
