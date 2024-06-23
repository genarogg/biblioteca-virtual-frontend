import { useQuery } from "react-query";

import CardStadistica from "./components/CardStadisticas";

import { SiResend } from "react-icons/si";

import Layout from "@layout";
import Spinner from "@spinner";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  console.log(process.env.STRAPI_API_URL);
  const fetcher = async () => {
    const res = await fetch("http://localhost:8000/get-data/estadistica");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const { data, isLoading } = useQuery("fetchData", fetcher);

  const estadisticas = [
    {
      text: "Trabajo Grado Pregrado",
      estadistica: data.porcentajes.trabajoGradoPregrado,
      icono: <SiResend />,
      color: "#",
      url: "/",
      cantidad: data.categoria.trabajoGradoPregrado,
    },
    {
      text: "Producciones Intelectuales Diep",
      estadistica: data.porcentajes.produccionesIntelectualesDiep,
      icono: <SiResend />,
      color: "",
      url: "/",
      cantidad: data.categoria.produccionesIntelectualesDiep,
    },
    {
      text: "Publicaciones",
      estadistica: data.porcentajes.publicaciones,
      icono: <SiResend />,
      color: "",
      url: "/",
      cantidad: data.categoria.publicaciones,
    },
    {
      text: "Diplomados Pregrado",
      estadistica: data.porcentajes.diplomadosPregrado,
      icono: <SiResend />,
      color: "",
      url: "/",
      cantidad: data.categoria.diplomadosPregrado,
    },
    {
      text: "Diplomados Postgrado",
      estadistica: data.porcentajes.diplomadosPostgrado,
      icono: <SiResend />,
      color: "#e16ddd",
      url: "/",
      cantidad: data.categoria.diplomadosPostgrado,
    },
    {
      
      estadistica: data.porcentajes.diplomadosUnidadesAnexas,
      icono: <SiResend />,
      color: "#86c8f0",
      url: "/",
      cantidad: data.categoria.diplomadosUnidadesAnexas,
    },
  ];

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
          return (
          <div className="container-card-stadisticas">
            {estadisticas.map((estadistica, index) => (
              <CardStadistica
                key={index}
                text={estadistica.text}
                estadistica={estadistica.estadistica}
                icono={estadistica.icono}
                color={estadistica.color}
                url={estadistica.url}
                cantidad={estadistica.cantidad}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
