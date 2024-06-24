import { useEffect, useState } from "react";

import CardStadistica from "./components/CardStadisticas";
import fetchCategoriasEstadisticas from "./function/fetchCategoriasEstadisticas";

import Layout from "@layout";
import Spinner from "@spinner";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [loading, setLoading] = useState(true);
  const [categoriaMapa, setCategoriaMapa] = useState([]);

  useEffect(() => {
    fetchCategoriasEstadisticas(setLoading, setCategoriaMapa);

    setLoading(false);
  }, []);

  console.log(categoriaMapa);

  return (
    <Layout where="home">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="titulo-trabajos">
            <h2>
              {/* trabajos totales <br /> en la plataforma {data.porcentajes.total} */}
            </h2>

            <span></span>
          </div>

          <div className="container-card-stadisticas">
            {categoriaMapa.map(
              ({ id, nombre, color, contador, porcentaje }: any) => (
                <CardStadistica
                  key={id}
                  text={nombre}
                  estadistica={porcentaje}
                  color={color}
                  url={`/categoria/${id}`}
                  cantidad={contador}
                />
              )
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
