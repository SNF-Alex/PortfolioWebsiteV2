document.addEventListener('DOMContentLoaded', () => {
  if (!window.WebGLRenderingContext || !window.THREE) {
    document.getElementById('particleCanvas').style.display = 'none';
    return;
  }

  let scene, camera, renderer, particles;
  const canvas = document.getElementById('particleCanvas');
  const themeColors = {
    green: 0x00ff88,
    red: 0xFF000D,
    blue: 0x00f0ff,
    pink: 0xff00ff
  };

  function initParticles(theme = 'green') {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: new THREE.Color(themeColors[theme]),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  function animate() {
    requestAnimationFrame(animate);
    
    if (!particles) return;

    const time = Date.now() * 0.0005;
    
    particles.rotation.x = time * 0.1;
    particles.rotation.y = time * 0.15;

    const positions = particles.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(time + i) * 0.0015;
      positions[i + 1] += Math.cos(time + i * 0.5) * 0.0015;
      positions[i + 2] += Math.sin(time * 0.7 + i) * 0.0015;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  window.updateTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    particles.material.color.setHex(themeColors[theme]);
    localStorage.setItem('selectedTheme', theme);
  };

  try {
    const savedTheme = localStorage.getItem('selectedTheme') || 'green';
    initParticles(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();
  } catch (error) {
    canvas.style.display = 'none';
    console.error('Three.js initialization failed:', error);
  }
});