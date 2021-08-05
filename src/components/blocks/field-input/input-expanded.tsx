import { Input } from "components/styled";
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type OwnProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const InputExpanded: React.FC<OwnProps> = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const onChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );
  const onBlur = useCallback(() => {
    onChange(text);
  }, [onChange, text]);
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter") {
        onChange(text);
      }
    },
    [onChange, text]
  );
  const onFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={text}
      onChange={onChangeInput}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default InputExpanded;
