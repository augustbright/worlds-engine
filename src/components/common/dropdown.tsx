import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  content: React.ReactNode;
  visible: boolean;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement>;
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
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.DROPDOWN_BORDER])};
  scroll-behavior: smooth;
`;

export const Dropdown = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(({ content, children, visible, className, contentRef }, ref) => {
  return (
    <Wrapper ref={ref} className={className}>
      {children}
      {visible ? (
        <ContentContainer ref={contentRef}>{content}</ContentContainer>
      ) : null}
    </Wrapper>
  );
});
