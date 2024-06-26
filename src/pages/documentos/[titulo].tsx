import { STRAPI_API_URL, STRAPI_TOKEN } from "@env";

export async function getServerSideProps(context: any) {
  // Construye la URL utilizando el parámetro de la ruta
  const backendUrl = STRAPI_API_URL;
  const strapiToken = STRAPI_TOKEN;

  const titulo = encodeURIComponent(context.params.titulo);

  const url = `${backendUrl}/api/trabajos?filters[titulo][$eq]=${titulo}&populate[PDF][fields]=url&populate[categoria][fields]=nombre`;

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

  const { data } = await response.json();

  return { props: { data } };
}

interface PageProps {
  data: any;
}

import Documento from "@view/documento/Documento";

export default function Page({ data }: PageProps) {
  return <Documento data={data} />;
}

/* export default function Page({ data }: PageProps) {
  return <p>hola</p>;
}
 */
