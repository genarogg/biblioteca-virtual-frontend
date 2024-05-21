import React, { useState } from "react";

import { Icono } from "@nano";
interface InputFileProps {
  
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  icono?: React.ReactNode;
  value: string | number | boolean;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  
  name,
  id = name,
  placeholder,
  required = true,
  icono,
  value,
  valueChange,
  content = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(content);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(event.target.value !== "");
    valueChange(event);
  };

  return (
    <div className={`container-input ${isFocused ? "focus" : ""}`}>
      <label htmlFor={`#${id}`}>
        <Icono icono={icono} />
      </label>

      <input
        type="file"
        name={name}
        required={required}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        value={value as string | number | readonly string[] | undefined}
      />
      <span className={`holder ${hasContent ? "has-content" : ""}`}>
        {placeholder}
      </span>
    </div>
  );
};

export default InputFile;
