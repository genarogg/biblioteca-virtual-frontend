import { useState } from "react";

import { Icono } from "@nano";

interface SelectProps {
  data: any[];
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  icono?: React.ReactNode;
  value: string | number | boolean;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content?: boolean;
}

const Select: React.FC<SelectProps> = ({
  data,
  name,
  id,
  placeholder,
  required = true,
  icono,
  value,
  valueChange,
  content = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(content);

  const handleInputChange = (event: any) => {
    setHasContent(event.target.value !== "");
    valueChange(event);
  };

  return (
    <div className={`container-input ${isFocused ? "focus" : ""}`} {...props}>
      <label htmlFor={id}>
        <Icono icono={icono} />
      </label>
      <select
        name={name}
        required={required}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        value={value as string | number | readonly string[] | undefined}
      >
        <option value="" id=""></option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      <span className={`holder ${hasContent ? "has-content" : ""}`}>
        {placeholder}
      </span>
    </div>
  );
};

export default Select;
