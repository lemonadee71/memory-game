import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import style from './App.module.css';
import data from './data.json';

const storage = window.localStorage;

const App = () => {
  const CARD_LIMIT = 12;
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const shuffleItems = () => {
    const tempArray = [];

    while (tempArray.length !== CARD_LIMIT) {
      const index = Math.floor(Math.random() * data.colors.length);
      const item = data.colors[index];

      if (!tempArray.find((color) => color.hex === item.hex)) {
        tempArray.push(item);
      }
    }

    return tempArray;
  };

  const chooseCard = (hex) => {
    const isAlreadyPicked = selectedColors.find((color) => color === hex);

    if (isAlreadyPicked) {
      reset();
    } else {
      setCurrentScore(currentScore + 1);
      setSelectedColors([...selectedColors, hex]);
      setShuffledArray(shuffleItems());
    }
  };

  const chooseDifficulty = (e) => {
    setDifficulty(+e.target.value);
    reset();
  };

  const reset = () => {
    setSelectedColors([]);
    setBestScore(Math.max(currentScore, bestScore));
    setCurrentScore(0);
    setShuffledArray(shuffleItems());
  };

  useEffect(() => {
    setShuffledArray(shuffleItems());
    setBestScore(JSON.parse(storage.getItem('highscore')));
  }, []);

  useEffect(() => {
    storage.setItem('highscore', JSON.stringify(bestScore));
  }, [bestScore]);

  return (
    <div>
      <div>
        <p>Current score: {currentScore}</p>
        <p>Highest score: {bestScore}</p>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          name="difficulty"
          value={difficulty}
          onChange={chooseDifficulty}
        >
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option value="2">Hard</option>
        </select>
      </div>
      <div className={style.container}>
        {shuffledArray.map((color) => (
          <Card
            key={color.hex}
            difficulty={difficulty}
            data={color}
            selectCard={chooseCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
