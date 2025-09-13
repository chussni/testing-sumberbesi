// Navbar toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});
// Close menu on link click (mobile)
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 600) navMenu.classList.remove('open');
    });
});
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp package selection
document.querySelectorAll('.wa-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const plan = this.getAttribute('data-plan');
        const message = encodeURIComponent(`Halo kak, saya mau coba paketnya yang (${plan}), bisa bantu saya? Terima kasih!`);
        const waUrl = `https://wa.me/6281234567890?text=${message}`;
        window.open(waUrl, '_blank');
    });
});

// Testimonial slider horizontal
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function updateTestimonialClasses(idx, dir = 0) {
    testimonials.forEach((t, i) => {
        t.classList.remove('active', 'left', 'right');
        if (i === idx) {
            t.classList.add('active');
        } else if (i === (idx - 1 + testimonials.length) % testimonials.length && dir === -1) {
            t.classList.add('left');
        } else if (i === (idx + 1) % testimonials.length && dir === 1) {
            t.classList.add('right');
        }
    });
}

function showTestimonial(idx, dir = 0) {
    updateTestimonialClasses(idx, dir);
}

document.getElementById('prev-testimonial').onclick = function() {
    let prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev, -1);
    currentTestimonial = prev;
};
document.getElementById('next-testimonial').onclick = function() {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next, 1);
    currentTestimonial = next;
};
// Auto-slide every 7s ke kanan saja
setInterval(() => {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next, 1);
    currentTestimonial = next;
}, 7000);

// Inisialisasi pertama
showTestimonial(currentTestimonial, 1);
