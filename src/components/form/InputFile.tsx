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
  const [fileName, setFileName] = useState<String>(""); // [1
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
      valueChange(formattedFile); // Si file.name existe, cambia el estado setHasContent a true
      if (file.name) {
        setHasContent(true);
        setFileName(file.name);
      }
    } else {
      // Si no hay archivo seleccionado, cambia el estado setHasContent a false
      setHasContent(false);
      setFileName("");
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
        accept=".pdf"
        id={id}
        ref={fileInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <label htmlFor={id} className="custom-file-upload">
        {fileName}
      </label>

      <span className={`holder ${hasContent ? "has-content" : ""}`}>
        <label htmlFor={id} className="file">
          {placeholder}
        </label>
      </span>
    </div>
  );
};

export default Input;
