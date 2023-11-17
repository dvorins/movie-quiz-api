'use client'

import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [data, setData] = useState([{}])
  useEffect(() => {
      fetch("http://localhost:5001/movies").then(
          res => res.json()
      ).then(
          data => {
              setData(data)
              console.log(data)
          }
      )
  }, [] )

  return (
    
    <div>

      <div className={styles.header}>
        <h1>Movie Quiz</h1>
      </div>

      <div className={styles.nav}>
        <ul>
          <li><button onClick="loginFunction()">Login</button></li>
          <li><button onClick="newgameFunction()">New Game</button></li>
        </ul>
      </div>

      <div className={styles.main}>
        <div className={styles.playerScores}>
          <ul>
            <li><p>Current Score: </p><a href="#"> </a></li>
            <li><p>High Score: </p><a href="#"> </a></li>
          </ul>
        </div>

        <div className={styles.moviePosters}>
        {data.slice(0, 1).map((movie, index) => (
            <a key={index} href="#" onClick={() => myFunction()}>
              <img src={movie.ImageURL} alt={`Poster ${index + 1}`} />
            </a>
          ))}
          {data.slice(1, 2).map((movie, index) => (
            <a key={index} href="#" onClick={() => myFunction()}>
              <img src={movie.ImageURL} alt={`Poster ${index + 1}`} />
            </a>
          ))}
          {data.slice(2, 3).map((movie, index) => (
            <a key={index} href="#" onClick={() => myFunction()}>
              <img src={movie.ImageURL} alt={`Poster ${index + 1}`} />
            </a>
          ))}
          {data.slice(3, 4).map((movie, index) => (
            <a key={index} href="#" onClick={() => myFunction()}>
              <img src={movie.ImageURL} alt={`Poster ${index + 1}`} />
            </a>
          ))}
        </div>

        <div className={styles.playSound}>
          <button onClick="soundtrackFunction()">Play Soundtrack</button>
        </div>
      </div>
    </div>
  )
}





{/* <div id="player-scores">
        <li><p>Current Score</p></li>
      </div>
    <main className={styles.main}>
      <div className={styles.Home}>
      </div>
      <div className={styles.description.center}>
        <button onClick="loginFunction()">Login</button>
      </div>

      <div className={styles.description.center}>
        <button onClick="newgameFunction()">New Game</button>
      </div>

      <div className={styles.description.center}>
        <p>
          Current Score
        </p>
      </div>

      <div className={styles.description.center}>
        <p>
          High Scores
        </p>
      </div> */}

      {/* <div className={styles.grid}>
        <div className={styles.card}>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 1" />
          </a>
        </div>
        <div className={styles.card}>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 2" />
          </a>
        </div>
        <div className={styles.card}>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 3" />
          </a>
        </div>
        <div className={styles.card}>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 4" />
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          Sound 1
        </div>
      </div>
    </main> */}
