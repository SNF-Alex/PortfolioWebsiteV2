document.addEventListener('DOMContentLoaded', () => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const neonButton = document.querySelector('.neon-button');
  neonButton.addEventListener('mouseenter', () => {
    document.body.setAttribute('data-terminal', commands[Math.floor(Math.random()*commands.length)]);
    setTimeout(() => document.body.removeAttribute('data-terminal'), 2000);
  });

  // Form Submission
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;
    const captcha = grecaptcha.getResponse();

    let isValid = true;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email protocol';
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('emailError').style.display = 'none';
    }

    if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('messageError').style.display = 'none';
    }

    if (!captcha) {
      alert('Please verify you are not a robot');
      isValid = false;
    }

    if (isValid) {
      try {
        emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
        const response = await emailjs.send('service_81dmn1r', 'contact_form', {
          from_name: email,
          from_email: email,
          message: message
        });
        if (response.status === 200) {
          alert('Transmission successful! Message received.');
          document.getElementById('contactForm').reset();
          grecaptcha.reset();
          document.getElementById('submitBtn').disabled = true;
        }
      } catch (error) {
        console.error('Transmission failed:', error);
        alert('Message failed to send. Please try again.');
      }
    }
  });

  // Enable Submit
  window.enableSubmit = () => {
    document.getElementById('submitBtn').disabled = false;
  };

  // Scroll Animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-scroll');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      if(elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});