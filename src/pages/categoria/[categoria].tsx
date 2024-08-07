import { STRAPI_API_URL, STRAPI_TOKEN } from "@env";

export async function getServerSideProps(context: any) {
  // Construye la URL utilizando el parámetro de la ruta
  const backendUrl = STRAPI_API_URL;
  const strapiToken = STRAPI_TOKEN;

  const categoria = context.params.categoria;

  // Construye la URL específica para la categoría utilizando el parámetro extraído
  const url = `${backendUrl}/api/trabajos?fields[0]&populate[categoria][filters][url][$eq]=${categoria}&populate[categoria][fields]=id`;


  // Haz una solicitud a la URL para obtener los datos de la categoría específica
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  console.log(response)
  const responseData = await response.json();

  // Filtra los datos para obtener solo los IDs de los trabajos
  const data = responseData.data
    .filter(
      (elemento: any) =>
        elemento.attributes.categoria &&
        elemento.attributes.categoria.data !== null
    )
    .map((elementoFiltrado: any) => elementoFiltrado.id)
    

  // Devuelve los datos como props
  return { props: { data } };
}

interface PageProps {
  data: any;
}

import Documentos from "@view/documentos/Documentos";

export default function Page({ data }: PageProps) {
  console.log(data);
  return (
    <>
      {/* <h1>{data}</h1> */}
      <Documentos data={data} />
    </>
  );
}
