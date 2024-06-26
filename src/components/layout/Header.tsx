interface HeaderProps {
  children?: React.ReactNode;
  where?: string;
}

import { A, BtnHamburgues } from "@nano";
import { useState } from "react";
const Header: React.FC<HeaderProps> = ({ children, where }) => {
  interface LiProps {
    link: string;
    text: string;
  }

  const Li: React.FC<LiProps> = ({ link, text }) => {
    return (
      <li>
        <A to={link}>{text}</A>
      </li>
    );
  };

  const [isActive, setIsActive] = useState(false);

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

  const NavMovile = () => {
    return (
      <nav className={isActive ? "active" : ""}>
        <ul>
          <Li link="/" text="inicio" />
          <Li link="/cargar-trabajo" text="cargar documento" />
        </ul>
      </nav>
    );
  };

  return (
    <header className="header-container">
      <div className="desktop-header">
        <BtnHamburgues isActive={isActive} setIsActive={setIsActive} />
        <Title />
        <nav>
          <ul>
            <Li link="/" text="inicio" />
            <Li link="/cargar-trabajo" text="cargar documento" />
          </ul>
        </nav>
        <NavMovile />
      </div>
    </header>
  );
};

export default Header;
