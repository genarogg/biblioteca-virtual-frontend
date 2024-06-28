import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Spinner from "@spinner";
import Layout from "@layout";

interface DocumentoProps {
  data: any;
}

interface Descripcion {
  titulo?: string;
  descripcion?: string;
  createdAt?: string;
  pdf?: string;
  categoria?: string;
  downloader?: boolean;
  nombreAutor?: string;
  apellidoAutor?: string;
  cedulaAutor?: string;
  emailAutor?: string;
  // Agrega cualquier otra propiedad que necesites
}

import { STRAPI_API_URL, STRAPI_TOKEN } from "@env";

const Documento: React.FC<DocumentoProps> = ({ data }) => {
  const backendUrl = STRAPI_API_URL;
  const strapiToken = STRAPI_TOKEN;

  const [loading, setLoading] = useState(true);
  const [descripcion, setDescripcion] = useState<Descripcion>({});

  useEffect(() => {
    // Asume que fetchDescripcion es una función que obtiene la descripción

    const transformedArray = data.map((item: any) => ({
      titulo: item.attributes.titulo,
      descripcion: item.attributes.descripcion[0].children[0].text,
      createdAt: item.attributes.createdAt,
      pdf: item.attributes.PDF.data.attributes.url,
      categoria: item.attributes.categoria.data.attributes.nombre,
      downloader: item.attributes.downloader,
      nombreAutor: item.attributes.nombreAutor,
      apellidoAutor: item.attributes.apellidoAutor,
      cedulaAutor: item.attributes.cedulaAutor,
      emailAutor: item.attributes.emailAutor,
    }));

    console.log(transformedArray);

    setDescripcion(transformedArray[0]);
    setLoading(false);
  }, [data]);

  //@ts-ignore
  const date = new Date(descripcion.createdAt);

  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const printDocument = () => {
    const input = document.querySelector("#divToPrint p")?.textContent;
    const doc = new jsPDF();

    if (input) {
      const lines = doc.splitTextToSize(input, 160);
      doc.text(lines, 20, 30);
      doc.save(data.titulo + ".pdf");
    }
  };

  return (
    <Layout where="documento">
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div className="container-trabajo">
            <div className="info">
              <h1 className="titulo">{descripcion.titulo}</h1>
              <div className="descripcion" id="divToPrint">
                {/* Aquí asumimos que la descripción es un texto simple o HTML seguro para renderizar */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: descripcion.descripcion || "",
                  }}
                ></p>
              </div>
            </div>

            <div className="autor">
              <div className="titulo">Datos del Autor</div>
              <div className="info-autor">
                <h2>
                  Nombre: {descripcion.nombreAutor} {descripcion.apellidoAutor}
                </h2>
                <p>Cedula: {descripcion.cedulaAutor}</p>
                <p>Email: {descripcion.emailAutor}</p>
                {/* Asegúrate de actualizar la generación de la fecha para usar descripcion.createdAt */}
                <p>Fecha: {formattedDate}</p>
              </div>
            </div>

            <div className="footer">
              <div className="pdf ">
                <button
                  className="hover-tamano"
                  onClick={() => {
                    printDocument();
                  }}
                >
                  Descargar Resumen
                </button>
                <span className="separador "></span>
                {descripcion.downloader ? (
                  <>
                    <a
                      className="hover-tamano"
                      /* @ts-ignore */
                      href={backendUrl + descripcion.pdf}
                      download
                    >
                      Descargar trabajo
                    </a>
                    <span className="separador "></span>
                  </>
                ) : null}
              </div>

              <p className="categoria">Categoria: {descripcion.categoria}</p>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Documento;
