import { useQuery } from "react-query";

import CardStadistica from "./components/CardStadisticas";

import { useEffect, useState } from "react";

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

  const [estadistica, setEstadistica] = useState({
    trabajoGradoPregrado: 0,
    produccionesIntelectualesDiep: 0,
    publicaciones: 0,
    diplomadosPregrado: 0,
    diplomadosPostgrado: 0,
    diplomadosUnidadesAnexas: 0,
    total: 0,
  });

  useEffect(() => {
    if (data) {
      let data2 = data.porcentajes;
      setEstadistica({
        trabajoGradoPregrado: data2.trabajoGradoPregrado,
        produccionesIntelectualesDiep: data2.produccionesIntelectualesDiep,
        publicaciones: data2.publicaciones,
        diplomadosPregrado: data2.diplomadosPregrado,
        diplomadosPostgrado: data2.diplomadosPostgrado,
        diplomadosUnidadesAnexas: data2.diplomadosUnidadesAnexas,
        total: data2.total,
      });
    }
  }, [data]);

  return (
    <Layout where="home">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="container-card-stadisticas">
            <CardStadistica
              text={"Trabajo Grado Pregrado"}
              estadistica={estadistica.trabajoGradoPregrado}
              icono={<SiResend />}
              color={"#6bbd6d"}
              url="/"
            />
            <CardStadistica
              text={"Producciones Intelectuales Diep"}
              estadistica={estadistica.produccionesIntelectualesDiep}
              icono={<SiResend />}
              color={"#fc6380"}
              url="/"
            />

            <CardStadistica
              text={"Publicaciones"}
              estadistica={estadistica.publicaciones}
              icono={<SiResend />}
              color={"#4abfbe"}
              url="/"
            />
            <CardStadistica
              text={"Diplomados Pregrado"}
              estadistica={estadistica.diplomadosPregrado}
              icono={<SiResend />}
              color={"#9766fd"}
              url="/"
            />
            <CardStadistica
              text={"Diplomados Postgrado"}
              estadistica={estadistica.diplomadosPostgrado}
              icono={<SiResend />}
              color={"#e16ddd"}
              url="/"
            />
            <CardStadistica
              text={"Diplomados Unidades Anexas"}
              estadistica={estadistica.diplomadosUnidadesAnexas}
              icono={<SiResend />}
              color={"#86c8f0"}
              url="/"
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
