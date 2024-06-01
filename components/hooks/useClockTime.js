import { useState, useEffect } from 'react'
import BackgroundTimer from 'react-native-background-timer';

export default function useClockTime() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })
  const [isPaused, setIsPaused] = useState(true)

  function getTimeNow () {
    const date = new Date()
    setTime({
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    })
  }

  function togglePause () {
    setIsPaused(!isPaused)
    getTimeNow()
  }

  useEffect(() => {
  //  BackgroundTimer.runBackgroundTimer(() => {
  //   if (!isPaused) getTimeNow()
  //  }, 1000)
  //  return () => { BackgroundTimer.stopBackgroundTimer() } 
    const interval = BackgroundTimer.setInterval(() => {
      if (!isPaused) getTimeNow()
    // should this interval be lower for more accuracy / less risk of a dropped tick?
    }, 1000)
    return () => { BackgroundTimer.clearInterval(interval) }
  })

  return { time, isPaused, togglePause }
}