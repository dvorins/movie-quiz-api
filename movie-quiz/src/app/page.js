'use client'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './page.module.css';
import ReactPlayer from 'react-player';



 function ProgressBarTest({second}) {
  console.log("Creating bar timer for " + second);
  if (second < 15) {
    return (
      <div>
        <div className={styles.progressBar}>
            {/* <h1 className={styles.timerText}>{counter}</h1> */}
          <div style={{
            height: "100%",
            width: `${100 - ((second) * 100/15)}%`,
            backgroundColor: "#001F3F",
            borderRadius: 0,
            transition:"width 1s linear"
          }}>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.progressBar}>
            {/* <h1 className={styles.timerText}>{counter}</h1> */}
          <div style={{
            height: "100%",
            width: `${100 - ((second) * 100/15)}%`,
            backgroundColor: "#001F3F",
            borderRadius: 0,
            // transition:"width 1s linear"
          }}>
          </div>
        </div>
      </div>
    );
  }
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
  const [soundtrackURL, setSoundtrackURL] = useState("");
  const [timer, setTimer] = useState(15); // Initial timer value

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


  useEffect(() => { // For the bar timer and also controls the music to stop playing when the timer reaches 0, resets the timer when a poster is clicked
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(intervalId);
        setSoundtrackURL("");
      }
    }, 1000);
 
    // Clean up the interval on component unmount or when timer resets
    return () => {
      clearInterval(intervalId);
    };
 
  }, [timer]);
 
  const resetTimer = () => {
    setTimer(15); // Reset the timer to 15 seconds
  };
 

  
  const posterClicked = (index) => {
    const randomValue = Math.floor(Math.random() * 4); // Generates a random value between 0 and 3
    setCurrentPoster(`Clicked on Poster ${index}`);
    resetTimer();
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
        <ProgressBarTest
        second = {timer}
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

        <div className={styles.playSound}>
        <button onClick={() => {
            // Set the soundtrack URL before playing
          setSoundtrackURL((data[winningChoice + (round * 4)]).SoundtrackURL);
          setTimeout(() => {
            setSoundtrackURL(""); // Clear the soundtrack URL after 15 seconds
          }, 15000); // 15 seconds in milliseconds
          }}>Play Soundtrack</button>
          
          <br></br> 
          
          {soundtrackURL && (
            <ReactPlayer
              url={soundtrackURL}
              playing={true} // Auto-play the soundtrack
              controls={true} // Show player controls
              width={0}
              height={0}
              // muted={true}
              // autoPlay={true}
              onEnded={() => {
                // Callback when the video ends
                setSoundtrackURL(""); // Cle111ar the soundtrack URL to stop playback
              }}
              onStart={() => {
                console.log('hello');
              }}
            />
          )}

      </div>


      <div className={styles.posterCard}>
 
        {/* <div>
          <p>{currentPoster}</p>
        </div> */}
 
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

      </div>

    </div>
  );
 }
 