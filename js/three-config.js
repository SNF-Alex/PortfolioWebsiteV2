document.addEventListener('DOMContentLoaded', () => {
  if (!window.WebGLRenderingContext || !window.THREE) {
    document.getElementById('particleCanvas').style.display = 'none';
    return;
  }

  let scene, camera, renderer, particles;
  const canvas = document.getElementById('particleCanvas');

  function initParticles() {
    scene = new THREE.Scene();
    
    // Camera setup
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

    // Particle geometry with more density
    const geometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: new THREE.Color(0x00ff88),
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

    const time = Date.now() * 0.0005; // Slower animation
    
    // Autonomous floating motion
    particles.rotation.x = time * 0.1;
    particles.rotation.y = time * 0.15;

    // Smooth particle position updates
    const positions = particles.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(time + i) * 0.0015;
      positions[i + 1] += Math.cos(time + i * 0.5) * 0.0015;
      positions[i + 2] += Math.sin(time * 0.7 + i) * 0.0015;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Initialize
  try {
    initParticles();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();
  } catch (error) {
    canvas.style.display = 'none';
  }
});