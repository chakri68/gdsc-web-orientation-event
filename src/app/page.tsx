"use client";

import { useRef } from "react";

import CSSBlock from "@/components/CSSBlock/CSSBlock";
import { CanvasManager } from "@/components/CanvasBackground/CanvasManager";
import { SimpleCircles } from "@/lib/canvas-animations/SimpleCircles";
import CanvasBackground from "@/components/CanvasBackground/CanvasBackground";

import styles from "./page.module.scss";

export default function Home() {
  const canvasManagerRef = useRef<CanvasManager>(
    new SimpleCircles(40, undefined, [10, 30], [1, 5])
  );

  const CSSProps = {
    "background-color": "red",
    width: "100px",
    "aspect-ratio": "1 / 1",
    "border-radius": "10px",
  };

  return (
    <CanvasBackground
      manager={canvasManagerRef.current}
      className={styles.main}
    >
      <CSSBlock cssProperties={CSSProps} selectorText=".circle" />
    </CanvasBackground>
  );
}
