import { useEffect, useState } from "react";

import CardStadistica from "./components/CardStadisticas";
import fetchCategoriasEstadisticas from "./function/fetchCategoriasEstadisticas";

import Layout from "@layout";
import Spinner from "@spinner";

import { AlgoliaSearch } from "@nano";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [loading, setLoading] = useState(true);
  const [categoriaMapa, setCategoriaMapa] = useState([]);

  useEffect(() => {
    fetchCategoriasEstadisticas(setLoading, setCategoriaMapa);

    setLoading(false);
  }, []);

  return (
    <Layout where="home">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="titulo-trabajos">
            <AlgoliaSearch />
            <span></span> {/* // no quitar */}
          </div>

          <div className="container-card-stadisticas">
            {categoriaMapa.map(
              ({ id, nombre, color, contador, porcentaje, url }: any) => (
                <CardStadistica
                  key={id}
                  text={nombre}
                  estadistica={porcentaje}
                  color={color}
                  url={`/categoria/${url}`}
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
