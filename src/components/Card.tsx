import { forwardRef } from 'react';
import styles from './Card.module.scss';

const Card = forwardRef<HTMLDivElement>((_props, ref) => {
  return <div ref={ref} className={styles.card}></div>;
});

export default Card;
