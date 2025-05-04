document.addEventListener('DOMContentLoaded', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  emailjs.init('7yRLxdXAf0ljLXatW');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Skill card hover effects
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = `translateY(-10px) rotateZ(${Math.random() * 4 - 2}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateZ(0deg)';
    });
  });

  // Floating elements parallax
  const floatingElements = document.querySelectorAll('.floating-element');
  const handleMouseMove = (e) => {
    const sensitivity = 0.05;
    floatingElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 1;
      const x = (e.clientX * sensitivity * speed) % window.innerWidth;
      const y = (e.clientY * sensitivity * speed) % window.innerHeight;
      element.style.transform = `translate(${x}px, ${y}px) translateZ(${speed * 10}px)`;
    });
  };
  document.addEventListener('mousemove', handleMouseMove);

  // Cyber button terminal effect
  const commands = ['> INITIATE CONTACT_SEQUENCE', '> OPEN COMM_CHANNEL', '> START TRANSMISSION'];
  const cyberButton = document.querySelector('.cyber-button');
  cyberButton.addEventListener('mouseenter', () => {
    document.body.setAttribute('data-terminal', commands[Math.floor(Math.random()*commands.length)]);
    setTimeout(() => document.body.removeAttribute('data-terminal'), 2000);
  });

  // Contact form handling
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });

    let isValid = true;
    
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email protocol';
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }

    if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    try {
      submitBtn.disabled = true;
      submitBtn.querySelector('.progress-bar').style.width = '100%';

      const response = await emailjs.send(
        'service_81dmn1r',
        'template_5qecreg',
        {
          from_name: email,
          from_email: email,
          message: message,
          to_email: 'aep2cool@gmail.com'
        }
      );

      if (response.status === 200) {
        submitBtn.style.background = 'linear-gradient(45deg, var(--neon-accent) 0%, var(--neon-accent) 100%)';
        setTimeout(() => {
          submitBtn.style.background = 'linear-gradient(45deg, var(--neon-accent) 0%, var(--neon-accent) 100%)';
          document.getElementById('contactForm').reset();
        }, 1500);
      }
    } catch (error) {
      console.error('Full Error:', error);
      alert(`Failed to send: ${error.text || error.message}`);
      submitBtn.style.background = 'linear-gradient(45deg, #ff0033 0%, #ff0066 100%)';
      setTimeout(() => {
        submitBtn.style.background = 'linear-gradient(45deg, var(--neon-accent) 0%, var(--neon-accent) 100%)';
      }, 2000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.progress-bar').style.width = '0%';
    }
  });

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-scroll');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if(elementTop < window.innerHeight * 0.8) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Color theme handling (updated for mobile)
  const colorButtons = document.querySelectorAll('.color-option');
  const savedTheme = localStorage.getItem('selectedTheme');
  
  // Theme update function
  window.updateTheme = (color) => {
    document.documentElement.setAttribute('data-theme', color);
    localStorage.setItem('selectedTheme', color);
    
    // Update particle system
    if (window.updateParticleTheme) {
      window.updateParticleTheme();
    }
  };

  // Initialize theme from storage
  if (savedTheme) {
    window.updateTheme(savedTheme);
    const activeButton = Array.from(colorButtons).find(
      btn => btn.dataset.color === savedTheme
    );
    if (activeButton) activeButton.classList.add('active');
  }

  // Theme button handlers
  colorButtons.forEach(button => {
    const handleThemeChange = (e) => {
      e.preventDefault();
      colorButtons.forEach(btn => btn.classList.remove('active'));
      window.updateTheme(button.dataset.color);
      button.classList.add('active');
    };

    // Add both mouse and touch events
    button.addEventListener('click', handleThemeChange);
    button.addEventListener('touchend', handleThemeChange);
  });

  // Console easter egg
  console.log("%c⚠ CYBER DEV MODE ACTIVATED ⚠", "color: var(--neon-accent); font-family: Orbitron; font-size: 16px;");
});