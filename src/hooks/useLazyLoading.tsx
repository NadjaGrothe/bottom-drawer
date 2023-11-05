import { useCallback, useRef, useState } from 'react';

const useLazyLoading = (maxCards: number, batchSize: number, delay: number) => {
  const [cards, setCards] = useState(Array.from(Array(batchSize).keys()));
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreCards = useCallback(() => {
    if (cards.length >= maxCards) return;

    setIsLoading(true);
    setTimeout(() => {
      if (cards.length < maxCards) {
        setCards(prevCards => [...prevCards, ...Array.from(Array(batchSize).keys())]);
      }
      setIsLoading(false);
    }, delay);
  }, [cards.length, maxCards, batchSize, delay]);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreCards();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, loadMoreCards],
  );

  return {
    cards,
    isLoading,
    lastCardRef,
  };
};

export default useLazyLoading;
