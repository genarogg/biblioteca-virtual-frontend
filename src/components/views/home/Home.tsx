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

          {/* {Object.entries(categoriaMapa[0]).map(([id, categoria]: any) => (
            <CardStadistica
              key={id}
              text={categoria.nombre}
              estadistica={categoria.contador}
              icono={categoria.icono.url}
              color={categoria.color}
              url={categoria.icono.url}
              cantidad={categoria.contador}
            />
          ))} */}
        </>
      )}
    </Layout>
  );
};

export default Home;
