import styles from './BottomSheet.module.scss';
import { useState } from 'react';

type TSnapPoints = 'closed' | 'half' | 'full';
interface IBottomSheet {
  children: React.ReactNode;
  title: string;
}

const BottomSheet = ({ children, title }: IBottomSheet) => {
  const [sheetPosition, setSheetPosition] = useState<TSnapPoints>('closed');

  return (
    <div className={`${styles.bottomSheet} ${styles[sheetPosition]}`}>
      <div
        className={styles.header}
        onClick={() => {
          // TODO remove this
          /*
          Create function/hook that:
          - will adjust sheetPosition based on user interaction
            - HSBC banking app has good example of this
            - depending on how user drags sheet, it will snap to different positions
            - tapping/clicking on header will open sheet to half
          */
          if (sheetPosition === 'closed') {
            setSheetPosition('half');
          } else if (sheetPosition === 'half') {
            setSheetPosition('full');
          } else {
            setSheetPosition('closed');
          }
        }}
      >
        <div className={styles.handle} />
        <h5 className="bottom-sheet__title">{title}</h5>
      </div>
      {sheetPosition !== 'closed' && <div className="bottom-sheet__content">{children}</div>}
    </div>
  );
};

export default BottomSheet;
