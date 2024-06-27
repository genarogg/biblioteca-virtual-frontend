import { useState, useEffect, memo } from "react";
import { A } from "@nano";

interface NavProps {
  css?: string;
  fn?: () => void;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  navegacion: any;
}

interface LiProps {
  link: string;
  text: string;
}

const Nav: React.FC<NavProps> = ({
  css = " ",
  fn,
  isActive,
  setIsActive,
  navegacion,
}) => {
  const Li: React.FC<LiProps> = ({ link, text }) => {
    return (
      <li>
        <A to={link}>{text}</A>
      </li>
    );
  };

  return (
    <nav
      onClick={() => {
        setIsActive(!isActive);
        fn && fn();
      }}
      className={`${css} ${isActive ? "active" : ""}`}
    >
      <ul>
        <Li link="/" text="inicio" />
        <li className="nav-item categorias">
          <a href="#">Categorías</a> {/* Este es el nuevo elemento */}
          <ul className="dropdown">
            {navegacion.map((categoria: any, index: any) => (
              <li key={index}>
                <a href={`/categoria/${categoria.attributes.url}`}>
                  {categoria.attributes.nombre}
                </a>
                {/* Subcategorías, si existen */}
                {categoria.subItems && categoria.subItems.length > 0 && (
                  <ul className="dropdown-sub">
                    {categoria.subItems.map((subItem: any, subIndex: any) => (
                      <li key={subIndex}>
                        <a href={`/subcategoria/${subItem.url}`}>
                          {subItem.nombre}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Nav);
