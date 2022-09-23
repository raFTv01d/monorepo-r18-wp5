import React from "react";

// import styles from "./Button.css";
import styles from "./Button.module.scss";

export interface ButtonProps {
  children?: string;
}

export function Button({ children = "default value" }: ButtonProps) {
  return <button className={styles.Button}>{children}</button>;
}
