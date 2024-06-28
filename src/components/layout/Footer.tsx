import React, { ReactElement } from "react";
import { Icono } from "@nano";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const Li = ({
    to,
    ico,
    css,
  }: {
    to: string;
    ico: ReactElement;
    css: string;
  }) => {
    return (
      <li>
        <a href={to} target="_blank" rel="noreferrer">
          <Icono icono={ico} css={css} />
        </a>
      </li>
    );
  };

  //me da el año actual
  const year = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div className="desktop-footer">
        <div className="up">
          <div className="direccion">
            <h3>Dirección</h3>
            <p>
              Ciudad Universitaria - Vía El Castrero – Edif. El Rectorado San
              Juan de los Morros – Estado Guárico – Venezuela. Universidad
              Nacional Experimental de los Llanos Centrales Rómulo Gallegos
            </p>
          </div>
          <div className="redes-sociales">
            <nav className="">
              <h3>Redes Sociales</h3>
              <ul>
                <Li
                  css="facebook"
                  to="https://www.facebook.com/oficial.unerg"
                  ico={<FaFacebookF />}
                />

                <Li
                  css="twitter"
                  to="https://x.com/OficialUnerg?mx=2"
                  ico={<FaXTwitter />}
                />
                <Li
                  css="instagram"
                  to="https://www.instagram.com/oficial_unerg/"
                  ico={<FaInstagram />}
                />
              </ul>
            </nav>
          </div>

          <div className="contacto">
            <h3>Contacto</h3>
            <a href="mailto:secretariaunerg@unerg.edu.ve">
              <Icono css="email" icono={<FaEnvelope />} />
              secretariaunerg
            </a>
          </div>
        </div>
        <div className="down">
          <p>© {year} Todos los derechos reservados</p>
          <p>® Copyright – Dirección de Informática - UNERG – {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
