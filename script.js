// --- FUNÇÕES DE TRADUÇÃO E MENU ---

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-button[data-lang="${lang}"]`).classList.add('active');

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const lang = event.target.getAttribute('data-lang');
        setLanguage(lang);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DO CURSOR PERSONALIZADO ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Só ativa se não for dispositivo touch (mobile)
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Ponto segue exatamente o mouse
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Círculo tem uma animação suave (efeito delay)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Efeito Hover em links e botões
        const hoverables = document.querySelectorAll('a, button, .botao01, .nav-link, .lang-button');
        
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // --- 2. MENU HAMBURGUER ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links-container');

    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });

    // --- 3. SCROLL REVEAL (Animações) ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            reset: false
        });

        sr.reveal('.greeting', { delay: 200 });
        sr.reveal('.name-section', { delay: 400 });
        sr.reveal('.portfolio-text', { delay: 600 });
        sr.reveal('.about-text', { origin: 'left', delay: 200 });
        sr.reveal('.project-card', { interval: 200 });
        sr.reveal('.github-section', { delay: 200 });
        sr.reveal('.contact-section .section-title', { delay: 200 });
        sr.reveal('.button', { delay: 300, origin: 'top' });
    }

    // --- 4. API DO GITHUB + CARROSSEL ---
    getRepos();
});

// --- FUNÇÃO API DO GITHUB ---
const username = 'isabelayared';
const reposContainer = document.getElementById('github-wrapper');
const seeMoreContainer = document.getElementById('see-more-btn-area');

function getRepos() {
    if (!reposContainer || !seeMoreContainer) return;

    // Busca 3 repositórios
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        .then(response => response.json())
        .then(data => {
            reposContainer.innerHTML = ''; 
            seeMoreContainer.innerHTML = '';
            
            // Cria os slides (swiper-slide)
            data.forEach(repo => {
                const language = repo.language ? repo.language : 'Código';
                
                // Estrutura específica do Swiper
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                
                slide.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" class="repo-card">
                        <h3 class="repo-name">${repo.name}</h3>
                        <p class="repo-desc">${repo.description || 'Projeto desenvolvido por Isabela Yared.'}</p>
                        <div class="repo-stats">
                            <span>🟣 ${language}</span>
                            <span>⭐ ${repo.stargazers_count}</span>
                        </div>
                    </a>
                `;
                reposContainer.appendChild(slide);
            });

            // Cria o botão centralizado fora do carrossel
            const seeMoreBtn = document.createElement('a');
            seeMoreBtn.href = `https://github.com/${username}?tab=repositories`;
            seeMoreBtn.target = '_blank';
            seeMoreBtn.classList.add('botao-ver-mais-github');
            seeMoreBtn.innerHTML = `<span data-key="btnVerTodosGithub">VER TODOS OS PROJETOS</span> ➜`;
            
            seeMoreContainer.appendChild(seeMoreBtn);

            // INICIALIZA O SWIPER APÓS CARREGAR OS DADOS
            new Swiper('.github-swiper', {
                slidesPerView: 1, // Celular: 1 slide
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2, // Tablet: 2 slides
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3, // Desktop: 3 slides
                        spaceBetween: 30,
                    },
                },
            });

            // Reaplica as traduções para traduzir o botão novo
            const currentLang = localStorage.getItem('lang') || 'pt';
            setLanguage(currentLang);
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
            reposContainer.innerHTML = '<p>Não foi possível carregar os repositórios.</p>';
        });
}
