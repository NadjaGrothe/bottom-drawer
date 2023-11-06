import './App.css';

import BottomSheet from './components/BottomSheet';
import Card from './components/Card';
import useLazyLoading from './hooks/useLazyLoading';

const CARD_BATCH_SIZE = 5;
const MAX_CARDS = 100;
const LOAD_DELAY_MS = 1000;

function App() {
  const { cards, isLoading, lastCardRef } = useLazyLoading(
    MAX_CARDS,
    CARD_BATCH_SIZE,
    LOAD_DELAY_MS,
  );

  return (
    <>
      <h1>Bottom Sheet</h1>
      <BottomSheet title="1900+ homes available in Orlando">
        <div className="bottomSheet-content">
          {cards.map((card, index) => {
            if (cards.length === index + 1) {
              return <Card key={card} ref={lastCardRef} />;
            } else {
              return <Card key={card} />;
            }
          })}
          {isLoading && <div>Loading...</div>}
        </div>
      </BottomSheet>
    </>
  );
}

export default App;
