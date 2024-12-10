// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Floating Animations for Sections
function floatingAnimation() {
    const floatingElements = document.querySelectorAll('.hero-content, .about-content, .project-card, #resources li, #donate button');

    floatingElements.forEach(el => {
        el.style.transition = 'transform 2s ease';
        el.style.transform = `translateY(${Math.random() * 10}px)`;
    });

    setTimeout(() => {
        floatingElements.forEach(el => {
            el.style.transform = `translateY(-${Math.random() * 10}px)`;
        });
    }, 2000);

    setInterval(() => {
        floatingElements.forEach(el => {
            el.style.transform = `translateY(${Math.random() * 10}px)`;
        });

        setTimeout(() => {
            floatingElements.forEach(el => {
                el.style.transform = `translateY(-${Math.random() * 10}px)`;
            });
        }, 2000);
    }, 4000);
}
floatingAnimation();

// 3D Parallax Effect
document.addEventListener('mousemove', e => {
    const elements = document.querySelectorAll('.hero, .project-card, #about, #donate');
    elements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 2;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Typing Effect for Hero Section Title
const heroTitle = document.querySelector('.hero-content h2');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;

function typeEffect() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 150);
    }
}
typeEffect();

// Interactive Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(10deg) scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) scale(1)';
    });
});

// Rose Animation Around Sections
function createRoseAnimation() {
    const rose = document.createElement('div');
    rose.className = 'rose-animation';
    rose.innerHTML = '🌹';
    document.body.appendChild(rose);

    setInterval(() => {
        const roseClone = rose.cloneNode(true);
        roseClone.style.left = `${Math.random() * 100}%`;
        roseClone.style.animationDuration = `${3 + Math.random() * 5}s`;
        document.body.appendChild(roseClone);

        setTimeout(() => roseClone.remove(), 8000);
    }, 1000);
}
createRoseAnimation();
