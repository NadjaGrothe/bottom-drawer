import { useCallback, useState } from 'react';

const DRAG_THRESHOLD = 0.5;
const CLOSED_THRESHOLD = 25;
const FULL_THRESHOLD = 60;

export enum Position {
  CLOSED = 'closed',
  HALF = 'half',
  FULL = 'full',
}

export type TFinalPosition = Position | null;

const useBottomSheetGestures = (headerHeight: number) => {
  const [startPosition, setStartPosition] = useState<number | null>(null);

  const headerHeightPercentage = headerHeight ? (headerHeight / window.innerHeight) * 100 : 0;

  const [touchLocationPercentage, setTouchLocationPercentage] = useState<number>(headerHeight);
  const [finalPosition, setFinalPosition] = useState<TFinalPosition>(Position.CLOSED);

  // * helper functions
  const calculateScreenSection = useCallback(
    (currentPosition: number, headerHeightPercentage: number) => {
      let currentScreenSection =
        ((window.innerHeight - currentPosition) / window.innerHeight) * 100;
      currentScreenSection = Math.min(Math.max(currentScreenSection, headerHeightPercentage), 100);
      return currentScreenSection;
    },
    [],
  );

  const updatePosition = useCallback(
    (e: React.TouchEvent) => {
      const _currentPosition = e.touches[0].clientY;
      setFinalPosition(null);
      const currentScreenSection = calculateScreenSection(_currentPosition, headerHeightPercentage);
      setTouchLocationPercentage(currentScreenSection);
    },
    [calculateScreenSection, headerHeightPercentage],
  );

  const calculateFinalPosition = useCallback((touchLocationPercentage: number) => {
    return touchLocationPercentage <= CLOSED_THRESHOLD
      ? Position.CLOSED
      : touchLocationPercentage > FULL_THRESHOLD
      ? Position.FULL
      : Position.HALF;
  }, []);

  // * touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartPosition(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (startPosition && Math.abs(e.touches[0].clientY - startPosition) > DRAG_THRESHOLD) {
        updatePosition(e);
      }
    },
    [updatePosition, startPosition],
  );

  const handleTouchEnd = () => {
    const finalPosition = calculateFinalPosition(touchLocationPercentage);
    setFinalPosition(finalPosition);
  };

  const handleClick = useCallback(() => {
    setTouchLocationPercentage(0);
    setFinalPosition(finalPosition === Position.CLOSED ? Position.HALF : Position.CLOSED);
  }, [finalPosition]);

  return {
    handleClick,
    touchLocationPercentage,
    finalPosition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useBottomSheetGestures;
