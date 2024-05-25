import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import Layout from "@layout";
import Spinner from "@spinner";

interface HomeProps {}

const fetcher = async () => {
  const res = await fetch("http://localhost:8000/get-data/estadistica");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading, error } = useQuery("fetchData", fetcher);

  /*  if (isLoading) return <Spinner />; */

  const labels = [
    "Trabajo Grado Pregrado",
    "Producciones Intelectuales Diep",
    "Publicaciones",
    "Diplomados Pregrado",
    "Diplomados Postgrado",
    "Diplomados Unidades Anexas",
  ];
  const chartData = {
    datasets: [
      {
        label: labels[0],
        data: data?.trabajoGradoPregrado,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: labels[1],
        data: data?.produccionesIntelectualesDiep,
        backgroundColor: "rgba(255, 99, 255, 0.5)",
      },
      {
        label: labels[2],
        data: data?.publicaciones,
        backgroundColor: "rgba(100, 99, 255, 0.5)",
      },
      {
        label: labels[3],
        data: data?.diplomadosPregrado,
        backgroundColor: "rgba(255, 99, 0, 0.5)",
      },
      {
        label: labels[4],
        data: data?.diplomadosPostgrado,
        backgroundColor: "rgba(255, 0, 255, 0.5)",
      },
      {
        label: labels[5],
        data: data?.diplomadosUnidadesAnexas,
        backgroundColor: "rgba(0, 99, 255, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <Layout where="home">
      <Bar options={options} data={chartData} />
    </Layout>
  );
};

export default Home;
