'use client'
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [videoId, setVideoId] = useState('PYI09PMNazw'); // YouTube video ID


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

  const soundtrackFunction = (youtubeUrl) => {
    console.log(youtubeUrl);
    const iframe = document.getElementById('youtubePlayer');
    const videoId = extractVideoId(youtubeUrl);
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    setTimeout(() => {
      iframe.src = '';
    }, 15000);
  };
  
  // Function to extract video ID from YouTube URL
  const extractVideoId = (url) => {
    // Example YouTube URLs: https://www.youtube.com/watch?v=PYI09PMNazw or https://youtu.be/PYI09PMNazw
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
  
    return match && match[1];
  };
  

  const posterClicked = (index) => {
    console.log(`Clicked on Poster ${startIndex + index + 1}`);
    setClickedIndex(startIndex + index);
    incrementIndex();
    setCurrentScore(currentScore + 1)
    // Update nextIndex to load the next movie in place of the clicked one
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Movie Quiz</h1>
      </div>

      <div className={styles.nav}>
        <ul>
          <li><button onClick={() => loginFunction()}>Login</button></li>
          <li><button onClick={() => newgameFunction()}>New Game</button></li>
        </ul>
      </div>

      <div className={styles.main}>
        <div className={styles.playerScores}>
          <ul>
            <li><p>Current Score: {currentScore} </p> <a href="#"> </a></li>
            <li><p>High Score: {highScore} </p><a href="#"> </a></li>
          </ul>
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


  <div className={styles.playSound}>
        <button onClick={() =>  
          soundtrackFunction(data[1].SoundtrackURL)}>Play Soundtrack</button>
      </div>

      {/* YouTube video player */}
      <iframe
        id="youtubePlayer"
        width="1"
        height="1"
        src=""
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>  



 
    </div>
  );
}
