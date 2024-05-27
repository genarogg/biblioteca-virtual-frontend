export async function getServerSideProps(context: any) {
  // Construye la URL utilizando el parámetro de la ruta
  const url = `http://localhost:8000/get-data/documento/${context.query.titulo}`;

  // Haz una solicitud a la URL para obtener los datos
  const response = await fetch(url);
  const data = await response.json();

  // Devuelve los datos como props
  return { props: { data } };
}

interface PageProps {
  data: any;
}

import Documento from "@view/documento/Documento";

export default function Page({ data }: PageProps) {
  return <Documento data={data} />;
}
