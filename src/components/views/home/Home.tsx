import { useQuery } from "react-query";

import CardStadistica from "./components/CardStadisticas";



import { SiResend } from "react-icons/si";

import Layout from "@layout";
import Spinner from "@spinner";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const fetcher = async () => {
    const res = await fetch("http://localhost:8000/get-data/estadistica");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const { data, isLoading } = useQuery("fetchData", fetcher);

  return (
    <Layout where="home">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="titulo-trabajos">
            <h2>
              trabajos totales <br /> en la plataforma {data.porcentajes.total}
            </h2>

            <span></span>
          </div>
          <div className="container-card-stadisticas">
            <CardStadistica
              text={"Trabajo Grado Pregrado"}
              estadistica={data.porcentajes.trabajoGradoPregrado}
              icono={<SiResend />}
              color={"#6bbd6d"}
              url="/"
              cantidad={data.categoria.trabajoGradoPregrado}
            />
            <CardStadistica
              text={"Producciones Intelectuales Diep"}
              estadistica={data.porcentajes.produccionesIntelectualesDiep}
              icono={<SiResend />}
              color={"#fc6380"}
              url="/"
              cantidad={data.categoria.produccionesIntelectualesDiep}
            />

            <CardStadistica
              text={"Publicaciones"}
              estadistica={data.porcentajes.publicaciones}
              icono={<SiResend />}
              color={"#4abfbe"}
              url="/"
              cantidad={data.categoria.publicaciones}
            />
            <CardStadistica
              text={"Diplomados Pregrado"}
              estadistica={data.porcentajes.diplomadosPregrado}
              icono={<SiResend />}
              color={"#9766fd"}
              url="/"
              cantidad={data.categoria.diplomadosPregrado}
            />
            <CardStadistica
              text={"Diplomados Postgrado"}
              estadistica={data.porcentajes.diplomadosPostgrado}
              icono={<SiResend />}
              color={"#e16ddd"}
              url="/"
              cantidad={data.categoria.diplomadosPostgrado}
            />
            <CardStadistica
              text={"Diplomados Unidades Anexas"}
              estadistica={data.porcentajes.diplomadosUnidadesAnexas}
              icono={<SiResend />}
              color={"#86c8f0"}
              url="/"
              cantidad={data.categoria.diplomadosUnidadesAnexas}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
