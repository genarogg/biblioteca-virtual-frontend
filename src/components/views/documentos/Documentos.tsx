import React, { useState, useEffect, use } from "react";
import Spinner from "@spinner";
import Layout from "@layout";

interface Documentos {
  data: any;
}

const Documentos: React.FC<Documentos> = ({ data }) => {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const [loading, setLoading] = useState(true);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    // Asegúrate de que este código se ejecute solo en el lado del cliente
    if (typeof window !== "undefined") {

      // Extrae el número del hash de la URL
      const hashValue = window.location.hash.replace("#", "");
      const pageNumber = parseInt(hashValue, 10);

      // Calcula el rango de índices basado en el número del hash
      const itemsPerPage = 15;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;


      // Filtra data para obtener solo los elementos dentro del rango deseado
      const filteredData = data.slice(startIndex, endIndex);


      const urlFilter = filteredData
        .map((numero: any) => `&filters[id][$in]=${numero}`)
        .join("");

      console.log(urlFilter);

      const obtenerInformacion = async () => {
        const url = `${backendUrl}/api/trabajos?${urlFilter}`;

        // Haz una solicitud a la URL para obtener los datos de la categoría específica
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${strapiToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        console.log(responseData);
      };

      obtenerInformacion();
      setLoading(false);
    }
  }, [data]);

  return <Layout where="documento">{loading ? <Spinner /> : null}</Layout>;
};

export default Documentos;
