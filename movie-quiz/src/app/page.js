'use client'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './page.module.css';
import ReactPlayer from 'react-player';
import Link from 'next/link'

 function ProgressBarTest({second}) {
  console.log("Creating bar timer for " + second);
  if (second < 5) {
    return (
      <div>
        <div className={styles.progressBar}>
            {/* <h1 className={styles.timerText}>{counter}</h1> */}
          <div style={{
            height: "100%",
            width: `${100 - ((second) * 100/5)}%`,
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
            width: `${100 - ((second) * 100/5)}%`,
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
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [progressBarWidth, setProgressBarWidth] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentPoster, setCurrentPoster] = useState("");
  const [winningChoice, setWinningChoice] = useState(0);
  const [soundtrackURL, setSoundtrackURL] = useState("");
  const [timer, setTimer] = useState(5); // Initial timer value
  const [isCorrectChoice, setIsCorrectChoice] = useState(null);

  
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

  const resetProgressBar = () => {
    console.log('reset')
    setProgressBarWidth(100);
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
    setTimer(5); // Reset the timer to 15 seconds
  };
 

  
  const posterClicked = (index) => {
    const randomValue = Math.floor(Math.random() * 4); // Generates a random value between 0 and 3
    setCurrentPoster(`Clicked on Poster ${index}`);
    if (index  === winningChoice) {
      setIsCorrectChoice(true);
      setWinningChoice(randomValue);
      setCurrentScore(currentScore+1);
    } else {
      setIsCorrectChoice(false);
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
          <li><Link href="/user-login"><button>Login</button></Link></li>
          <li><button onClick={() => newgameFunction()}>New Game</button></li>
        </ul>
      </div>

 
<div>
        <ProgressBarTest second={timer} width={progressBarWidth} />
      </div>


      <div className={styles.scores}>
        <div className={`${styles.card} ${isCorrectChoice === true ? styles.correct : isCorrectChoice === false ? styles.incorrect : ''}`}>
          <ul>
            <br></br>
            <p>Current Score: {currentScore} </p>
            <br></br>
            <p>High Score: {highScore} </p>
          </ul>
        </div>

        <div className={styles.playSound}>
        <button
          onClick={() => {
            setSoundtrackURL(data[winningChoice + round * 4]?.SoundtrackURL);
            setIsPlaying(true);
            resetTimer();
            resetProgressBar();

            const intervalId = setInterval(() => {
              if (progressBarWidth > 0) {
                setProgressBarWidth(prevWidth => prevWidth - (100 / 5));
              }
            }, 1000);

            setTimeout(() => {
              clearInterval(intervalId);
              setIsPlaying(false);
              setSoundtrackURL("");
            }, 5000);
          }}
        >
          Play Soundtrack
        </button>

        <br />

        {soundtrackURL && (
          <ReactPlayer
            url={soundtrackURL}
            playing={isPlaying}
            controls={true}
            width={0}
            height={0}
            onEnded={() => {
              setIsPlaying(false);
              setSoundtrackURL("");
            }}
          />
        )}

        {youtubePlayer && (
          <YouTube
            videoId="your-video-id"
            opts={{
              playerVars: {
                start: 60, // Start the video at 1 minute (60 seconds)
                end: 65, // Play the video for 5 seconds
                autoplay: 1,
              },
            }}
            onReady={event => setYoutubePlayer(event.target)}
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
 