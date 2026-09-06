import React, { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorText: '',
  cursorVariant: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  const setCursor = useCallback((variant = 'default', text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorVariant('default');
    setCursorText('');
  }, []);

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
