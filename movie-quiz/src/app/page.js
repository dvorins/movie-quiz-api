import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
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
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 1" />
          </a>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 2" />
          </a>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 3" />
          </a>
          <a href="#" onClick="myFunction()">
            <img src="https://via.placeholder.com/150" alt="Poster 4" />
          </a>
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
