/* Functionality:

  - swipe events will trigger the snapPoints to move to the next one in the direction of the swipe (i.e. closed -> half -> full)
  - drag events 
    - allow the user to move the sheet to a specific snapPoint, based on the position of the sheet when the drag event ends
    - sheet should snap to the closest snapPoint or based on defined thresholds (i.e. if the sheet is dragged in the bottom 25% of the screen, it should snap to the closed position, above 60% it should snap to the full position, and between 25% and 60% it should snap to the half position) // TODO: decide on functionality - HSBC app seems to have defined thresholds
    - sheet will have to move with the user's finger
  - tap events // TODO: decide on functionality - Could go between closed and half only, or closed and full, or cycle through all three positions

*/

import { useEffect, useState } from 'react';

import styles from './BottomSheet.module.scss';
import useGesture from '../hooks/useGesture';

type TSnapPoints = 'closed' | 'half' | 'full';
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
  const [sheetPosition, setSheetPosition] = useState<TSnapPoints>('closed');
  const { handleTouchStart, handleTouchMove, handleTouchEnd, direction } = useGesture();

  useEffect(() => {
    if (direction === 'up') {
      if (sheetPosition === 'closed') {
        setSheetPosition('half');
      } else if (sheetPosition === 'half') {
        setSheetPosition('full');
      }
    } else if (direction === 'down') {
      if (sheetPosition === 'full') {
        setSheetPosition('half');
      } else setSheetPosition('closed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return (
    <div
      className={`${styles.bottomSheet} ${styles[sheetPosition]}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.header}>
        <div className={styles.handle} />
        <h2>{title}</h2>
      </div>
      {sheetPosition !== 'closed' && <div className="bottom-sheet__content">{children}</div>}
    </div>
  );
};

export default BottomSheet;
