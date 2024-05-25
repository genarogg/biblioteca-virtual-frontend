import { useQuery } from "react-query";
import Layout from "@layout";
import Spinner from "@spinner";

interface HomeProps {

}

const fetcher = async () => {
  const res = await fetch("http://localhost:8000/get-data/estadistica");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading, error } = useQuery("fetchData", fetcher);

  if (isLoading) return <Spinner />;
  // if (error) return <div>Error: {error.message}</div>; // Accede a la propiedad message del objeto de error

  return (
    <Layout where="home">
      <div>{JSON.stringify(data)}</div>
    </Layout>
  );
};

export default Home;
