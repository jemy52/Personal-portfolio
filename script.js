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
const typedTextSpan = document.querySelector(".typed-text");
const words = ["Web Developer", "UI/UX Designer", "Software Engineer"];
const typingDelay = 100;
const erasingDelay = 50; //speed of deleting each character
const newTextDelay = 2000; // Pause time before swithching to the next word

let wordIndex = 0;
let charIndex = 0;
function type() {
    //check if there are still characters left to type in the current word
    if(charIndex < words[wordIndex].length) {
        //add the next character to the typed text span
        typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        //if the word is fully typed, wait for a while and then start deleting
        setTimeout(erase, newTextDelay);
    }
    }
    function erase() {
        //check if there are still characters left to delete in the current word
        if(charIndex > 0) {
            //remove the last character from the typed text span
            typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        }
        else {
            //if the word is fully deleted, move to the next word and start typing
            wordIndex++;
            if(wordIndex >= words.length) {
                wordIndex = 0; //loop back to the first word
            }
            setTimeout(type, typingDelay + 500); //small pause before typing the next word
        }

    }
    // Ensure the DOM is fully loaded before starting the typing effect
    document.addEventListener('DOMContentLoaded', function() {
        if(words.length) {
            setTimeout(type, newTextDelay);
        }
    }); 
   // 1. Define observer options (when and how the animation should trigger)
const observerOptions = {
    root: null, // Uses the browser viewport as the container
    threshold: 0.15 // Triggers when 15% of the element is visible on screen
};

// 2. Create the Intersection Observer instance
const observer = new IntersectionObserver(function(entries, observerInstance) {
    entries.forEach(entry => {
        // Check if the element has scrolled into view
        if (entry.isIntersecting) {
            // Add the 'active' class to trigger the CSS transition
            entry.target.classList.add('active');
            
            // Optional: Stop observing the element once it has animated (runs only once)
            observerInstance.unobserve(entry.target);
        }
    });
}, observerOptions);

// 3. Select all elements with the 'reveal' class and tell the observer to watch them
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(element => {
    observer.observe(element);
});

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.getAttribute('data-progress');
            bar.style.setProperty('--progress-width', `${progress}%`);
            bar.classList.add('animate');
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});
// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        projectCards.forEach(card => {
            const tech = card.dataset.tech || '';
            if (filter === 'all' || tech.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let currentImages = [];
let currentIndex = 0;

function updateLightbox() {
    const img = currentImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxCaption.textContent = img.caption || '';
}

function openLightbox(images, startIndex) {
    currentImages = images;
    currentIndex = startIndex;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Wire up each project image
document.querySelectorAll('.project-card').forEach((card, idx) => {
    const imageBox = card.querySelector('.project-image');
    const fullSrc = imageBox?.dataset.lightboxSrc;
    if (!fullSrc) return;

    imageBox.style.cursor = 'zoom-in';
    imageBox.addEventListener('click', () => {
        // Build gallery from all cards with screenshots
        const images = Array.from(document.querySelectorAll('.project-card'))
            .map(c => ({
                src: c.querySelector('.project-image')?.dataset.lightboxSrc,
                caption: c.querySelector('.project-image')?.dataset.lightboxCaption ||
                         c.querySelector('h3')?.textContent || ''
            }))
            .filter(i => i.src);

        const start = images.findIndex(i => i.src === fullSrc);
        openLightbox(images, start === -1 ? 0 : start);
    });
});

// Controls
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
});
lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
    if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
});
// Download CV button - generates a PDF via jsPDF and triggers download
const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn && typeof window.jspdf !== 'undefined') {
    downloadCvBtn.addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(252, 76, 94);
        doc.text('Jemimah Mumo', 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(113, 113, 113);
        doc.text('Web Developer & UI/UX Designer', 20, 32);
        doc.text('Nairobi, Kenya  |  Open to learning collaborations', 20, 42);

        doc.setLineWidth(0.7);
        doc.setDrawColor(252, 76, 94);
        doc.line(20, 48, 190, 48);

        doc.setFontSize(14);
        doc.setTextColor(252, 76, 94);
        doc.text('Profile', 20, 62);
        doc.setFontSize(10);
        doc.setTextColor(85, 85, 85);
        const profile = doc.splitTextToSize('Passionate web developer expanding skills in frontend technologies. Experienced in creating clean, responsive, and user-friendly websites using semantic HTML5, CSS3, and JavaScript. Committed to writing efficient code and crafting accessible layouts.', 170);
        doc.text(profile, 20, 72);

        doc.setFontSize(14);
        doc.setTextColor(252, 76, 94);
        doc.text('Key Skills', 20, 96);
        doc.setFontSize(10);
        doc.setTextColor(85, 85, 85);
        doc.text('HTML5  CSS3  JavaScript  Responsive Design  Web Accessibility  UI/UX Design  Typography  Flexbox & CSS Grid', 20, 106);

        doc.setFontSize(14);
        doc.setTextColor(252, 76, 94);
        doc.text('Experience', 20, 120);
        doc.setFontSize(11);
        doc.setTextColor(51, 51, 51);
        doc.text('Frontend Developer Intern', 20, 130);
        doc.setFontSize(9);
        doc.setTextColor(252, 76, 94);
        doc.text('2026 - Present', 20, 138);
        doc.setTextColor(85, 85, 85);
        doc.text('Building responsive web designs and learning industrial equipment display standards.', 20, 146);

        doc.setFontSize(14);
        doc.setTextColor(252, 76, 94);
        doc.text('Education', 20, 162);
        const edu = [
            { school: 'Bachelor of Science in Information Technology', date: '2024 - 2028', place: 'The Co-operative University of Kenya' },
            { school: 'Web Development Bootcamp', date: '2025 - 2026', place: 'Semantic HTML, CSS layout engines & responsive design' },
            { school: 'Precious Blood Kilungu High School', date: '2020 - 2023', place: 'KCSE Examinations - Grade B' },
            { school: 'Unity Primary School', date: '2017 - 2019', place: 'KCPE Examinations - 375 marks' }
        ];
        let y = 172;
        edu.forEach(e => {
            doc.setFontSize(11); doc.setTextColor(51, 51, 51); doc.text(e.school, 20, y);
            doc.setFontSize(9); doc.setTextColor(252, 76, 94); doc.text(e.date, 20, y + 7);
            doc.setTextColor(85, 85, 85); doc.text(e.place, 20, y + 15);
            y += 26;
        });

        doc.save('Jemimah-Mumo-CV.pdf');
    });
}
// Back to Top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
