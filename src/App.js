// App.js

import React, { useState, useEffect } from 'react';
import logo from './img/logo.gif';
import peachcat from './img/peachcat-cat.gif';
import hugKiss from './img/hug-kiss.gif'; // Изменено имя файла
import './App.css';

function App() {
  
  const [buttonPosition, setButtonPosition] = useState({ top: '75%', left: '55%' });
  const [buttonClicked, setButtonClicked] = useState(false);
  const [noButtonClicked, setNoButtonClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [apologyTextShown, setApologyTextShown] = useState(false);
  const [reachedFifteen, setReachedFifteen] = useState(false);

  const handleRunAwayButtonClick = () => {
    const newTop = Math.random() * (window.innerHeight - 50);
    const newLeft = Math.random() * (window.innerWidth - 70);

    setButtonPosition({ top: `${newTop}px`, left: `${newLeft}px` });

    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 1) {
      setButtonClicked(true);
    } else if (clickCount === 15) {
      setButtonClicked(false);
      setReachedFifteen(true);
    }

    if (clickCount === 10) {
      setButtonClicked(true);
    }
  };

  const handleNoButtonClick = () => {
    setNoButtonClicked(true);
    setApologyTextShown(true);
  };

  const getParagraphText = () => {
    if (reachedFifteen) {
      return 'Ти це зробила, моя розумниця. Люблю тебе♥';
    } else {
      return apologyTextShown ? 'Прости, я старался♥' : buttonClicked ? 'Лови її!♥' : 'Ты будешь моей валентинкой?♥';
    }
  };

  const getImageSource = () => {
    if (noButtonClicked) {
      return peachcat;
    } else if (reachedFifteen) {
      return hugKiss;
    } else {
      return logo;
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
      }
    };

    // Initial call to set the initial class
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={getImageSource()} className="cat" alt="logo" />
        <p>{getParagraphText()}</p>
        <button
          onClick={handleRunAwayButtonClick}
          className={`move-button yes`}
          style={{ position: 'absolute', top: buttonPosition.top, left: buttonPosition.left }}
        >
          Так
        </button>
        <button
          onClick={handleNoButtonClick}
          style={{ position: 'absolute', top: '75%', left: '40%' }}
          className={`no`}
        >
          Ні
        </button>
      </header>
    </div>
  );
}

export default App;
