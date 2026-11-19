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

// ৩. ডার্ক ও লাইট মোড টগল (Dark / Light Mode Toggle)
const navbarNavList = document.querySelector('#navbarNav .navbar-nav');
let themeToggleBtn = null;

if (navbarNavList) {
    const li = document.createElement('li');
    li.className = 'nav-item d-flex align-items-center ms-lg-3 my-2 my-lg-0';

    themeToggleBtn = document.createElement('button');
    themeToggleBtn.type = 'button';
    themeToggleBtn.id = 'themeToggleBtn';
    themeToggleBtn.className = 'btn btn-outline-light btn-sm rounded-pill px-3';
    themeToggleBtn.setAttribute('aria-label', 'Toggle dark or light mode');

    li.appendChild(themeToggleBtn);
    navbarNavList.appendChild(li);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode-active', isDark);
    document.body.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';
    document.body.style.color = isDark ? '#f8fafc' : '#212529';

    // Bootstrap-এর bg-light সেকশনগুলো ডার্ক মোডে মানানসই করা
    document.querySelectorAll('section.bg-light').forEach(sec => {
        if (isDark) {
            sec.classList.remove('bg-light');
            sec.classList.add('bg-dark', 'text-light');
            sec.setAttribute('data-was-light', 'true');
        } else if (sec.getAttribute('data-was-light') === 'true') {
            sec.classList.remove('bg-dark', 'text-light');
            sec.classList.add('bg-light');
        }
    });

    // কার্ডগুলোর ব্যাকগ্রাউন্ড ও টেক্সট সামঞ্জস্য করা
    document.querySelectorAll('.card').forEach(card => {
        if (isDark) {
            card.style.backgroundColor = '#1e293b';
            card.style.color = '#f8fafc';
        } else {
            card.style.backgroundColor = '';
            card.style.color = '';
        }
    });

    // বাটনের আইকন ও টেক্সট আপডেট করা
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = isDark
            ? '<i class="bi bi-sun-fill text-warning me-1"></i> Light'
            : '<i class="bi bi-moon-stars-fill me-1"></i> Dark';
    }

    localStorage.setItem('siteTheme', theme);
}

// সংরক্ষিত থিম লোড করা (ডিফল্ট light)
const savedTheme = localStorage.getItem('siteTheme') || 'light';
applyTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('siteTheme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}