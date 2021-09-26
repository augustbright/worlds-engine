import React from "react";
import ReactLoading, { LoadingProps } from "react-loading";
import styled from "styled-components";

type Props = LoadingProps;

const StyledLoader = styled(ReactLoading)`
  display: inline-block;
  vertical-align: middle;
`;

export const Loader: React.FC<Props> = (props) => (
  <StyledLoader type="spokes" width={16} height={16} {...props} />
);
