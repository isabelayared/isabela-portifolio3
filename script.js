// Adicione este código no início do seu arquivo script.js

// Função para aplicar as traduções
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Atualiza a classe 'active' nos botões de idioma
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-button[data-lang="${lang}"]`).classList.add('active');

    // Salva o idioma na memória do navegador
    localStorage.setItem('lang', lang);

    // Atualiza a tag <html>
    document.documentElement.lang = lang;
}

// Event Listeners para os botões de idioma
document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const lang = event.target.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Verifica o idioma salvo no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'pt';
    setLanguage(savedLang);
    
    // O resto do seu código de carrossel
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carousel = document.querySelector('.projects-carousel');

    if (!track || cards.length === 0 || !prevButton || !nextButton || !carousel) {
        console.error("Elementos do carrossel não encontrados. Verifique as classes no HTML.");
        return;
    }

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId = 0;

    // Função para atualizar a posição do carrossel
    function setPositionByIndex() {
        const cardWidth = cards[0].offsetWidth;
        currentTranslate = currentIndex * -cardWidth;
        track.style.transform = `translateX(${currentTranslate}px)`;
        track.style.transition = 'transform 0.5s ease-in-out';
    }

    // Navegação com os botões
    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    });

    // Lógica de Arrastar (Swipe)
    const startDrag = (event) => {
        isDragging = true;
        startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        prevTranslate = currentTranslate;
        track.style.transition = 'none';
        animationId = requestAnimationFrame(animation);
    };

    const drag = (event) => {
        if (!isDragging) return;
        const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    };

    const endDrag = () => {
        cancelAnimationFrame(animationId);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < cards.length - 1) {
            currentIndex++;
        } else if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        setPositionByIndex();
    };
    
    const animation = () => {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    };
    
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchstart', startDrag);
    carousel.addEventListener('touchend', endDrag);
    carousel.addEventListener('touchmove', drag);

    // Ajuste inicial no carregamento
    setPositionByIndex();
    
    // Ajusta a posição no redimensionamento da tela
    window.addEventListener('resize', setPositionByIndex);
});