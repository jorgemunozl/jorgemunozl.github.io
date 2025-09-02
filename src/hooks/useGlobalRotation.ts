import { useState, useEffect } from 'react';

// Global rotation state that persists across page navigation
let globalRotation = 0;
const listeners: Set<(rotation: number) => void> = new Set();

export const useGlobalRotation = () => {
  const [rotation, setRotation] = useState(globalRotation);

  useEffect(() => {
    const updateRotation = (newRotation: number) => {
      setRotation(newRotation);
    };

    listeners.add(updateRotation);

    return () => {
      listeners.delete(updateRotation);
    };
  }, []);

  const updateGlobalRotation = (newRotation: number) => {
    globalRotation = newRotation;
    listeners.forEach(listener => listener(newRotation));
  };

  const rotateIcon = () => {
    const newRotation = globalRotation + 120;
    updateGlobalRotation(newRotation);
  };

  return { rotation, rotateIcon };
};
