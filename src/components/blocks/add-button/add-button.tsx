import { FocusableSpan } from "components/styled";
import React, { useCallback } from "react";

type OwnProps = {
  onClick: () => void;
};

export default ({ onClick }: OwnProps): React.ReactElement => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <FocusableSpan role="button" tabIndex={0} onClick={handleClick}>
      + entry
    </FocusableSpan>
  );
};
