import type { Joke } from '../data/jokes'
import styles from './JokeCard.module.css'

type Props = {
  joke: Joke
  showPunchline: boolean
  likeCount: number
  copiedMessage: string | null
  onReveal: () => void
  onNext: () => void
  onCopy: () => void
  onLike: () => void
}

function JokeCard({
  joke,
  showPunchline,
  likeCount,
  copiedMessage,
  onReveal,
  onNext,
  onCopy,
  onLike,
}: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <p className={styles.setup}>{joke.setup}</p>
        <div
          className={
            showPunchline
              ? `${styles.punchlineWrap} ${styles.revealed}`
              : styles.punchlineWrap
          }
          aria-hidden={!showPunchline}
        >
          <p className={styles.punchline}>{joke.punchline}</p>
        </div>
      </div>

      <div className={styles.actions}>
        {!showPunchline ? (
          <button type="button" className={styles.primary} onClick={onReveal}>
            정답 보기
          </button>
        ) : (
          <button type="button" className={styles.primary} onClick={onNext}>
            다음 개그
          </button>
        )}

        <div className={styles.secondary}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onCopy}
            aria-label="개그 복사"
          >
            <span aria-hidden="true">📋</span> 복사
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onLike}
            aria-label={`좋아요 ${likeCount}개`}
          >
            <span aria-hidden="true">❤️</span> {likeCount}
          </button>
        </div>

        {copiedMessage !== null && (
          <span className={styles.toast} role="status">
            {copiedMessage}
          </span>
        )}
      </div>
    </article>
  )
}

export default JokeCard
