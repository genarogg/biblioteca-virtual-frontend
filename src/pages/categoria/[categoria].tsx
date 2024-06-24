export async function getServerSideProps(context: any) {
  // Construye la URL utilizando el parámetro de la ruta
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  // Extrae el parámetro de la ruta (por ejemplo, el id de la categoría) desde context.params
  const categoria = context.params.categoria; // Asegúrate de que 'id' coincida con el nombre del archivo [id].tsx
  console.log(categoria);
  // Construye la URL específica para la categoría utilizando el parámetro extraído
  const url = `${backendUrl}/api/categorias/${categoriaId}`;
  // /api/trabajos?fields[0]=id&fields[1]=titulo&fields[2]=descripcion&populate[categoria][fields][0]=id&populate[categoria][fields][1]=nombre
  /*  

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

  const data = await response.json();

  // Devuelve los datos como props
  return { props: { data } }; */
}

interface PageProps {
  data: any;
}

export default function Page({ data }: PageProps) {
  return <p>hola</p>;
}
