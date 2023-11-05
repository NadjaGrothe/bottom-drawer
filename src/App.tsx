import './App.css';

import BottomSheet from './components/BottomSheet';
import Card from './components/Card';

/* //TODO:
- lazy load cards
- implement tap event on BottomSheet
- improve BottomSheet drag animation (jumps a little when dragging)
- write tests
- refactor

Bonus:
- Add additional styling (App background, Card, BottomSheet, animations)
- Write Documentation
*/

function App() {
  const noOfCards = Array.from(Array(100).keys());

  return (
    <>
      <h1>Bottom Sheet</h1>
      <BottomSheet title="1900+ homes available in Orlando">
        <div className='bottomSheet-content'>
          {noOfCards.map(card => (
            <Card key={card} />
          ))}
        </div>
      </BottomSheet>
    </>
  );
}

export default App;
