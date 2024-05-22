import React, { useState } from "react";

import { Icono } from "@nano";
interface InputFileProps {
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  icono?: React.ReactNode;
  valueChange: (file: File) => void;
  content?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  name,
  id = name,
  placeholder,
  required = true,
  icono,

  valueChange,
  content = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(content);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target;

    if (file.files) {
      console.log(file.files[0]);
      /* setHasContent(event.target.value !== ""); */
  
      valueChange(file.files[0]);
    }
  };

  return (
    <div className={`container-input ${isFocused ? "focus" : ""}`}>
      <label htmlFor={`#${id}`}>
        <Icono icono={icono} />
      </label>
      {/* <label htmlFor="file-upload" className="file-label">
        Subir archivo PDF
      </label> */}
      {/* <input id="file-upload" type="file" accept="application/pdf" /> */}
      <input
        type="file"
        name={name}
        required={required}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
      />
      <span className={`holder ${hasContent ? "has-content" : ""}`}>
        {placeholder}
      </span>
    </div>
  );
};

export default InputFile;
