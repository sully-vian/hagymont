// src/utils/canvasAnimation.js
export const initBackground = (canvasRef) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  let animationFrame;
  
  // Initialize data
  const particles = [];
  const data = {
    heartRate: Array(50).fill(80),
    strength: Array(20).fill(0),
    calories: 0
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 2 + 1;
      this.color = `hsl(${Math.random() * 40 + 160}, 70%, 60%)`;
    }

    update() {
      this.y -= this.speed;
    }
  }

  // Window resize handler
  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Data generation
  const generateData = () => {
    data.heartRate = [
      ...data.heartRate.slice(1),
      100 + Math.sin(Date.now()/800) * 70
    ];
    
    data.strength = [
      ...data.strength.slice(1),
      Math.min(50, Math.max(30, 
        data.strength[data.strength.length - 1] + 
        (Math.random() * 10 - 7) 
      ))
    ];
    
    data.calories += Math.random();
  };

  // Draw strength bar chart
  const drawStrength = () => {
    const barWidth = canvas.width / data.strength.length;
    data.strength.forEach((v, i) => {
      ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + v/150})`; 
      ctx.fillRect(
        i * barWidth,
        canvas.height - (v/100 * canvas.height/2),
        barWidth - 1,
        canvas.height
      );
    });
  };

  // Draw heart rate curve
  const drawHeartRate = () => {
    ctx.beginPath();
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    data.heartRate.forEach((v, i) => {
      const x = (canvas.width / data.heartRate.length) * i;
      const y = canvas.height - v;
      ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  // Update particle system
  const updateParticles = () => {
    // Filter and update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      if (particles[i].y <= 0) {
        particles.splice(i, 1);
      }
    }

    // Generate new particles
    if (particles.length < data.calories) {
      particles.push(new Particle(
        Math.random() * canvas.width,
        canvas.height
      ));
    }
  };

  // Draw particles
  const drawParticles = () => {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  };

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateData();
    drawHeartRate();
    drawStrength();
    updateParticles();
    drawParticles();
    animationFrame = requestAnimationFrame(animate);
  };

  // Initialization
  resizeHandler();
  window.addEventListener('resize', resizeHandler);
  animate();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', resizeHandler);
  };
};