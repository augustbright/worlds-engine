import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle as faTimesCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";

type OwnProps = {
  onClick: () => void;
};

const Span = styled.span`
  position: relative;
`;

const Button = styled.button`
  background: transparent;
  color: ${fromThemeProp((theme) => theme.colors[Color.TEXT_PRIMARY])};
  border: none;
  border-radius: 8px;
  width: 16px;
  margin-right: 4px;
  cursor: pointer;
  position: absolute;
  left: -20px;
  top: 2px;
`;

export default ({ onClick }: OwnProps): React.ReactElement => {
  const [hover, setHover] = useState(false);
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, [setHover]);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, [setHover]);

  return (
    <Span>
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hover ? (
          <FontAwesomeIcon size="sm" icon={faTimesCircleSolid} />
        ) : (
          <FontAwesomeIcon size="sm" icon={faTimesCircle} />
        )}
      </Button>
    </Span>
  );
};
