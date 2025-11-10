// Seleciona o canvas e define o contexto 2D
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

// Cria um conjunto de círculos com posições, cores e velocidades diferentes
const bolas = [];
for (let i = 0; i < 10; i++) {
  bolas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    raio: 20 + Math.random() * 20,
    cor: getCorAleatoria(),
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4
  });
}

// Função para gerar cores aleatórias em RGB
function getCorAleatoria() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

// Função principal de animação
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa a tela

  bolas.forEach(bola => {
    // Desenha a bola
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2);
    ctx.fillStyle = bola.cor;
    ctx.fill();
    ctx.closePath();

    // Atualiza a posição
    bola.x += bola.dx;
    bola.y += bola.dy;

    // Rebote nas bordas
    if (bola.x + bola.raio > canvas.width || bola.x - bola.raio < 0) {
      bola.dx *= -1;
      bola.cor = getCorAleatoria();
    }
    if (bola.y + bola.raio > canvas.height || bola.y - bola.raio < 0) {
      bola.dy *= -1;
      bola.cor = getCorAleatoria();
    }
  });

  // Chama novamente a animação
  requestAnimationFrame(animar);
}

// Evento opcional de clique para mudar a cor das bolas
canvas.addEventListener('click', () => {
  bolas.forEach(b => (b.cor = getCorAleatoria()));
});

// Inicia a animação
animar();
