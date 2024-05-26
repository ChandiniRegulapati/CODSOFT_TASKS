// JavaScript for toggling the navigation menu on small screens
$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $('.navbar-collapse').toggleClass('show');
    });
});
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkAnimation() {
    var homeSection = document.querySelector('.home h1');
    if (isElementInViewport(homeSection)) {
        homeSection.style.animation = 'none';
        homeSection.offsetHeight; /* trigger reflow */
        homeSection.style.animation = null; 
    }
}

document.addEventListener('scroll', checkAnimation);
document.addEventListener('DOMContentLoaded', checkAnimation);