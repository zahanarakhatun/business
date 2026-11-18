// ১. ব্যাক-টো-টপ (Back to Top) বাটন তৈরি ও ফাংশনালিটি
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopBtn.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow';
backToTopBtn.style.cssText = 'display: none; z-index: 1000; width: 45px; height: 45px;';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ২. কন্টাক্ট ফর্ম সাবমিশন হ্যান্ডলিং (যদি contact.html পেজে থাকে)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const alertBox = document.getElementById('formAlert');
        if (alertBox) {
            alertBox.classList.remove('d-none');
        }
        this.reset();
    });
}