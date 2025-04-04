document.addEventListener('DOMContentLoaded', () => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Initialize EmailJS first!
  emailjs.init('7yRLxdXAf0ljLXatW'); // Move initialization outside form handler

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Skill Cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = `translateY(-10px) rotateZ(${Math.random() * 4 - 2}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateZ(0deg)';
    });
  });

  // Parallax
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

  // Terminal Effect
  const commands = ['> INITIATE CONTACT_SEQUENCE', '> OPEN COMM_CHANNEL', '> START TRANSMISSION'];
  const cyberButton = document.querySelector('.cyber-button');
  cyberButton.addEventListener('mouseenter', () => {
    document.body.setAttribute('data-terminal', commands[Math.floor(Math.random()*commands.length)]);
    setTimeout(() => document.body.removeAttribute('data-terminal'), 2000);
  });

  // Form Submission (Updated)
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });

    // Validation
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

        
        // Send email
      const response = await emailjs.send(
        'service_81dmn1r', // Service ID
        'template_5qecreg', // Template ID
        {
          from_name: email,
          from_email: email,
          message: message,
          to_email: 'aep2cool@gmail.com' // Add this line
        }
      );

      console.log('EmailJS Response:', response); // Debug logging

      if (response.status === 200) {
        submitBtn.style.background = 'linear-gradient(45deg, #00ff88 0%, #00ff88 100%)';
        setTimeout(() => {
          submitBtn.style.background = 'linear-gradient(45deg, #00ff88 0%, #00ffee 100%)';
          document.getElementById('contactForm').reset();
        }, 1500);
      }
    } catch (error) {
      console.error('Full Error:', error);
      alert(`Failed to send: ${error.text || error.message}`);
      submitBtn.style.background = 'linear-gradient(45deg, #ff0033 0%, #ff0066 100%)';
      setTimeout(() => {
        submitBtn.style.background = 'linear-gradient(45deg, #00ff88 0%, #00ffee 100%)';
      }, 2000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.progress-bar').style.width = '0%';
    }
  });

  // Scroll Animations
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
});