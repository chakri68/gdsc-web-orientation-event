import styles from "./CanvasBackground.module.scss";
import { memo, useEffect, useRef } from "react";
import { CanvasManager } from "./CanvasManager";
import clsx from "clsx";

export type CanvasBackgroundProps = {
  children?: React.ReactNode;
  manager: CanvasManager;
  className?: string;
};

function CanvasBackground({
  children,
  manager,
  className,
}: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width =
        canvasRef.current.parentElement?.clientWidth ?? window.innerWidth;
      canvasRef.current.height =
        canvasRef.current.parentElement?.clientHeight || window.innerHeight;
      manager.mount(canvasRef.current!);
    }
    return () => {
      manager.unmount();
    };
  }, [manager]);

  useEffect(() => {
    const resizeHandler = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.parentElement!.clientWidth;
        canvasRef.current.height =
          canvasRef.current.parentElement!.clientHeight;
      }
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className={clsx(styles.CanvasBackground, className)}>
      <canvas ref={canvasRef} className={styles.Canvas} />
      <div className={styles.CanvasChildren}>{children}</div>
    </div>
  );
}

export default memo(CanvasBackground);
