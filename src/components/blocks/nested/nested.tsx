import React, { createContext, useContext } from "react";
import { times } from "lodash";
import styled from "styled-components";

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

const Span = styled.span`
  white-space: pre-wrap;
`;

export const Tab: React.FC = () => <Span>{"      "}</Span>;

export const Tabs: React.FC = () => {
  const currentLevel = useLevel();

  return (
    <>
      {times(currentLevel).map((i) => (
        <Tab key={i} />
      ))}
    </>
  );
};

export default Nested;
