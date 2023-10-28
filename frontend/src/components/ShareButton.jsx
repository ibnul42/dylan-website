import React from 'react';

const ShareButton = () => {
  const handleClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share via',
          text: 'Check out this awesome website!',
          url: window.location.href,
        });
        console.log('Shared successfully');
      } else {
        console.log('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button onClick={handleClick}>Share</button>
  );
};

export default ShareButton;
