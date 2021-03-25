import React from 'react';
import { motion } from 'framer-motion';
import style from './Card.module.css';

const Card = ({ data, selectCard, difficulty }) => {
  const clickHandler = () => {
    selectCard(data.hex);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={style.card}
      onClick={clickHandler}
    >
      <div className={style.image} style={{ backgroundColor: data.hex }}></div>
      {difficulty === 0 ? (
        <p className={style.text}>
          <strong>{data.name}</strong>
        </p>
      ) : null}
      {difficulty < 2 ? <p className={style.text}>{data.hex}</p> : null}
      {difficulty < 2 ? (
        <p className={style.text}>{`rgb: (${data.rgb.join(', ')})`}</p>
      ) : null}
    </motion.div>
  );
};

export default Card;
