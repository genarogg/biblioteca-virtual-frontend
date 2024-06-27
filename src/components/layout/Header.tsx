import { useEffect } from "react";
interface HeaderProps {
  children?: React.ReactNode;
  where?: string;
}

import LogoUnerg from "../svg/logoUnerg";

import { BtnHamburgues } from "@nano";
import { useState } from "react";

import { STRAPI_API_URL, STRAPI_TOKEN } from "@env";

import Nav from "./Nav";
const Header: React.FC<HeaderProps> = ({ children, where }) => {
  const [isActive, setIsActive] = useState(false);

  const [navegacion, setNavegacion] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de las categorías

    const url = `${STRAPI_API_URL}/api/categorias?fields[2]=nombre&fields[4]=url`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error("No se pudo obtener los datos");
        }

        const { data } = await response.json();

        setNavegacion(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  const Title = () => {
    return (
      <div className="titulo">
        <h2>
          <div className="logo">
            <LogoUnerg />
          </div>
          UNERG{" "}
          <span
            style={{ position: "relative", bottom: "1px", margin: "0 10px" }}
          >
            |
          </span>{" "}
          Trabajos
        </h2>
      </div>
    );
  };

  return (
    <header className="header-container">
      <div className="desktop-header">
        <BtnHamburgues isActive={isActive} setIsActive={setIsActive} />
        <Title />
         <Nav
          css="nav-bar-desk"
          isActive={isActive}
          setIsActive={setIsActive}
          navegacion={navegacion}
        />
      </div>
      <Nav
        css="nav-bar-movile"
        isActive={isActive}
        setIsActive={setIsActive}
        navegacion={navegacion}
      />
    </header>
  );
};

export default Header;
