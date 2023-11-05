/* Functionality:
    - user can move the sheet to a specific snapPoint, based on the position of the sheet when the drag event ends
    - sheet will snap to the snapPoint defined by these thresholds 
        - bottom 25% of the screen: closed
        - between 25% and 60% of the screen: half
        - above 60% of the screen: full
  - tap events // TODO: decide on functionality - Could go between closed and half only, or closed and full, or cycle through all three positions

*/

import { useEffect, useRef, useState } from 'react';

import styles from './BottomSheet.module.scss';
import useBottomSheetDrag from '../hooks/useBottomSheetDrag';

interface IBottomSheet {
  children: React.ReactNode;
  title: string;
}

/* TODO:

  - [ ] add support for tap events
  - [ ] refactor

*/

const BottomSheet = ({ children, title }: IBottomSheet) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  // used to assure we have a headerHeight value before we start using it in `useBottomSheetDrag`
  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight || 0);
  }, []);

  const { screenSection, finalPosition, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useBottomSheetDrag(headerHeight);
  const [transformValue, setTransformValue] = useState<string>('');

  useEffect(() => {
    switch (finalPosition) {
      case 'closed':
        setTransformValue('93%');
        break;
      case 'half':
        setTransformValue('50%');
        break;
      case 'full':
        setTransformValue('0');
        break;
      default:
        setTransformValue(`${100 - screenSection}%`);
        break;
    }
  }, [finalPosition, screenSection]);

  const bottomSheetStyle = {
    transform: `translateY(${transformValue})`,
    transition: 'transform 0.05s ease-out',
    borderTopLeftRadius: finalPosition === 'full' ? '0' : '2.5rem',
    borderTopRightRadius: finalPosition === 'full' ? '0' : '2.5rem',
  };

  return (
    <div
      className={styles.bottomSheet}
      style={bottomSheetStyle}
    >
      <div
        className={styles.header}
        ref={headerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.handle} />
        <h2>{title}</h2>
      </div>
      {finalPosition !== 'closed' && (
        // divide by 10 to convert px to rem (1rem = 10px)
        <div className={styles.content} style={{ height: `calc(100% - ${headerHeight /10}rem)` }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
