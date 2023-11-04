import './App.css';

import BottomSheet from './components/BottomSheet';

/* //TODO:
- Create a Card component to display inside the BottomSheet
  - 50px height and any background color
- Create an Array of 100 and map over it to render 100 Cards
- Assure that the BottomSheet is scrollable
- write tests
- refactor
- Deploy & share repo

Bonus:
- Add additional styling (App background, Card, BottomSheet, animations)
- Write Documentation
*/

function App() {
  return (
    <>
      <h1>Bottom Sheet</h1>
      <BottomSheet title="1900+ homes available in Orlando">
        <p>Bottom Sheet Content</p>
      </BottomSheet>
    </>
  );
}

export default App;
