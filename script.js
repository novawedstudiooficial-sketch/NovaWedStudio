document.addEventListener('DOMContentLoaded', () => {
    // Datos de los proyectos para la galería
    const projectsData = {
        'Menú Virtual': {
            title: 'Menú Virtual',
            category: 'Gastronomía Digital',
            description: 'Sistema interactivo con función de carrito y pedidos, optimizado para una experiencia fluida en cualquier dispositivo.',
            images: {
                desktop: [
                    'img/menu virtual/foto 1 .png',
                    'img/menu virtual/foto 2.png',
                    'img/menu virtual/foto 3.png'
                ],
                mobile: [
                    'img/menu virtual/foto 1(formato celular).png',
                    'img/menu virtual/foto 2(formato celular).png'
                ]
            }
        },
        'Mitriki': {
            title: 'Mitriki',
            category: 'Ecosistema Digital',
            description: 'Plataforma robusta basada en microservicios y entretenimiento interactivo de alto rendimiento.',
            images: {
                desktop: [
                    'img/mitriki/proyecto 2mitriki.png',
                    'img/mitriki/foto 1.png',
                    'img/mitriki/foto 2.png'
                ],
                mobile: [
                    'img/mitriki/foto 1 (formato celular).png',
                    'img/mitriki/foto 2 (formato celular).png'
                ]
            }
        }
    };

    // Barra de progreso de lectura
    window.onscroll = function() {
        updateProgressBar();
        handleHeaderScroll();
    };

    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

    function handleHeaderScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 2rem';
            header.style.background = 'rgba(11, 14, 20, 0.95)';
        } else {
            header.style.padding = '1.5rem 2rem';
            header.style.background = 'rgba(11, 14, 20, 0.8)';
        }
    }

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
    const deviceBtns = document.querySelectorAll('.device-btn');

    let currentProjectData = null;
    let currentDevice = 'desktop';
    let currentIndex = 0;

    // Función para abrir el modal
    function openProject(projectName) {
        currentProjectData = projectsData[projectName];
        if (!currentProjectData) return;

        currentDevice = 'desktop';
        currentIndex = 0;

        updateDeviceSelectorVisibility();
        updateModalContent();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function updateDeviceSelectorVisibility() {
        const hasMobile = currentProjectData.images.mobile && currentProjectData.images.mobile.length > 0;
        const selector = document.querySelector('.device-selector');
        selector.style.display = hasMobile ? 'flex' : 'none';
        
        deviceBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.device === 'desktop');
        });
    }

    function updateModalContent() {
        const images = currentProjectData.images[currentDevice];
        modalImg.src = images[currentIndex];
        modalTitle.textContent = currentProjectData.title;
        modalDesc.textContent = currentProjectData.description;
        modalCurrentIndex.textContent = currentIndex + 1;
        modalTotalImages.textContent = images.length;

        modalImg.style.width = currentDevice === 'mobile' ? 'auto' : '100%';

        prevBtn.style.display = images.length > 1 ? 'block' : 'none';
        nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    }

    // Eventos de selección de dispositivo
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deviceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDevice = btn.dataset.device;
            currentIndex = 0;
            updateModalContent();
        });
    });

    // Eventos de los proyectos
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.querySelector('h3').textContent;
            openProject(projectName);
        });
    });

    // Navegación
    prevBtn.addEventListener('click', () => {
        const images = currentProjectData.images[currentDevice];
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalContent();
    });

    nextBtn.addEventListener('click', () => {
        const images = currentProjectData.images[currentDevice];
        currentIndex = (currentIndex + 1) % images.length;
        updateModalContent();
    });

    // Cerrar modal
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
                    alert('Ups... Hubo un problema.');
                }
            } catch (error) {
                alert('Hubo un error al enviar el mensaje.');
            } finally {
                button.disabled = false;
                button.textContent = 'Enviar Mensaje';
            }
        });
    }

    // Sistema de Partículas
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;

            // Interacción con el ratón
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                this.x -= directionX * force * 2;
                this.y -= directionY * force * 2;
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 255, 157, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    let opacity = 1 - (distance / 150);
                    ctx.strokeStyle = `rgba(0, 255, 157, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Efecto de Escritura (Typing Effect)
    const typingElement = document.getElementById('typing-text');
    const words = ['Proyecto Digital', 'Idea Innovadora', 'Marca Global', 'App Escalable'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pausa al final de la palabra
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingElement) {
        typingElement.classList.add('typing');
        type();
    }

    // Efecto Tilt 3D en tarjetas
    const tiltCards = document.querySelectorAll('.service-card, .project-card, .glass-card-about');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // Animación scroll e Intersection Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-container, .contact-card, .portfolio-footer').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Mobile menu logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', navLinks.classList.contains('active') ? 'x' : 'menu');
            lucide.createIcons();
        });
    }
});
