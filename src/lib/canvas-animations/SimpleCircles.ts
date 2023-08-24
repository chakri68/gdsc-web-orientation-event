import { CanvasManager } from "@/components/CanvasBackground/CanvasManager";

export interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  dx: number;
  dy: number;
}

const TWO_PI = Math.PI * 2;

export class SimpleCircles implements CanvasManager {
  public circles: Circle[] = [];
  public canvasEl: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;

  constructor(
    public numCircles = 100,
    public colors: string[] = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"],
    public radiusRange: [number, number] = [5, 20],
    public speedRange: [number, number] = [1, 5],
    public offset: number = 50
  ) {}

  public mount(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.ctx = canvasEl.getContext("2d")!;
    for (let i = 0; i < this.numCircles; i++) {
      const { x, y } = this.getRandomPosition();
      this.circles.push(this.createCircle(x, y));
    }
    this.draw();
  }

  public createCircle(x: number, y: number) {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    const randomRadius =
      Math.random() * (this.radiusRange[1] - this.radiusRange[0]) +
      this.radiusRange[0];

    return {
      x,
      y,
      radius: randomRadius,
      color: randomColor,
      dx:
        (Math.round(Math.random()) * 2 - 1) *
        (Math.random() * (this.speedRange[1] - this.speedRange[0]) +
          this.speedRange[0]),
      dy:
        (Math.round(Math.random()) * 2 - 1) *
          Math.random() *
          (this.speedRange[1] - this.speedRange[0]) +
        this.speedRange[0],
    };
  }

  public draw() {
    if (!this.canvasEl || !this.ctx) return;
    requestAnimationFrame(() => this.draw());

    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    // Circle indices to remove
    const circlesToRemove: number[] = [];
    for (let i = 0; i < this.circles.length; i++) {
      const { x, y, radius, color, dx, dy } = this.circles[i];

      // Move the circle
      this.circles[i].x += dx;
      this.circles[i].y += dy;

      // Check if the circle is outside the canvas
      if (
        (x + radius < 0 && dx < 0) ||
        (x - radius > this.canvasEl.width && dx > 0) ||
        (y + radius < 0 && dy < 0) ||
        (y - radius > this.canvasEl.height && dy > 0)
      ) {
        circlesToRemove.push(i);
      } else {
        // Draw the circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, TWO_PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
      }
    }

    // Remove circles in the toRemove array
    for (let i = circlesToRemove.length - 1; i >= 0; i--) {
      this.circles.splice(circlesToRemove[i], 1);
    }

    // Add new circles as they are removed
    while (this.circles.length < this.numCircles) {
      const { x, y } = this.getRandomPosition();
      this.circles.push(this.createCircle(x, y));
    }
  }

  public getRandomPosition() {
    if (!this.canvasEl) return { x: 0, y: 0 };
    const side = Math.floor(Math.random() * 4);

    let x = 0,
      y = 0;
    switch (side) {
      case 0: // Top
        x = Math.random() * this.canvasEl.width;
        y -= this.offset; // To move it outside the canvas
        break;
      case 1: // Right
        x = this.canvasEl.width + this.offset;
        y = Math.random() * this.canvasEl.height;
        break;
      case 2: // Bottom
        x = Math.random() * this.canvasEl.width;
        y = this.canvasEl.height + this.offset;
        break;
      case 3: // Left
        x -= this.offset;
        y = Math.random() * this.canvasEl.height;
        break;
    }
    return { x, y };
  }

  public unmount() {
    this.canvasEl = null;
    this.ctx = null;
  }
}
