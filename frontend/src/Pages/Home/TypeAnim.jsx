import { useState, useEffect } from 'react';

export default function TypeAnim({ texts }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let intervalId;

    const typeNextLetter = () => {
      if (isTyping) {
        setCurrentText((prevText) => prevText + texts[currentTextIndex][currentIndex]);
        currentIndex++;
      } else {
        setCurrentText((prevText) => prevText.slice(0, -1));
        currentIndex--;
      }

      if (currentIndex === texts[currentTextIndex].length) {
        clearInterval(intervalId);
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          intervalId = setInterval(typeNextLetter, 50);
        }, 1000);
      } else if (currentIndex === 0 && !isTyping) {
        clearInterval(intervalId);
        setIsTyping(true);
        setCurrentText('');
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTimeout(() => {
          intervalId = setInterval(typeNextLetter, 50);
        }, 1000);
      }
    };

    intervalId = setInterval(typeNextLetter, 50);

    return () => clearInterval(intervalId);
  }, [currentTextIndex, isTyping, texts]);

  return <span>{currentText}</span>;
}
