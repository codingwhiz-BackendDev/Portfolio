// Style Switcher
document.addEventListener("DOMContentLoaded", () => {
  const styleSwitcherToggle = document.querySelector(".style-switcher-toggle")
  const styleSwitcher = document.querySelector(".style-switcher")
  const dayNight = document.querySelector(".day-night")

  // Toggle style switcher
  if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", () => {
      styleSwitcher.classList.toggle("open")
    })
  }

  // Hide style switcher on scroll
  window.addEventListener("scroll", () => {
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
      styleSwitcher.classList.remove("open")
    }
  })

  // Theme colors
  document.querySelectorAll(".colors span").forEach((span) => {
    span.addEventListener("click", function () {
      const color = this.className.split(" ")[0] // Get the first class name (color-1, color-2, etc.)
      setActiveStyle(color)
    })
  })

  // Set active style
  function setActiveStyle(color) {
    document.querySelectorAll(".alternate-style").forEach((style) => {
      if (color === style.getAttribute("title")) {
        style.removeAttribute("disabled")
      } else {
        style.setAttribute("disabled", "true")
      }
    })
  }

  // Day/Night mode
  if (dayNight) {
    dayNight.addEventListener("click", () => {
      dayNight.querySelector("i").classList.toggle("fa-sun")
      dayNight.querySelector("i").classList.toggle("fa-moon")
      document.body.classList.toggle("dark")
    })
  }

  // Check preferred color scheme on page load
  window.addEventListener("load", () => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      if (dayNight) {
        dayNight.querySelector("i").classList.replace("fa-moon", "fa-sun")
        document.body.classList.add("dark")
      }
    }
  })
})
