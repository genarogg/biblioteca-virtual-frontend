import React, { useState, useRef } from "react";
import { Icono } from "@nano";

interface InputFileProps {
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  icono: any;
  valueChange: (file: File) => void;
  content?: boolean;
}

const Input: React.FC<InputFileProps> = ({
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
  const fileInput = useRef<HTMLInputElement>(null);

  const normalizeFilename = (filename: string) => {
    const ext = filename.slice(filename.lastIndexOf("."));
    const name = filename.slice(0, filename.lastIndexOf("."));
    return (
      name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/gi, "") + ext
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const formattedFile = new File([file], normalizeFilename(file.name), {
        type: file.type,
      });
      valueChange(formattedFile);
    } else {
      /* setHasContent(event.target.value !== ""); */
      
      //@ts-ignore
      valueChange(event.target.value);
    }
  };

  return (
    <div className={`container-input ${isFocused ? "focus" : ""}`}>
      <label htmlFor={id}>
        <Icono icono={icono} />
      </label>

      <input
        type="file"
        name={name}
        required={required}
        id={id}
        ref={fileInput}
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

export default Input;
