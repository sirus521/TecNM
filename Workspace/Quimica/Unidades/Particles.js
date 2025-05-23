const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['rgba(255, 255, 255, 0.5)', 'rgba(173, 216, 230, 0.5)', 'rgba(255, 182, 193, 0.5)'];

// Ajustar el tamaño del lienzo
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase para las partículas
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10; // Tamaño entre 10 y 30
        this.speedX = Math.random() * 2 - 1; // Velocidad horizontal
        this.speedY = Math.random() * 2 - 1; // Velocidad vertical
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.type = Math.random() > 0.5 ? 'triangle' : 'atom'; // Tipo de partícula
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebotar en los bordes
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        if (this.type === 'triangle') {
            this.drawTriangle();
        } else if (this.type === 'atom') {
            this.drawAtom();
        }
    }

    drawTriangle() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.size / 2, this.y + this.size);
        ctx.lineTo(this.x + this.size / 2, this.y + this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    drawAtom() {
        // Dibujar el núcleo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Dibujar órbitas
        const orbitCount = 2; // Número de órbitas
        for (let i = 1; i <= orbitCount; i++) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2 * i, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Dibujar electrones en las órbitas
        const electronCount = [2, 4]; // Número de electrones por órbita
        electronCount.forEach((count, orbitIndex) => {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i + performance.now() / 1000; // Animar electrones
                const orbitRadius = this.size / 2 * (orbitIndex + 1);
                const electronX = this.x + Math.cos(angle) * orbitRadius;
                const electronY = this.y + Math.sin(angle) * orbitRadius;

                ctx.beginPath();
                ctx.arc(electronX, electronY, this.size / 10, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
            }
        });
    }
}

// Crear partículas
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 25; i++) { // Reducir el número de partículas a 50
        particlesArray.push(new Particle());
    }
}
initParticles();

// Animar partículas
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();