// * Definitions
// - swipe: a quick, short movement in a single direction
// - drag: a slow, long movement in a single direction

/* TODO: DELETE THIS FILE

  - [ ] add support for drag events
  - [ ] consider adding a threshold for swipe events
  - [ ] refactor

*/

import { useState } from 'react';

export type Direction = 'up' | 'down' | null;

const useGesture = () => {
  const [direction, setDirection] = useState<Direction | null>(null);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartPosition(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentPosition(e.touches[0].clientY);
    if (startPosition && currentPosition) {
      const distance = currentPosition - startPosition;
      const direction = distance > 0 ? 'down' : 'up';
      setDirection(direction);
    }
  };

  const handleTouchEnd = () => {
    setStartPosition(null);
    setCurrentPosition(null);
    setDirection(null);
  };

  return {
    direction,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  };
};

export default useGesture;
