document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const button = form.querySelector('button');
            
            button.disabled = true;
            button.textContent = 'Enviando...';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('¡Gracias por contactar con NovaWedStudio! Nos pondremos en contacto contigo pronto.');
                    form.reset();
                } else {
                    alert('Ups... Hubo un problema. Por favor, asegúrate de haber configurado tu ID de Formspree.');
                }
            } catch (error) {
                alert('Hubo un error al enviar el mensaje. Revisa tu conexión.');
            } finally {
                button.disabled = false;
                button.textContent = 'Enviar Mensaje';
            }
        });
    }

    // Animación de aparición al hacer scroll (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .about-container, .contact-card, .portfolio-footer');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Cambio de estilo del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 2rem';
            header.style.background = 'rgba(11, 14, 20, 0.95)';
        } else {
            header.style.padding = '1.5rem 2rem';
            header.style.background = 'rgba(11, 14, 20, 0.8)';
        }
    });

    // Menú hamburguesa móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
});
