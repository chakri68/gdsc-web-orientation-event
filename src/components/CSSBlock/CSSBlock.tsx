"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "./CSSBlock.module.scss";
import { motion } from "framer-motion";

export type CSSBlockType = {
  cssProperties: { [x: string]: string };
};

export default function CSSBlock({
  cssProperties = {
    "background-color": "red",
    color: "blue",
    width: "100px",
    "aspect-ratio": "1 / 1",
    "border-radius": "10px",
  },
}: CSSBlockType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: cssProperties,
  });

  const generateCSS = (cssValues: { [x: string]: string }) => {
    const cssLines = [];
    cssLines.push({ str: ".box {", value: "", property: "" });
    for (const property in cssValues) {
      cssLines.push({
        str: `  ${property}: `,
        value: cssValues[property],
        property: property,
      });
    }
    cssLines.push({ str: "}", value: "", property: "" });
    return cssLines;
  };

  return (
    <div className={styles.CSSBlock}>
      <div className={styles.CSSBlock__css}>
        {generateCSS(cssProperties).map(({ str, value, property }) => (
          <div key={value} className={styles.CSSBlock__css__line}>
            {str.startsWith(".") || str.startsWith("}") ? (
              <pre>{str}</pre>
            ) : (
              <>
                <pre className={styles.pre}>{str}</pre>
                <input
                  {...register(property)}
                  className={styles.inp}
                  type="text"
                  defaultValue={value}
                  onChange={(e) => {
                    setValue(property, e.target.value);
                  }}
                />
                <pre>{";"}</pre>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.CSSBlock__preview}>
        <motion.div
          className={styles.CSSBlock__animated_div}
          animate={Object.fromEntries(
            Object.keys(cssProperties).map((property) => [
              property,
              watch(property),
            ])
          )}
          transition={{ type: "spring" }}
        ></motion.div>
      </div>
    </div>
  );
}
