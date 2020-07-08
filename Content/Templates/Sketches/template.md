---
thumbnail: 001.jpg
description: Generative Art
---
```processing

function setup() {
    const myCanvas = createCanvas(800, 800)
    myCanvas.parent('sketch')
    noStroke();
    noLoop();
}

function draw() {
    background(222, 64, 56)
     drawCircle(width / 2, 280, 6);
}

function drawCircle(x, radius, level) {
  const tt = (126 * level) / 4.0;
  fill(tt);
  ellipse(x, height / 2, radius * 2, radius * 2);
  if (level > 1) {
    level = level - 1;
    drawCircle(x - radius / 2, radius / 2, level);
    drawCircle(x + radius / 2, radius / 2, level);
  }
}

```
