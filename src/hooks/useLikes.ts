import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jokes:likes'

type LikesMap = Record<number, number>

function readFromStorage(): LikesMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object') return {}
    const result: LikesMap = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const id = Number(key)
      if (Number.isFinite(id) && typeof value === 'number' && value >= 0) {
        result[id] = value
      }
    }
    return result
  } catch {
    return {}
  }
}

export function useLikes() {
  const [likes, setLikes] = useState<LikesMap>(readFromStorage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(likes))
    } catch {
      // ignore quota / unavailable storage
    }
  }, [likes])

  const addLike = useCallback((id: number) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }, [])

  return { likes, addLike }
}
