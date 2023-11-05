/* Functionality:
    - user can move the sheet to a specific snapPoint, based on the position of the sheet when the drag event ends
    - sheet will snap to the snapPoint defined by these thresholds 
        - bottom 25% of the screen: closed
        - between 25% and 60% of the screen: half
        - above 60% of the screen: full
  - tapping on the header will open the sheet half way if it's closed or else close it
*/

import useBottomSheetGestures, { Position } from '../hooks/useBottomSheetGestures';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './BottomSheet.module.scss';

interface IBottomSheet {
  children: React.ReactNode;
  title: string;
}

const BottomSheet = ({ children, title }: IBottomSheet) => {
  const [transformValue, setTransformValue] = useState<string>('');

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  // used to assure we have a headerHeight value before we start using it in `useBottomSheetDrag`
  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight ?? 0);
  }, []);

  const {
    finalPosition,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    touchLocationPercentage,
    handleClick,
  } = useBottomSheetGestures(headerHeight);

  const updateTransformValue = useCallback(
    (touchLocationPercentage: number) => {
      switch (finalPosition) {
        case Position.CLOSED:
          setTransformValue('93%');
          break;
        case Position.HALF:
          setTransformValue('100%');
          break;
        case Position.FULL:
          setTransformValue('0');
          break;
        default:
          setTransformValue(`${100 - touchLocationPercentage}%`);
          break;
      }
    },
    [finalPosition],
  );

  useEffect(() => {
    updateTransformValue(touchLocationPercentage);
  }, [finalPosition, touchLocationPercentage, updateTransformValue]);

  const bottomSheetStyle = {
    // TODO: the bottom sheet jumps around the half position
    height: finalPosition === Position.HALF ? '50%' : '100%',
    transform: `translateY(${transformValue})`,
    borderTopLeftRadius: finalPosition === Position.FULL ? '0' : '2.5rem',
    borderTopRightRadius: finalPosition === Position.FULL ? '0' : '2.5rem',
  };

  return (
    <div className={styles.bottomSheet} style={bottomSheetStyle}>
      <div
        className={styles.header}
        ref={headerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <div className={styles.handle} />
        <h2>{title}</h2>
      </div>
      {finalPosition !== Position.CLOSED && (
        // divide by 10 to convert px to rem (1rem = 10px)
        <div className={styles.content} style={{ height: `calc(100% - ${headerHeight / 10}rem)` }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
