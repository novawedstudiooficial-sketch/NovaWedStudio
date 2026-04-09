document.addEventListener('DOMContentLoaded', () => {
    // Datos de los proyectos para la galería
    const projectsData = {
        'Menú Virtual': {
            title: 'Menú Virtual',
            category: 'Gastronomía Digital',
            description: 'Sistema interactivo con función de carrito y pedidos, optimizado para una experiencia fluida en cualquier dispositivo.',
            images: [
                'img/menu virtual/foto 1 .png'
                // Aquí añadirás más imágenes cuando las tengas, ej: 'img/menu virtual/foto 2.png'
            ]
        },
        'Mitriki': {
            title: 'Mitriki',
            category: 'Ecosistema Digital',
            description: 'Plataforma robusta basada en microservicios y entretenimiento interactivo de alto rendimiento.',
            images: [
                'img/proyecto 2mitriki.png'
                // Aquí añadirás las imágenes de la nueva carpeta, ej: 'img/mitriki/foto1.png'
            ]
        },
        'Vortex App': {
            title: 'Vortex App',
            category: 'Logística',
            description: 'Optimización inteligente de rutas y gestión de flotas con IA aplicada.',
            images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80']
        },
        'Nova CRM': {
            title: 'Nova CRM',
            category: 'SaaS',
            description: 'Gestión avanzada de relaciones con clientes diseñada para escalar negocios.',
            images: ['https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80']
        }
    };

    // Elementos del Modal
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalCurrentIndex = document.getElementById('current-index');
    const modalTotalImages = document.getElementById('total-images');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let currentProjectImages = [];
    let currentIndex = 0;

    // Función para abrir el modal
    function openProject(projectName) {
        const project = projectsData[projectName];
        if (!project) return;

        currentProjectImages = project.images;
        currentIndex = 0;

        updateModalContent(project);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    }

    function updateModalContent(project) {
        modalImg.src = currentProjectImages[currentIndex];
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        modalCurrentIndex.textContent = currentIndex + 1;
        modalTotalImages.textContent = currentProjectImages.length;

        // Ocultar botones si solo hay una imagen
        prevBtn.style.display = currentProjectImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentProjectImages.length > 1 ? 'block' : 'none';
    }

    // Eventos de los proyectos
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.querySelector('h3').textContent;
            openProject(projectName);
        });
    });

    // Eventos del Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        modalImg.src = currentProjectImages[currentIndex];
        modalCurrentIndex.textContent = currentIndex + 1;
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentProjectImages.length;
        modalImg.src = currentProjectImages[currentIndex];
        modalCurrentIndex.textContent = currentIndex + 1;
    });

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

    // Animación de aparición al hacer scroll
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

    // Header scroll
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

    // Menú móvil
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
