import './bookcover.css'

// Generate gold dust particles
const container = document.querySelector('.particles')
if (container) {
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('span')
    p.className = 'particle'
    p.style.cssText = `
      --x:${Math.random() * 100}%;
      --y:${55 + Math.random() * 45}%;
      --dx:${(Math.random() - 0.5) * 80}px;
      --dy:${-(60 + Math.random() * 140)}px;
      --duration:${14 + Math.random() * 16}s;
      --delay:${Math.random() * 12}s;
      --size:${1.5 + Math.random() * 2}px;
      --peak-opacity:${0.12 + Math.random() * 0.3};
    `
    container.appendChild(p)
  }
}
