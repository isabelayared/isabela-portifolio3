// --- DICIONÁRIO DE TRADUÇÕES ---
const translations = {
    pt: {
        inicio: 'INÍCIO',
        sobreMim: 'SOBRE MIM',
        projetos: 'PROJETOS',
        contato: 'CONTATO',
        ola: 'OLÁ, ME CHAMO',
        meuPortfolio: 'ESSE É O MEU PORTFÓLIO',
        tituloSobreMim: 'SOBRE MIM',
        textoSobreMim1: 'DESDE PEQUENA SEMPRE GOSTEI DE APRENDER COISAS NOVAS, E O INGLÊS FOI UMA DAS MINHAS PRIMEIRAS CURIOSIDADES. ESTUDO O IDIOMA DESDE CEDO. JÁ NO ENSINO MÉDIO, FIZ TÉCNICO EM ADMINISTRAÇÃO, O QUE ME DEU UMA BOA BASE SOBRE ORGANIZAÇÃO, GESTÃO, RESPONSABILIDADE E TRABALHO EM EQUIPE. HOJE, ESTOU CADA VEZ MAIS APAIXONADA PELA ÁREA DE TECNOLOGIA DA INFORMAÇÃO, O QUE ME INCENTIVA A APRENDER MAIS TODOS OS DIAS.',
        textoSobreMim2: 'NO LADO PROFISSIONAL, ATUALMENTE TRABALHO COMO JOVEM APRENDIZ E TENHO COMO OBJETIVO CRESCER NA MINHA CARREIRA, BUSCANDO SEMPRE NOVAS OPORTUNIDADES PARA EVOLUIR E COLOCAR EM PRÁTICA TUDO QUE APRENDO.',
        textoSobreMim3: 'NA VIDA PESSOAL, ADORO VIVER NOVAS EXPERIÊNCIAS E TENTO EQUILIBRAR ESTUDO, TRABALHO E LAZER. SOU APAIXONADA POR CACHORROS E TENHO O SONHO DE TER UMA CASA NA PRAIA, POIS NADA SE COMPARA À ENERGIA E CALMARIA DO MAR.',
        btnCv: 'MEU CV',
        tituloProjetos: 'PROJETOS',
        subtituloProjetos: 'CONHEÇA ALGUNS DE MEUS PROJETOS',
        projTitulo3: 'Sistema de Busca e Ordenação',
        projDesc3: 'Busca e Ordenação de dados referentes a focos de queimadas no Pará (2023-2024)',
        projTitulo2: 'Sistema Validade',
        projDesc2: 'Gerenciamento de estoque para otimizar o controle de validade de produtos',
        projTitulo1: 'Sistema Urna Eletrônica',
        projDesc1: 'Urna Eletrônica Simulada com Segurança Criptográfica',
        tituloGithub: 'MEUS REPOSITÓRIOS',
        subtituloGithub: 'Últimas atualizações direto do meu GitHub',
        btnVerTodosGithub: 'VER TODOS OS PROJETOS',
        tituloContato: 'CONTATO',
        subtituloContato: 'GOSTOU DO MEU TRABALHO? ENTRE EM CONTATO COMIGO :)',
        rodape: 'Projetado e construído por Isabela Yared Soares <3',
        copyright: 'Copyright © 2025. Todos os direitos reservados.'
    },
    en: {
        inicio: 'HOME',
        sobreMim: 'ABOUT ME',
        projetos: 'PROJECTS',
        contato: 'CONTACT',
        ola: 'HI, MY NAME IS',
        meuPortfolio: 'THIS IS MY PORTFOLIO',
        tituloSobreMim: 'ABOUT ME',
        textoSobreMim1: 'I HAVE ALWAYS LOVED LEARNING NEW THINGS SINCE I WAS A CHILD, AND ENGLISH WAS ONE OF MY FIRST CURIOSITIES, WHICH I HAVE BEEN STUDYING FROM A YOUNG AGE. IN HIGH SCHOOL, I COMPLETED A TECHNICAL COURSE IN ADMINISTRATION, PROVIDING ME WITH A SOLID FOUNDATION IN ORGANIZATION, MANAGEMENT, RESPONSIBILITY, AND TEAMWORK. TODAY, I AM INCREASINGLY PASSIONATE ABOUT INFORMATION TECHNOLOGY, WHICH MOTIVATES ME TO LEARN MORE EVERY SINGLE DAY.',
        textoSobreMim2: 'PROFESSIONALLY, I CURRENTLY WORK AS AN APPRENTICE. MY GOAL IS TO GROW IN MY CAREER, ALWAYS SEEKING NEW OPPORTUNITIES TO EVOLVE AND APPLY EVERYTHING I LEARN.',
        textoSobreMim3: 'IN MY PERSONAL LIFE, I LOVE NEW EXPERIENCES AND ALWAYS STRIVE TO BALANCE STUDY, WORK, AND LEISURE. I AM PASSIONATE ABOUT DOGS AND DREAM OF OWNING A BEACH HOUSE, AS NOTHING COMPARES TO THE ENERGY AND CALM OF THE SEA.',
        btnCv: 'MY RESUME',
        tituloProjetos: 'PROJECTS',
        subtituloProjetos: 'CHECK OUT SOME OF MY PROJECTS',
        projTitulo3: 'Search & Sort System',
        projDesc3: 'Data search and sorting regarding wildfire spots in Pará state (2023-2024)',
        projTitulo2: 'Validity System',
        projDesc2: 'Inventory management developed to optimize product expiration control',
        projTitulo1: 'Electronic Voting System',
        projDesc1: 'Simulated Electronic Voting Machine with Cryptographic Security',
        tituloGithub: 'MY REPOSITORIES',
        subtituloGithub: 'Latest updates straight from my GitHub',
        btnVerTodosGithub: 'SEE ALL PROJECTS',
        tituloContato: 'CONTACT',
        subtituloContato: 'DID YOU LIKE MY WORK? GET IN TOUCH :)',
        rodape: 'Designed and built by Isabela Yared Soares <3',
        copyright: 'Copyright © 2025. All rights reserved.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Plugins do GSAP
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- 1. CONFIGURAÇÃO INICIAL (IDIOMA) ---
    const currentLang = localStorage.getItem('lang') || 'pt';
    setLanguage(currentLang);

    // --- 2. CANVAS DE PARTÍCULAS (CONSTELLATION EFFECT) ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Tamanho do Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mouse tracker para partículas
    const mouse = {
        x: null,
        y: null,
        radius: 150 // Raio de atração
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Classe Partícula
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Desenha
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#B39F7F'; // Sua cor dourada
            ctx.fill();
        }

        // Atualiza Movimento
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#B39F7F';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    let opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = 'rgba(179, 159, 127,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }

            // Conecta ao Mouse
            if (mouse.x != undefined) {
                let distanceMouse = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) + 
                                    ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                if (distanceMouse < 20000) {
                    ctx.strokeStyle = 'rgba(179, 159, 127, 0.5)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();

    // --- 3. CURSOR MAGNÉTICO (CUSTOM) ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            gsap.to(cursorDot, { x: posX, y: posY, duration: 0.1, ease: "power2.out" });
            gsap.to(cursorOutline, { x: posX, y: posY, duration: 0.5, ease: "power2.out" });
        });

        const hoverables = document.querySelectorAll('a, button, .project-card, .repo-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
                gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
                gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
            });
        });
    }

    // --- 4. MENU HAMBURGUER ---
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

    // --- 5. ANIMAÇÃO DE ENTRADA (HERO) ---
    const tl = gsap.timeline();
    tl.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".greeting", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
      .from(".portfolio-text", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from(".arrow-down", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3");

    // --- 6. NOME DATILOGRAFADO (LOOP) ---
    const nameParts = document.querySelectorAll('.name-part');
    nameParts.forEach(part => {
        const text = part.innerText;
        part.innerHTML = text.split('').map(char => `<span class="char" style="opacity:0; display:inline-block;">${char}</span>`).join('');
    });

    const nameTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });
    
    const allChars = [
        ...document.querySelectorAll('.name-part.first .char'),
        ...document.querySelectorAll('.name-part.stroke')[0].querySelectorAll('.char'), 
        document.querySelector('.name-section img'), 
        ...document.querySelectorAll('.name-part.stroke')[1].querySelectorAll('.char'), 
        ...document.querySelectorAll('.name-part.last .char')
    ];

    gsap.set('.name-section img', { opacity: 0, scale: 0.8 });

    nameTimeline.to(allChars, {
        opacity: 1,
        scale: 1,
        duration: 0.1, 
        stagger: 0.12, 
        ease: "power1.inOut"
    });

    // --- 7. CARDS 3D ---
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10; 

            gsap.to(card, {
                duration: 0.5, rotateX: rotateX, rotateY: rotateY, scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)", ease: "power2.out", transformPerspective: 1000
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.8, rotateX: 0, rotateY: 0, scale: 1,
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)", ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // --- 8. SCROLL TRIGGER ---
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.fromTo(section.children, 
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" }
            }
        );
    });

    // --- 9. EASTER EGG (MATRIX) ---
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let inputSequence = [];

    window.addEventListener('keydown', (e) => {
        inputSequence.push(e.key);
        inputSequence.splice(-secretCode.length - 1, inputSequence.length - secretCode.length);

        if (inputSequence.join('').includes(secretCode.join(''))) {
            alert("🐰 EASTER EGG DESBLOQUEADO: HACKER MODE ACTIVATED 🐰");
            document.body.classList.toggle('matrix-mode');
            gsap.to("body", { rotation: 360, duration: 2, ease: "elastic.inOut(1, 0.3)", onComplete: () => { gsap.set("body", { rotation: 0 }) }});
        }
    });

    // --- 10. GITHUB API ---
    getRepos();
});

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

const username = 'isabelayared';
const reposContainer = document.getElementById('github-wrapper');
const seeMoreContainer = document.getElementById('see-more-btn-area');

function getRepos() {
    if (!reposContainer || !seeMoreContainer) return;

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        .then(response => response.json())
        .then(data => {
            reposContainer.innerHTML = ''; 
            seeMoreContainer.innerHTML = '';
            
            data.forEach(repo => {
                const language = repo.language ? repo.language : 'Código';
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

            const seeMoreBtn = document.createElement('a');
            seeMoreBtn.href = `https://github.com/${username}?tab=repositories`;
            seeMoreBtn.target = '_blank';
            seeMoreBtn.classList.add('botao-ver-mais-github');
            seeMoreBtn.innerHTML = `<span data-key="btnVerTodosGithub">VER TODOS OS PROJETOS</span> ➜`;
            seeMoreContainer.appendChild(seeMoreBtn);

            new Swiper('.github-swiper', {
                slidesPerView: 1, spaceBetween: 20, loop: true,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } },
            });
            const currentLang = localStorage.getItem('lang') || 'pt';
            setLanguage(currentLang);
        })
        .catch(error => console.error('Erro:', error));
}
