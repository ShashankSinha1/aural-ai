"use client"
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const totalTime = 120; // Total time in seconds (2 minutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prevSeconds) => {
        if (prevSeconds >= totalTime) {
          clearInterval(interval);
          return prevSeconds;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percentage = (secondsElapsed / totalTime) * 100;

  return (
    <div className="w-full bg-gray-200 h-6">
      <div
        className="bg-green-500 h-6 text-white text-center transition-all duration-1000 ease-linear"
        style={{ width: `${percentage}%` }}
      >
        {Math.floor(percentage)}%
      </div>
    </div>
  );
};

export default Timer;