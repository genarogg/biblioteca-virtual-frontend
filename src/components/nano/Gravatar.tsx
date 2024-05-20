import React from "react";
import md5 from "crypto-js/md5";
import Image from "next/image";

interface GravatarProps {
  email: string;
}

const Gravatar: React.FC<GravatarProps> = ({ email }) => {
  const hash = md5(email.trim().toLowerCase());
  const url = `https://www.gravatar.com/avatar/${hash}`;

  /*  return <img src={url} alt="User avatar" />; */

  return (
    <Image
      src={url}
      alt="Descripción de la imagen"
      width={80} // reemplaza con el ancho de tu imagen
      height={80} // reemplaza con la altura de tu imagen
      priority
    />
  );
};

export default Gravatar;
