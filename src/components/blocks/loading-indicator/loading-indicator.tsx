import React, { useEffect, useState } from "react";

const DOTS_COUNT = 3;
const DOTS_INTERVAL_MS = 1000 / 6;

const useDots = (dotsCount: number, interval: number) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count === dotsCount ? 1 : count + 1);
    }, interval);
    return () => {
      clearTimeout(timeout);
    };
  }, [count, setCount, dotsCount, interval]);

  let dots = "";
  for (let i = 0; i < count; i += 1) {
    dots += ".";
  }
  return dots;
};

export default (): React.ReactElement => {
  const dots = useDots(DOTS_COUNT, DOTS_INTERVAL_MS);
  return <span> {dots} </span>;
};
