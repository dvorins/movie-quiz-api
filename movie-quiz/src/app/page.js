'use client'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './page.module.css';

function ProgressBar({maxRange}) {
  const [counter, setCounter] = useState(maxRange);
 
 
  useEffect(() => {
    if (counter >= 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter === -1) {
      alert("GAME OVER!!!")
    }
  },[counter])
  return (
    <div>
      <div className={styles.progressBar}>
          {/* <h1 className={styles.timerText}>{counter}</h1> */}
        <div style={{
          height: "100%",
          width: `${100 - ((counter) * 100/15)}%`,
          backgroundColor: "#001F3F",
          borderRadius: 0,
          transition:"width 1s linear"
        }}>
        </div>
      </div>
    </div>
  );
 } 

export default function Home() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentPoster, setCurrentPoster] = useState("");
  const [winningChoice, setWinningChoice] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15);



  useEffect(() => {
    fetch("http://localhost:5001/movies")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const incrementIndex = () => {
    setStartIndex(prevIndex => (prevIndex + 4) % (data.length - 3));
    // Increment nextIndex when loading the next set of movies
  };


  
  const posterClicked = (index) => {
    const randomValue = Math.floor(Math.random() * 4); // Generates a random value between 0 and 3
    setCurrentPoster(`Clicked on Poster ${index}`);
    if (index  === winningChoice) {
      console.log('win');
      setWinningChoice(randomValue);
      setCurrentScore(currentScore+1);
    } else {
      setWinningChoice(randomValue);
      if(currentScore > highScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      console.log('lose')
    }
    console.log(`Clicked on Poster ${startIndex + index + 1}`);
    setClickedIndex(startIndex + index);
    incrementIndex();
    setRound(round +1);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Movie Quiz </h1>
      </div>
 
 
      <div className={styles.nav}>
        <ul>
          <li><button onClick={() => loginFunction()}>Login</button></li>
          <li><button onClick={() => newgameFunction()}>New Game</button></li>
        </ul>
      </div>
 
 
      <div>
        <ProgressBar
          maxRange={15}
        />
      </div>
 
 
      <div className={styles.scores}>
        <div className={styles.card}>
          <ul>
            <br></br>
            <p>Current Score: {currentScore} </p>
            <br></br>
            <p>High Score: {highScore} </p>
            {/* <li><p>WINNING CHOICE IS {winningChoice % 4}</p></li> */}
          </ul>
        </div>
 
 
 
 
     
      <div className={styles.posterCard}>
 
 
        <div>
          <p>{currentPoster}</p>
        </div>
 
 
        <div className={styles.moviePosters}>
          {/* Separate JavaScript objects for each poster */}
          <a href="#" onClick={() => posterClicked(0)}>
            <img src={clickedIndex === startIndex + 0 ? data[nextIndex]?.ImageURL : data[startIndex + 0]?.ImageURL} alt={`Poster ${startIndex + 1}`} />
          </a>
          <a href="#" onClick={() => posterClicked(1)}>
            <img src={clickedIndex === startIndex + 1 ? data[nextIndex]?.ImageURL : data[startIndex + 1]?.ImageURL} alt={`Poster ${startIndex + 2}`} />
          </a>
          <a href="#" onClick={() => posterClicked(2)}>
            <img src={clickedIndex === startIndex + 2 ? data[nextIndex]?.ImageURL : data[startIndex + 2]?.ImageURL} alt={`Poster ${startIndex + 3}`} />
          </a>
          <a href="#" onClick={() => posterClicked(3)}>
            <img src={clickedIndex === startIndex + 3 ? data[nextIndex]?.ImageURL : data[startIndex + 3]?.ImageURL} alt={`Poster ${startIndex + 4}`} />
          </a>
        </div>
      </div>
 
        <div className={styles.playSound}>
        <button onClick={() => {   
          var soundtrackURL = (data[winningChoice + (round * 4)]).SoundtrackURL
          console.log(soundtrackURL) 
        }}>Play Soundtrack</button>
      </div>
 
 
    </div> 
    </div>
  );
 }
 
