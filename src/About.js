import React, { useState, useEffect } from 'react';
import AboutLineBoxTransition from './AboutLineBoxTransition';
import './About.css';

const About = () => {
  const [boxInfo, setBoxInfo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (boxInfo) {
      const timeout = setTimeout(() => setShowVideo(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setShowVideo(false);
      setShowText(false);
    }
  }, [boxInfo]);

  useEffect(() => {
    if (showVideo) {
      const timeout = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setShowText(false);
      setShowButton(false);
    }
  }, [showVideo]);

  useEffect(() => {
    if (showText) {
      const timeout = setTimeout(() => setShowButton(true), 1800); // Wait for text fade-in and a pause
      return () => clearTimeout(timeout);
    } else {
      setShowButton(false);
    }
  }, [showText]);

  return (
    <>
      {!boxInfo && <AboutLineBoxTransition onComplete={setBoxInfo} />}
      {boxInfo && (
        <>
          {/* SVG overlay remains absolutely positioned */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 2000,
            }}
          >
            <rect
              x={boxInfo.boxLeft}
              y={boxInfo.boxTop}
              width={boxInfo.boxW}
              height={boxInfo.boxH}
              stroke="#fff"
              strokeWidth={6}
              fill="none"
              rx={0}
            />
          </svg>
          <div className="about-flex-container" style={{position: 'relative', width: '100vw', height: '100vh'}}>
            {/* Absolutely positioned video always matches SVG frame */}
            <video
              src="/frame_vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: boxInfo.boxTop,
                left: boxInfo.boxLeft,
                width: boxInfo.boxW,
                height: boxInfo.boxH,
                objectFit: 'cover',
                border: 'none',
                borderRadius: 0,
                boxShadow: '0 0 24px 0 #000a',
                opacity: showVideo ? 1 : 0,
                transition: 'opacity 0.8s',
                zIndex: 2100,
              }}
            />
            {/* Text block remains in flex row for layout */}
            <div className="about-flex-row" style={{height: '100vh', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
              <div style={{width: boxInfo.boxW, minWidth: boxInfo.boxW, height: boxInfo.boxH, minHeight: boxInfo.boxH}} />
              <div
                className="about-text-block-flex"
                style={{
                  opacity: showText ? 1 : 0,
                  transition: 'opacity 0.7s',
                }}
              >
                <h2>Hello There!</h2>
                <p>My name is Anshu Sharma. I am a BE student specializing in Computer Science. I like computers, I like math and I like to learn</p>
                <button
                  className="journey-btn"
                  style={{
                    marginTop: '2.5rem',
                    opacity: showButton ? 1 : 0,
                    transition: 'opacity 0.7s',
                    pointerEvents: showButton ? 'auto' : 'none',
                  }}
                >
                  Accomplishments
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default About;