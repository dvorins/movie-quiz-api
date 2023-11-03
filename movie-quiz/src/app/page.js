import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.Home}>
        <p>
          <strong>Movie Quiz</strong>
        </p>
      </div>
      <div className={styles.description.center}>
        <p>
          New Game
        </p>
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
      </div>

      <div className={styles.grid}>
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
        {/* <div className={styles.card}>
          Sound 2
        </div>
        <div className={styles.card}>
          Sound 3
        </div>
        <div className={styles.card}>
          Sound 4
        </div> */}
      </div>
    </main>
  )
}
