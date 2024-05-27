import { useState } from "react";

import dynamic from "next/dynamic";

const ReactQuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

interface TextAreaEnriquecidoProps {
  id?: string;
  placeholder: string;

  value: any;
  valueChange: (value: string) => void; // Cambia la firma para aceptar una cadena
  content?: boolean;
}

const TextAreaEnriquecido: React.FC<TextAreaEnriquecidoProps> = ({
  id,
  placeholder,
  value,
  valueChange,
  content = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  /* const [hasContent, setHasContent] = useState(content); */

  const handleInputChange = (event: any) => {
    /* setHasContent(event.target.value !== ""); */
    valueChange(event);
  };

  return (
    <>
      <div
        className={`container-input textarea enriquecido ${
          isFocused ? "focus" : ""
        }`}
        {...props}
      >
        <ReactQuillNoSSRWrapper
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          theme="snow"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {/*  <span className={`holder ${hasContent ? "has-content" : ""}`}>
          {placeholder}
        </span> */}
      </div>
    </>
  );
};

export default TextAreaEnriquecido;
