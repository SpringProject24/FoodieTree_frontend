// Arrow.js
import React from 'react';
import styles from './Arrow.module.scss'

const Arrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`${className} ${styles.arrow} ${direction === 'prev' ? styles.prev : styles.next}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {direction === 'prev' ? '<' : '>'}
    </div>
  );
};

export default Arrow;