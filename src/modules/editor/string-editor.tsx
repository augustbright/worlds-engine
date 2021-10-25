import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "modules/common/components/icon-button";
import { StyledInput } from "modules/common/components/input";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

const ViewContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export const StringEditor: React.FC<Props> = ({
  value,
  onChange,
  children,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    inputRef.current?.select();
  }, []);

  const handleClickView = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const handleClickCheck = useCallback(() => {
    setActive(false);
    onChange(text);
  }, [setActive, onChange, text]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleClickCheck();
      }
    },
    [handleClickCheck]
  );

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  const activeContent = (
    <>
      <StyledInput
        onFocus={handleFocus}
        ref={inputRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton icon={faCheck} size="sm" onClick={handleClickCheck} />
    </>
  );

  return active ? (
    activeContent
  ) : (
    <ViewContainer onClick={handleClickView}>{children}</ViewContainer>
  );
};
