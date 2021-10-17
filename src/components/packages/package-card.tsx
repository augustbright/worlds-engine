import { Clickable } from "components/common/clickable";
import { Color } from "components/theming";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Package } from "types/packages";

type Props = {
  packageDescriptor: Package;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const Container = styled(Clickable)`
  display: inline-block;
  width: 210px;
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.CARD_BORDER])};
  background: solid 1px ${fromThemeProp((t) => t.colors[Color.CARD_BACKGROUND])};
  padding: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const PackageCard: React.FC<Props> = ({
  packageDescriptor,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  const history = useHistory();
  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.call(null);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave?.call(null);
  }, [onMouseLeave]);

  const handleClick = useCallback(() => {
    history.push(`packages/${packageDescriptor._id}`);
  }, [history, packageDescriptor]);

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={className}
    >
      <div>{packageDescriptor.name}</div>
    </Container>
  );
};
