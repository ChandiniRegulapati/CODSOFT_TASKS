// JavaScript code to trigger typing animation for the h1 element every time the home section is visited
const homeSection = document.getElementById('home');

// Function to check if the home section is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add typing animation class to h1 element when home section is in viewport
function addAnimation() {
    const h1Element = document.querySelector('#home h1');
    if (isInViewport(homeSection)) {
        h1Element.classList.remove('typing-animation');
        void h1Element.offsetWidth; // Trigger a reflow, flushing the CSS changes
        h1Element.classList.add('typing-animation');
    }
}

// Initial check when page loads
addAnimation();

// Check if the home section is in the viewport when scrolling
window.addEventListener('scroll', addAnimation);
document.addEventListener('DOMContentLoaded', (event) => {
    const homeSection = document.getElementById('home');
    const h1Element = document.querySelector('#home h1');

    // Function to add the typing animation class
    function addTypingAnimation() {
        h1Element.classList.remove('typing-animation');
        void h1Element.offsetWidth; // Trigger a reflow to flush the CSS changes
        h1Element.classList.add('typing-animation');
    }

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addTypingAnimation();
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Observe the home section
    observer.observe(homeSection);
});