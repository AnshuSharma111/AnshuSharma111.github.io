


import './App.css';
import React, { useState } from 'react';

import ButtonLineTransition from './ButtonLineTransition';
import About from './About';


function App() {
  const [showLine, setShowLine] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);

  const handleJourneyClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setButtonRect(rect);
    setShowLine(true);
  };

  const handleLineComplete = () => {
    setShowAbout(true);
    setShowLine(false);
  };

  return (
    <div className="App">
      <video autoPlay loop muted className="bg-video">
        <source src="/starry-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!showAbout && (
        <div className="center-content">
          <button className="journey-btn" onClick={handleJourneyClick}>My Journey</button>
        </div>
      )}
      {showLine && (
        <ButtonLineTransition buttonRect={buttonRect} onComplete={handleLineComplete} />
      )}
      {showAbout && <About />}
    </div>
  );
}

export default App;
