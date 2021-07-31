import React from "react";

export type BracketsType = "CURLY" | "SQUARE" | "ANGLED" | "ROUND";

export type WithBracketsProps = {
  start: React.ReactElement;
  end: React.ReactElement;
};

type InjectedProps = {
  bracketsType: BracketsType;
};

const brackets: Record<BracketsType, { start: string; end: string }> = {
  ANGLED: {
    start: "<",
    end: ">",
  },
  CURLY: {
    start: "{",
    end: "}",
  },
  ROUND: {
    start: "(",
    end: ")",
  },
  SQUARE: {
    start: "[",
    end: "]",
  },
};

type FC<P> = (props: P) => React.ReactElement;

type NewProps<P> = Omit<P, keyof WithBracketsProps> & InjectedProps;

const WithBrackets =
  () =>
  <T extends WithBracketsProps>(Wrapped: FC<T>): FC<NewProps<T>> => {
    const ComponentWithBrackets: FC<NewProps<T>> = ({
      bracketsType,
      ...rest
    }) => {
      return (
        <Wrapped
          {...(rest as unknown as T)}
          start={<span>{brackets[bracketsType].start}</span>}
          end={<span>{brackets[bracketsType].end}</span>}
        />
      );
    };

    return ComponentWithBrackets;
  };

export default WithBrackets;
