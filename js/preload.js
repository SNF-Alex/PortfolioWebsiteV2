window.addEventListener('load', () => {
  const loadFont = (name, url) => {
    const font = new FontFace(name, `url(${url})`);
    return font.load().then(loadedFont => {
      document.fonts.add(loadedFont);
      return Promise.resolve();
    }).catch(err => {
      console.warn(`Font ${name} failed to load:`, err);
      return Promise.resolve();
    });
  };

  Promise.all([
    loadFont('Orbitron', 'https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_QqIRdS2YFJ3KEm6BW.woff2'),
    loadFont('Exo 2', 'https://fonts.gstatic.com/s/exo2/v20/7cH1v4okm5zmbv70xK7hW8OpgAFSYsw.woff2')
  ]).then(() => {
    document.documentElement.style.opacity = '1';
    sessionStorage.fontsLoaded = true;
  }).catch(err => {
    console.warn('Font preloading failed:', err);
    document.documentElement.style.opacity = '1';
  });

  if (sessionStorage.fontsLoaded) {
    document.documentElement.style.opacity = '1';
  }
});