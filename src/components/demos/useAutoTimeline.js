import { useState, useEffect, useRef, useCallback } from 'react'

// Drives a looping clock from 0 to `duration` ms, advancing every `tick` ms
// while playing. Used to script "recording-style" demos so nothing depends
// on live user input or fake data that could visibly break.
export default function useAutoTimeline(duration, tick = 100) {
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!playing) return undefined
    intervalRef.current = setInterval(() => {
      setElapsed((e) => (e + tick >= duration ? 0 : e + tick))
    }, tick)
    return () => clearInterval(intervalRef.current)
  }, [playing, duration, tick])

  const toggle = useCallback(() => setPlaying((p) => !p), [])
  const restart = useCallback(() => {
    setElapsed(0)
    setPlaying(true)
  }, [])

  return { elapsed, playing, toggle, restart, progress: (elapsed / duration) * 100 }
}
