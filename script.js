//Hamburger button and the navigation links
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinksList = document.getElementById('nav-links');
//Listen for a click on the Hamburger button
mobileMenuBtn.addEventListener('click', function(){
    mobileMenuBtn.classList.toggle('active');
    navLinksList.classList.toggle('active');
});
//Automatically close the menu when a link is clicked on mobile
const allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinksList.classList.remove('active');
    })
});

//Selection of all sections that have an id and all navbar links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
//create a function to run on scroll
function highlightNavigation() {
    //Get current vertical scroll position of the window
    const scrollPosition = window.scrollY;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; //offset for navbar height
        const sectionId = section.getAttribute('id');
        //Check if the current scroll position is within the section
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                //if the link's href matches the section id, add the active class
                if(link.getAttribute('href') ===`#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
//Listen for scroll events and call the highlightNavigation function
window.addEventListener('scroll', highlightNavigation);

// 1. Select the standalone theme icon element
const themeIcon = document.getElementById('theme-icon');

// 2. Check if the user previously saved a theme preference in localStorage
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    // Apply the saved theme to the body
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    
    // Update the icon shape to match the active theme
    if (currentTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// 3. Listen for a click event directly on the standalone icon
themeIcon.addEventListener('click', function () {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');

    // Check which mode is currently active, update storage, and swap the icon
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Change to sun icon in dark mode
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon'); // Change back to moon icon in light mode
    }
});