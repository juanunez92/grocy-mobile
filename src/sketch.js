// Pequeño efecto visual con p5.js al añadir productos

let addParticles = [];

export function startSketch() {
  new p5((p) => {
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent("p5-container");
      p.clear();
    };

    p.draw = () => {
      p.clear();

      for (let i = addParticles.length - 1; i >= 0; i--) {
        const particle = addParticles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 5;
        particle.size *= 0.98;

        p.noStroke();
        if (particle.color === "red") {
          p.fill(255, 90, 95, particle.alpha);
        } else {
          p.fill(0, 168, 107, particle.alpha);
        }
        p.circle(particle.x, particle.y, particle.size);

        if (particle.alpha <= 0) {
          addParticles.splice(i, 1);
        }
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  });
}

export function createEffect(x, y, color = "green") {
  for (let i = 0; i < 10; i++) {
    addParticles.push({
      x: x,
      y: y,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * -3 - 1,
      size: Math.random() * 6 +4,
      alpha: 180,
      color: color,
    });
  }
}
