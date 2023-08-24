export interface CanvasManager {
  mount: (canvasEl: HTMLCanvasElement) => void;
  unmount: () => void;
}
