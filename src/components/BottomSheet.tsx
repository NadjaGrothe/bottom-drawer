/* Functionality:

  - swipe events will trigger the snapPoints to move to the next one in the direction of the swipe (i.e. closed -> half -> full)
  - drag events 
    - allow the user to move the sheet to a specific snapPoint, based on the position of the sheet when the drag event ends
    - sheet should snap to the closest snapPoint or based on defined thresholds (i.e. if the sheet is dragged in the bottom 25% of the screen, it should snap to the closed position, above 60% it should snap to the full position, and between 25% and 60% it should snap to the half position) // TODO: decide on functionality - HSBC app seems to have defined thresholds
    - sheet will have to move with the user's finger
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
  - [ ] add support for drag events
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={bottomSheetStyle}
    >
      <div className={styles.header} ref={headerRef}>
        <div className={styles.handle} />
        <h2>{title}</h2>
      </div>
      {finalPosition !== 'closed' && <div className="bottom-sheet__content">{children}</div>}
    </div>
  );
};

export default BottomSheet;
