// ========================================
// MENU HAMBÚRGUER E NAVEGAÇÃO
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle do menu hambúrguer
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
    
    if (!isClickInsideNav && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// ANIMAÇÃO AO SCROLL (FADE IN)
// ========================================

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

// Observar todos os cards para animação
document.querySelectorAll('.card-fade').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// EFEITO PARALLAX SUAVE
// ========================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (hero && scrollY < 1000) {
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
});

// ========================================
// FORMULÁRIO DE NEWSLETTER
// ========================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = newsletterForm.querySelector('input[type="email"]');
        const button = newsletterForm.querySelector('button');
        const originalButtonText = button.textContent;
        
        // Validação básica
        if (!input.value) {
            showNotification('Por favor, insira seu e-mail', 'error');
            return;
        }
        
        // Simulação de envio
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('Obrigado! Você se inscreveu com sucesso! 🎉', 'success');
            newsletterForm.reset();
            button.textContent = originalButtonText;
            button.disabled = false;
        }, 1000);
    });
}

// ========================================
// NOTIFICAÇÕES
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                max-width: 300px;
                word-wrap: break-word;
            }
            
            .notification-success {
                background-color: #89A74D;
                color: white;
            }
            
            .notification-error {
                background-color: #d32f2f;
                color: white;
            }
            
            .notification-info {
                background-color: #4E6F3A;
                color: white;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========================================
// NAVBAR STICKY - EFEITO SCROLL
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll para baixo
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(78, 111, 58, 0.15)';
        }
    } else {
        // Scroll para cima
        navbar.style.boxShadow = '0 2px 10px rgba(78, 111, 58, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// BOTÃO "COMECE AGORA"
// ========================================

const ctaButton = document.querySelector('.cta .btn-secondary');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showNotification('Funcionalidade em desenvolvimento! 🚀', 'info');
    });
}

// ========================================
// EFEITO HOVER NOS CARDS DA GALERIA
// ========================================

const galeriaItems = document.querySelectorAll('.galeria-item');

galeriaItems.forEach(item => {
    item.addEventListener('click', function() {
        showNotification('Imagem: ' + this.querySelector('h3').textContent, 'info');
    });
});

// ========================================
// CONTADOR ANIMADO (OPCIONAL - PARA FUTURAS MÉTRICAS)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Agrinho 2026 - Site carregado com sucesso!');
    console.log('🌱 Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente');
});

// ========================================
// SERVICE WORKER (PARA OFFLINE - OPCIONAL)
// ========================================

// Registrar service worker se disponível
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Aqui você poderia registrar um service worker
        // navigator.serviceWorker.register('sw.js');
    });
}

// ========================================
// PERFORMANCE - LAZY LOADING DAS IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Aqui você carregaria a imagem de verdade
                observer.unobserve(img);
            }
        });
    });
    
    // Aplicar lazy loading para imagens (quando houver imagens reais)
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// VALIDAÇÃO DE FORMULÁRIO
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar email do formulário de newsletter
const newsletterInput = document.querySelector('.newsletter-form input[type="email"]');

if (newsletterInput) {
    newsletterInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#d32f2f';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ========================================
// ACESSIBILIDADE - FOCUS VISIBLE
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// TEMA ESCURO (OPCIONAL - FUTURA IMPLEMENTAÇÃO)
// ========================================

// const themeToggle = document.querySelector('.theme-toggle');
// 
// if (themeToggle) {
//     themeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('dark-theme');
//         localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
//     });
//     
//     // Restaurar tema salvo
//     if (localStorage.getItem('theme') === 'dark') {
//         document.body.classList.add('dark-theme');
//     }
// }
