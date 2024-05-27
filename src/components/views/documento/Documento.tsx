import Layout from "@layout";

import { URL_BACKEND } from "@env";

interface DocumentoProps {
  data: any;
}

const Documento: React.FC<DocumentoProps> = ({ data }) => {
  console.log(data);

  const date = new Date(data.createdAt);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <Layout where="documento">
      <div className="container-trabajo">
        <div className="info">
          <h1 className="titulo">{data.titulo}</h1>
          <div className="descripcion">{data.descripcion}</div>
          <div className="footer">
            <div className="pdf hover-tamano">
              {data.downloader ? (
                <a href={URL_BACKEND + "/uploads/" + data.rutaPDF} download>
                  Descargar PDF
                </a>
              ) : null}
            </div>
            <span className="separador "></span>
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
    </Layout>
  );
};

export default Documento;
