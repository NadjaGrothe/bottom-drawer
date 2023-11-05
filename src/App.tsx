import './App.css';

import { useCallback, useRef, useState } from 'react';

import BottomSheet from './components/BottomSheet';
import Card from './components/Card';

/* //TODO:
- implement tap event on BottomSheet
- improve BottomSheet drag animation (jumps a little when dragging)
- write tests
- refactor

Bonus:
- Add additional styling (App background, Card, BottomSheet, animations)
- Write Documentation
*/

function App() {
  // * Logic to simulate lazy loading
  const [cards, setCards] = useState(Array.from(Array(5).keys()));
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          setTimeout(() => {
            if (cards.length < 100) {
              setCards(prevCards => [...prevCards, ...Array.from(Array(5).keys())]);
            }
            setIsLoading(false);
          }, 1000);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, cards.length],
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
          {isLoading && <div className="loading">Loading...</div>}
        </div>
      </BottomSheet>
    </>
  );
}

export default App;
