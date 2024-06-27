import { useState } from "react";

interface BtnHamburguesProps {
  fn?: () => void;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

const BtnHamburgues: React.FC<BtnHamburguesProps> = ({
  fn,
  isActive,
  setIsActive,
}) => {
  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
        fn && fn();
      }}
      className={`btnX btnMenu ${isActive ? "active" : ""}`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BtnHamburgues;
