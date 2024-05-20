import { useState } from "react";

import { Icono } from "@nano";

interface SelectProps {
  data: (string | number)[];
  name: string;
  icono?: React.ReactNode;
  id?: string;
}

const Select: React.FC<SelectProps> = ({ data, name, id, icono }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className={`container-input ${isFocused ? "focus" : ""}`}>
      <label htmlFor={`#${id}`}>
        <Icono icono={icono} />
      </label>
      <select name={name} id={id}>
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
