import React from "react";
import { A } from "@nano";

interface HeaderProps {
  children?: React.ReactNode;
  where?: string;
}

const Header: React.FC<HeaderProps> = ({ children, where }) => {
  interface LiProps {
    link: string;
    text: string;
  }

  const Li: React.FC<LiProps> = ({ link, text }) => {
    return (
      <li>
        <A to={link} text={text} />
      </li>
    );
  };

  const Title = () => {
    return (
      <div className="titulo">
        <h1>
          UNERG <span style={{ position: "relative", bottom: "1px" }}>|</span>{" "}
          SISTEMA INTEGRAL
        </h1>
      </div>
    );
  };

  return (
    <header className="header-container">
      <div className="desktop-header">
        <Title />
        <nav>
          <ul>
            <Li link="/" text="inicio" />
            <Li link="/cargar-trabajo" text="cargar documento" />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
