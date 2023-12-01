'use client'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './page.module.css';
import ReactPlayer from 'react-player';
import YoutubeEmbed from "./soundtrack.js";



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

function soundtrack() {
    (<div className="App">
      <h1>Youtube Embed</h1>
      <YoutubeEmbed embedId="rokGy0huYEA" />
    </div>);
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
  const [soundtrackURL, setSoundtrackURL] = useState("");



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
    setTimeRemaining(15);
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

      <soundtrack />

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
          maxRange={timeRemaining}
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
          setSoundtrackURL("https://www.youtube.com/watch?v=ghxzLw2wRis");
          setTimeout(() => {
            setSoundtrackURL(""); // Clear the soundtrack URL after 15 seconds
          }, 15000); // 15 seconds in milliseconds
          }}>Play Soundtrack</button>
          
          <br></br>
          
        {/* <div className={styles.overlay}> */}

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
                setSoundtrackURL(""); // Clear the soundtrack URL to stop playback
              }}
              onStart={() => {
                console.log('hello');
              }}
            />
          )}
        {/* </div> */}

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
 
{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/ghxzLw2wRis?si=nmy2twG6LTckadLl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}