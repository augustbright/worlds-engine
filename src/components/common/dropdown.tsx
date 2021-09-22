import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  content: React.ReactNode;
  visible: boolean;
  className?: string;
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const ContentContainer = styled.div`
  position: absolute;
  background: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_BACKGROUND])};
  min-width: 100%;
  box-shadow: 0px 0px 5px black;
  max-height: 180px;
  overflow-y: auto;
`;

export const Dropdown = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(({ content, children, visible, className }, ref) => {
  return (
    <Wrapper ref={ref} className={className}>
      {children}
      {visible ? <ContentContainer>{content}</ContentContainer> : null}
    </Wrapper>
  );
});
