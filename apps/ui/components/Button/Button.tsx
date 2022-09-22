import React from 'react';

import styles from './Button.scss';

export interface ButtonProps {
  prop?: string;
}

export function Button({prop = 'default value'}: ButtonProps) {
  return <div className={styles.Button}>Button {prop}</div>;
}
