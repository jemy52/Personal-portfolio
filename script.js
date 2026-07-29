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