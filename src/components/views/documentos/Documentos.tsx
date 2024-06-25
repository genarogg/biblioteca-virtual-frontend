import React, { useState, useEffect, use } from "react";
import Spinner from "@spinner";
import Layout from "@layout";

import Link from "next/link";

import { AlgoliaSearch } from "@nano";
interface Documentos {
  data: any;
}

interface InfoState {
  paginacion: number[];
  data: any[];
}
const Documentos: React.FC<Documentos> = ({ data }) => {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const [paginaActual, setPaginaActual] = useState(0);

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoState>({
    paginacion: [],
    data: [],
  });

  useEffect(() => {
    // Asegúrate de que este código se ejecute solo en el lado del cliente
    if (typeof window !== "undefined") {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      scrollToTop();

      // Extrae el número del hash de la URL
      const hashValue = window.location.hash.replace("#", "") || "1";
      const pageNumber = parseInt(hashValue, 10);
      setPaginaActual(pageNumber);

      // Calcula el rango de índices basado en el número del hash
      const itemsPerPage = 15;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Filtra data para obtener solo los elementos dentro del rango deseado
      const filteredData = data.slice(startIndex, endIndex);

      // console.log(filteredData);

      const urlFilter = filteredData
        .map((numero: any) => `&filters[id][$in]=${numero}`)
        .join("");

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

        const crearPaginacion = (totalItems: number) => {
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          const paginacion = Array.from(
            { length: totalPages },
            (_, i) => i + 1
          );
          return paginacion;
        };

        const totalItems = crearPaginacion(data.length);
        // console.log(totalItems);
        const responseData = await response.json();
        setInfo({ paginacion: totalItems, data: responseData.data });
        // console.log(responseData.data);
      };

      obtenerInformacion();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [data, paginaActual]);

  const Card = ({ titulo, descripcion, nombreAutor, apellidoAutor }: any) => {
    const urlCodificada = encodeURIComponent(titulo);

    return (
      <div className="card-documentos">
        <h2>{titulo}</h2>
        <div
          className="descripcion"
          dangerouslySetInnerHTML={{
            __html: descripcion,
          }}
        />
        <div className="footer">
          <div className="link">
            <Link href={`/documentos/${urlCodificada}`}>ver publicacion</Link>
          </div>
          <p className="autor">
            <span> Autor:</span> {nombreAutor} {apellidoAutor}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout where="documento">
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-documentos">
          <div className="search">
            <AlgoliaSearch />
          </div>
          <div className="info">
            {info.data.map((documento: any) => (
              <Card
                key={documento.id}
                titulo={documento.attributes.titulo}
                descripcion={
                  documento.attributes.descripcion[0].children[0].text
                }
                nombreAutor={documento.attributes.nombreAutor}
                apellidoAutor={documento.attributes.apellidoAutor}
              />
            ))}
          </div>
          <div className="paginacion">
            <div className="container-nav">
              {info.paginacion.map((numero) => (
                <Link key={numero} href={`#${numero}`}>
                  <button key={numero} onClick={() => setPaginaActual(numero)}>
                    {numero}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Documentos;
