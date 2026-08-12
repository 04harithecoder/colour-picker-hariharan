import React, { useState, useEffect } from 'react';
import ParticleText from './ParticleText';
import './LoadingScreen.css';

const TOTAL_LOADING_TIME = 10; // 60 seconds (1 minute)

const LoadingScreen = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_LOADING_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const progressPercent = ((TOTAL_LOADING_TIME - timeLeft) / TOTAL_LOADING_TIME) * 100;

  return (
    <div className="loading-screen-container">
      <div style={{ width: '100%', height: 360, background: 'transparent' }}>
        <ParticleText
          text="Welcome"
          particleSize={2}
          density={5}
          color="#0f172a"
          highlightColor="#6366f1"
          scatter={180}
          gatherDuration={1600}
          stagger={420}
          pointerRepel={40}
          repelRadius={120}
          idleDrift={0.7}
          trigger="hover"
          fontSize="clamp(3rem, 12vw, 8rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </div>

      <div className="loading-footer">
        <div className="loading-progress-bar-bg">
          <div
            className="loading-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="loading-timer-badge">
          <span>Loading Studio</span>
          <span className="loading-dots">•</span>
          <span>{timeLeft}s remaining</span>
        </div>

        <button
          className="skip-button"
          onClick={onComplete}
          type="button"
          aria-label="Skip loading page"
        >
          Skip Loading ➔
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
