const messages = [
    "Web Developer",
    "Backend Developer",
    "python & Django Developer",
    "JavaScript Developer"
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