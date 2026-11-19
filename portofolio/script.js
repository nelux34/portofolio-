// Data Proyek Portofolio
const projects = [
    {
        title: "Eksplorasi Wisata Kaimana",
        category: "web",
        categoryLabel: "Web Dev",
        desc: "Landing page interaktif destinasi wisata Kabupaten Kaimana dengan filter kategori dan modal detail lokasi.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript"]
    },
    {
        title: "Sistem Manajemen Data Mahasiswa",
        category: "sistem",
        categoryLabel: "Sistem & C++",
        desc: "Aplikasi konsol berbasis C++ untuk pengelolaan, pencarian, dan pengurutan data akademik mahasiswa.",
        tags: ["C++", "Struktur Data", "Algoritma"]
    },
    {
        title: "Verifikasi Rangkaian Hukum Kirchoff",
        category: "sistem",
        categoryLabel: "Sistem & C++",
        desc: "Analisis empiris dan perhitungan matriks arus listrik untuk pemodelan rangkaian elektronik.",
        tags: ["Matriks", "Analisis Sistem", "Simulasi"]
    },
    {
        title: "Eksperimen Audio Tifa & Modern Beat",
        category: "multimedia",
        categoryLabel: "Multimedia",
        desc: "Komposisi audio digital yang memadukan ritme perkusi tradisional Papua dengan aransemen modern.",
        tags: ["Audio Production", "Sound Design"]
    }
];

// 1. Render Proyek & Sistem Filter
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    projectsGrid.innerHTML = filtered.map(p => `
        <div class="p-6 rounded-2xl bg-white dark:bg-charcoal border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
            <div>
                <span class="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-xs mb-3">${p.categoryLabel}</span>
                <h3 class="text-xl font-bold mb-2">${p.title}</h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">${p.desc}</p>
            </div>
            <div class="flex flex-wrap gap-2 font-mono text-xs">
                ${p.tags.map(t => `<span class="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-emerald-500', 'text-obsidian');
            b.classList.add('bg-zinc-200/80', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300');
        });
        btn.classList.add('bg-emerald-500', 'text-obsidian');
        btn.classList.remove('bg-zinc-200/80', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300');
        renderProjects(btn.dataset.filter);
    });
});
renderProjects();

// 2. Tombol Ganti Tema (Dark / Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeIcon.className = isDark ? 'fa-solid fa-sun text-sm' : 'fa-solid fa-moon text-sm';
});

// 3. Menu Navigasi Mobile (Hamburger Menu)
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// 4. Salin Email Otomatis
const copyBtn = document.getElementById('copy-email-btn');
const emailText = document.getElementById('email-text').innerText;
const copyLabel = document.getElementById('copy-btn-label');
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText);
    copyLabel.innerText = 'Tersalin!';
    setTimeout(() => copyLabel.innerText = 'Salin', 2000);
});

// 5. Validasi Form Kontak
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const validName = name.length >= 2;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validMsg = message.length >= 10;

    document.getElementById('error-name').classList.toggle('hidden', validName);
    document.getElementById('error-email').classList.toggle('hidden', validEmail);
    document.getElementById('error-message').classList.toggle('hidden', validMsg);

    if (validName && validEmail && validMsg) {
        document.getElementById('form-feedback').classList.remove('hidden');
        contactForm.reset();
    }
});