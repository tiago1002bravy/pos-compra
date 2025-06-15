// Countdown Timer
function startCountdown() {
    const now = new Date().getTime();
    const countDownDate = now + (5 * 60 * 1000); // 5 minutos

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "OFERTA EXPIRADA!";
        }
    }, 1000);
}

// Modal functionality
function openModal() {
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden";
    createConfetti();
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "auto";
}

// Efeito de confete minimalista
function createConfetti() {
    const confettiCount = 30;
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '4px';
        confetti.style.height = '4px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 1.5 + 1}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 2000);
}

function getRandomColor() {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Adiciona CSS para animação de queda do confete
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Efeitos de scroll suaves
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.product-card, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
}

// Efeito de hover suave para elementos
function addHoverEffects() {
    const hoverElements = document.querySelectorAll('.product-card, .benefit-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Efeito de fade in para elementos
function addFadeInEffects() {
    const fadeElements = document.querySelectorAll('.benefit-item');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-10px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Efeito de destaque para o countdown quando está acabando
function highlightCountdown() {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    
    if (hours && minutes) {
        const hoursValue = parseInt(hours.textContent);
        const minutesValue = parseInt(minutes.textContent);
        
        if (hoursValue <= 0 && minutesValue <= 1) {
            const countdownItems = document.querySelectorAll('.countdown-item');
            countdownItems.forEach(item => {
                item.style.background = '#fef2f2';
                item.style.borderColor = '#fecaca';
            });
        }
    }
}

// Inicialização de todos os efeitos
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Adiciona scroll suave para o botão "Quero automatizar tudo com IA"
    const ctaHighlight = document.querySelector('.cta-highlight');
    if (ctaHighlight) {
        ctaHighlight.addEventListener('click', function() {
            const checkoutSection = document.getElementById('checkout');
            if (checkoutSection) {
                checkoutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    addScrollEffects();
    addHoverEffects();
    addFadeInEffects();
    
    // Adiciona efeito de destaque para elementos de urgência
    const urgencyElements = document.querySelectorAll('.urgency-point');
    urgencyElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0.8';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 200);
        }, index * 600);
    });
});

// Efeito de destaque para elementos quando visíveis
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.product-card, .pricing-card, .benefit-item');
    elementsToObserve.forEach(el => {
        visibilityObserver.observe(el);
    });
});

// Executa a verificação do countdown a cada minuto
setInterval(highlightCountdown, 60000); 