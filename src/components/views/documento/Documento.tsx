import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Spinner from "@spinner";
import Layout from "@layout";

import { URL_BACKEND } from "@env";

interface DocumentoProps {
  data: any;
}

const Documento: React.FC<DocumentoProps> = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    // Asume que fetchDescripcion es una función que obtiene la descripción
    setDescripcion(data.descripcion);
    setLoading(false);
  }, [data.descripcion]);

  const date = new Date(data.createdAt);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const printDocument = () => {
    const input = document.querySelector("#divToPrint p")?.textContent;
    const doc = new jsPDF();

    if (input) {
      const lines = doc.splitTextToSize(input, 160); // Ajusta el segundo parámetro según el tamaño de la página
      doc.text(lines, 20, 30); // Los números son las coordenadas x e y respectivamente
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
        <div className="container-trabajo">
          <div className="info">
            <h1 className="titulo">{data.titulo}</h1>
            <div className="descripcion" id="divToPrint">
              <p dangerouslySetInnerHTML={{ __html: descripcion }}></p>;
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
                {data.downloader ? (
                  <>
                    <a className="hover-tamano" href={URL_BACKEND + "/uploads/" + data.rutaPDF} download>
                      Descargar trabajo
                    </a>
                    <span className="separador "></span>
                  </>
                ) : null}
              </div>

              <p className="categoria">Categoria: {data.categoria}</p>
            </div>
          </div>
          <span className="separador "></span>
          <div className="autor">
            <div className="titulo">Datos del Autor</div>
            <div className="info-autor">
              <h2>
                Nombre: {data.nombreAutor} {data.apellidoAutor}
              </h2>
              <p>Cedula: {data.cedulaAutor}</p>
              <p>Email: {data.emailAutor}</p>
              <p>Fecha: {formattedDate}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Documento;
