import React, { createContext, useContext } from 'react';

const LevelContext = createContext(0);

export const useLevel = () => useContext(LevelContext);

const Nested: React.FC<{}> = ({ children }) => {
  const level = useLevel();
  return (
    <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
  );
};

export default Nested;
