import React from "react";

import styles from "./BestButton.module.scss";
import CssStyles from "./BestButton.module.css";

export interface BestButtonProps {
  prop?: string;
}

export function BestButton({ prop = "default value" }: BestButtonProps) {
  return (
    <>
      <button className={styles.BestButton}>BestButton {prop}</button>
      <button className={CssStyles.BestButton}>BestButton {prop}</button>
    </>
  );
}
