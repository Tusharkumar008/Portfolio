/*
====================================
Header & Nav Menu
====================================
*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navItem = document.querySelectorAll(".nav__item"),
  header = document.getElementById("header");

// Open and close menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav__menu--open");
    changeIcon();
  });
}

// Close the menu when the user clicks the nav links
if (navItem) {
  navItem.forEach((item) => {
    item.addEventListener("click", () => {
      if (navMenu.classList.contains("nav__menu--open")) {
        navMenu.classList.remove("nav__menu--open");
      }
      changeIcon();
    });
  });
}

// Change nav toggle icon
function changeIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("ri-menu-3-line", "ri-close-line");
  } else {
    navToggle.classList.replace("ri-close-line", "ri-menu-3-line");
  }
}

/*
====================================
Dark/Light Theme Toggle
====================================
*/
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Get the <html> element

// Function to set the theme and save preference
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
        if (themeToggle) {
            themeToggle.classList.replace('ri-moon-line', 'ri-sun-line');
        }
    } else {
        if (themeToggle) {
            themeToggle.classList.replace('ri-sun-line', 'ri-moon-line');
        }
    }
    localStorage.setItem('theme', theme); // Save the user's preference
}

// Check for saved theme in localStorage on page load
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme;

if (savedTheme) {
    currentTheme = savedTheme;
} else if (systemPrefersDark) {
    currentTheme = 'dark';
} else {
    currentTheme = 'dark'; // Default to dark as per original HTML
}

// Apply the determined theme when the script loads
setTheme(currentTheme);

// Add click listener for the toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Get the current theme from the <html> tag
        const activeTheme = htmlElement.getAttribute('data-theme');
        
        // Toggle the theme
        if (activeTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
}

/*
====================================
LinkedIn Button
====================================
*/
const linkedinBtn = document.getElementById("linkedin-btn");
if (linkedinBtn) {
  linkedinBtn.addEventListener('click', function () {
    window.open('https://www.linkedin.com/in/tusharkumar08/', '_blank');
  });
}

/*
====================================
Testimonial Swiper
====================================
*/
try {
  const testimonialSlide = new Swiper(".testimonial__wrapper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    effect: "coverflow",
    grabCursor: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      520: {
        slidesPerView: "auto",
      },
    },
  });
} catch (error) {
    console.warn("SwiperJS not initialized (element .testimonial__wrapper not found or library not loaded)");
}


/*
====================================
ScrollReveal Animations
====================================
*/
try {
  const sr = ScrollReveal({
    duration: 2000,
    distance: "100px",
    delay: 400,
    reset: false,
  });

  sr.reveal(".hero__content, .about__content");
  sr.reveal(".hero__img, .about__image", { origin: "top" }); // Added .about__image from previous edit

  sr.reveal(
    ".hero__info-wrapper, .skills__category-title, .qualification__name",
    {
      delay: 500,
      interval: 100,
    }
  );

  sr.reveal(
    ".skill__card, .qualification__item, .project__content, .testimonial__wrapper, .footer__content",
    {
      delay: 300,
      interval: 100,
    }
  );


  sr.reveal(".qualification__footer-text, .contact__content", {
    origin: "left",
  });

  sr.reveal(".qualification__footer .btn, .contact__btn", { origin: "right" });
} catch (error) {
    console.warn("ScrollReveal not initialized (library not loaded)");
}


/*
====================================
Back to Top Button
====================================
*/
// Get the button
var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
// We also need to assign this to the window.onscroll, but we must be careful
// not to overwrite the header scroll animation.
function handleScroll() {
  // Header scroll logic
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }
  }

  // Back to top button logic
  if (mybutton) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
}

// Assign the combined scroll handler
window.onscroll = handleScroll;


// When the user clicks on the button, scroll to the top of the document
if (mybutton) {
  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}

/*
====================================
Hero Section Role Typer
====================================
*/
document.addEventListener("DOMContentLoaded", () => {
  const roleTextElement = document.getElementById("role-text");
  // Your requested roles
  const roles = ["AI Engineer.", "Machine Learning Engineer.", "Data Scientist.", "Data Analyst."]; // Added dots
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100; // Speed of typing
  const deleteSpeed = 75; // Speed of deleting
  const pauseTime = 2000; // Pause time on a full word (2 seconds)

  if (roleTextElement) {
    function typeRole() {
      const currentRole = roles[roleIndex];
      let typeDelay = typeSpeed;

      if (isDeleting) {
        // Deleting
        roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = deleteSpeed;
      } else {
        // Typing
        roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing, pause
        typeDelay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 500; // Short pause before starting new word
      }

      setTimeout(typeRole, typeDelay);
    }
    
    // Start the typing animation after a short delay
    setTimeout(typeRole, 500);
  }
  /*
====================================
Back to Top Button
====================================
*/
// Get the button
var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (mybutton) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
}

// When the user clicks on the button, scroll to the top of the document
if (mybutton) {
  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}
});