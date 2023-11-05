import { useState } from 'react';

export type TFinalPosition = 'closed' | 'half' | 'full' | null;

const useBottomSheetDrag = (headerHeight: number) => {
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);

  const headerHeightPercentage = headerHeight ? (headerHeight / window.innerHeight) * 100 : 0;

  const [screenSection, setScreenSection] = useState<number>(headerHeight);
  const [finalPosition, setFinalPosition] = useState<TFinalPosition>('closed');

  const handleTouchStart = (e: React.TouchEvent) => {
    setCurrentPosition(e.touches[0].clientY);
    setFinalPosition(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentPosition(e.touches[0].clientY);
    if (currentPosition) {
      let currentScreenSection =
        ((window.innerHeight - currentPosition) / window.innerHeight) * 100;
      if (currentScreenSection > 100) {
        currentScreenSection = 100;
      } else if (currentScreenSection < headerHeightPercentage) {
        currentScreenSection = headerHeightPercentage;
      }
      setScreenSection(currentScreenSection);
    }
  };

  const handleTouchEnd = () => {
    if (screenSection <= 25) {
      setFinalPosition('closed');
    } else if (screenSection > 60) {
      setFinalPosition('full');
    } else {
      setFinalPosition('half');
    }
  };


  return {
    screenSection,
    finalPosition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useBottomSheetDrag;
