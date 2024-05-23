import { useState } from "react";

interface TextAreaProps {
  name: string;
  id?: string;
  placeholder: string;
  required?: boolean;
 
  value: string | number | boolean;
  valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  content?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  id,
  placeholder,
  required = true,

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
    <div className={`container-input textarea ${isFocused ? "focus" : ""}`} {...props}>
      <textarea
        name={name}
        required={required}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        value={value as string | number | readonly string[] | undefined}
        style={{ resize: 'none' }}
      ></textarea>
      <span className={`holder ${hasContent ? "has-content" : ""}`}>
        {placeholder}
      </span>
    </div>
  );
};

export default TextArea;
