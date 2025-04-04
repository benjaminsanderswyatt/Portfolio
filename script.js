/*
const typed = new Typed('.multiple-text',{
    strings:['Person ','Thing '],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});
*/


document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    const navContainer = document.querySelector("nav");
    const dotIndicator = document.createElement("div");
    
    dotIndicator.classList.add("dot-indicator");
    navContainer.appendChild(dotIndicator);
  
    
    const options = {
      threshold: 0.5 // Half the section in view
    };
  
    // Callback for IntersectionObserver
    function callback(entries) {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target);
          navLinks.forEach(link => link.classList.remove("active"));
          const activeLink = navLinks[index];
          activeLink.classList.add("active");
  
          const linkRect = activeLink.getBoundingClientRect();
          const dotLeft = activeLink.offsetLeft + linkRect.width / 2 - dotIndicator.offsetWidth / 2;
          dotIndicator.style.left = `${dotLeft}px`;
        }
      });

    }
  
    const observer = new IntersectionObserver(callback, options);
    sections.forEach(section => observer.observe(section));
  });