import React, { createContext, useContext } from "react";

const LevelContext = createContext(0);

export const useLevel = () => useContext(LevelContext);

type OwnProps = {
  level?: number;
};

const Nested: React.FC<OwnProps> = ({ children, level }) => {
  const defaultLevel = useLevel() + 1;
  const currentLevel = level === undefined ? defaultLevel : level;

  return (
    <LevelContext.Provider value={currentLevel}>
      {children}
    </LevelContext.Provider>
  );
};

export const Tabs: React.FC = () => {
  const currentLevel = useLevel();
  return (
    <>
      {new Array(currentLevel).map(() => (
        <span> </span>
      ))}
    </>
  );
};

export default Nested;
