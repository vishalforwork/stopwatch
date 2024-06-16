import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import "./style.css"

const Stopwatch = () => {
   
    const [isRunning, setIsRunning] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const intervalRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
     
      if (isRunning) {
        intervalRef.current = setInterval(()=>{
            setPassedTime(Date.now() - startTimeRef.current);
          }, 10)
      }

      return () => {
        clearInterval(intervalRef.current);
      }

    }, [isRunning])

    const start = () => {
      setIsRunning(true)
      startTimeRef.current = Date.now() - passedTime;
    }

    const stop = () => {
      setIsRunning(false)
    }

    const reset = () => {
      setPassedTime(0)
      setIsRunning(false)
    }

    const formatTime = () => {

      let hours = Math.floor(passedTime / (1000 * 60 * 60));
      let minutes = Math.floor(passedTime / (1000 * 60) % 60);
      let seconds = Math.floor(passedTime / (1000) % 60);
      let miliSeconds = Math.floor((passedTime % 1000) / 10);

      hours = String(hours).padStart(2, "0")
      minutes = String(minutes).padStart(2, "0")
      seconds = String(seconds).padStart(2, "0")
      miliSeconds = String(miliSeconds).padStart(2, "0")

      return `${hours}:${minutes}:${seconds}.${miliSeconds}`
    }
  return (
    <>
    <div className="container">
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
          <div className="controls">
            <button className="start" onClick={start}>Start</button>
            <button className="stop" onClick={stop}>Stop</button>
            <button className="reset" onClick={reset}>Reset</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default Stopwatch;