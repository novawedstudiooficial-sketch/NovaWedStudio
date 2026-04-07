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
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a las tarjetas de servicio y secciones
    const revealElements = document.querySelectorAll('.service-card, .about-container, .contact-card');
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

    // Lógica de Galería Modal (Lightbox)
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentIdxText = document.getElementById('current-idx');
    const totalIdxText = document.getElementById('total-idx');

    let galleryImages = [];
    let currentImageIndex = 0;

    const projectCards = document.querySelectorAll('.project-card[data-gallery]');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const galleryAttr = card.getAttribute('data-gallery');
            if (galleryAttr) {
                galleryImages = galleryAttr.split(',');
                currentImageIndex = 0;
                updateModalImage();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function updateModalImage() {
        if (galleryImages.length > 0) {
            modalImg.src = galleryImages[currentImageIndex];
            currentIdxText.textContent = currentImageIndex + 1;
            totalIdxText.textContent = galleryImages.length;
        }
    }

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateModalImage();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeModal();
    });
});
