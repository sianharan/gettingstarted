import { useMemo, useRef, useState } from 'react'
import JokeCard from './components/JokeCard'
import { jokes } from './data/jokes'
import { useLikes } from './hooks/useLikes'
import './App.css'

function App() {
  const [currentId, setCurrentId] = useState<number>(jokes[0].id)
  const [showPunchline, setShowPunchline] = useState(false)
  const [viewedCount, setViewedCount] = useState(1)
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null)
  const toastTimerRef = useRef<number | null>(null)
  const { likes, addLike } = useLikes()

  const currentJoke = useMemo(
    () => jokes.find(j => j.id === currentId) ?? jokes[0],
    [currentId],
  )

  const handleNext = () => {
    const pool = jokes.filter(j => j.id !== currentId)
    const next = pool[Math.floor(Math.random() * pool.length)]
    setCurrentId(next.id)
    setShowPunchline(false)
    setViewedCount(v => v + 1)
  }

  const handleReveal = () => setShowPunchline(true)

  const showToast = (message: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }
    setCopiedMessage(message)
    toastTimerRef.current = window.setTimeout(() => {
      setCopiedMessage(null)
      toastTimerRef.current = null
    }, 1500)
  }

  const handleCopy = async () => {
    const text = `${currentJoke.setup}\n${currentJoke.punchline}`
    try {
      await navigator.clipboard.writeText(text)
      showToast('복사됐어요!')
    } catch {
      showToast('복사 실패')
    }
  }

  const handleLike = () => addLike(currentJoke.id)

  return (
    <main className="layout">
      <header className="topbar">
        <h1 className="title">오늘의 아재개그</h1>
        <p className="counter" aria-live="polite">
          오늘 본 개그 <strong>{viewedCount}</strong>개
        </p>
      </header>

      <JokeCard
        key={currentJoke.id}
        joke={currentJoke}
        showPunchline={showPunchline}
        likeCount={likes[currentJoke.id] ?? 0}
        copiedMessage={copiedMessage}
        onReveal={handleReveal}
        onNext={handleNext}
        onCopy={handleCopy}
        onLike={handleLike}
      />

      <footer className="hint">
        총 {jokes.length}개의 개그가 준비되어 있어요
      </footer>
    </main>
  )
}

export default App
