import { notify } from "@nano";

interface Categoria {
  nombre: string;
  color: string;
  posicion: number;
  contador: number;
  icono: {
    url: string;
    name: string;
  };
}

const fetchCategoriasEstadisticas = async (
  setLoading: any,
  setCategoriaMapa: any
) => {
  const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  try {
    const queryWork = "/api/trabajos?fields=id&populate[categoria][fields]=id";
    const responseWork = await fetch(`${backendUrl + queryWork}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });

    const queryCategoria =
      "/api/categorias?fields[0]=id&fields[1]=nombre&fields[2]=color&fields[3]=posicion&populate[icono][fields][0]=url&populate[icono][fields][1]=name";
    const responseCategorias = await fetch(`${backendUrl + queryCategoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });

    if (!responseWork.ok || !responseCategorias.ok) {
      notify({
        message: "Hubo un problema al cargar las estadísticas",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const data = {
      work: await responseWork.json(),
      categorias: await responseCategorias.json(),
    };

    const mapaCategorias: { [key: string]: Categoria } = {};

    data.categorias.data.forEach((categoria: any) => {
      const { id, attributes } = categoria;
      mapaCategorias[id] = {
        nombre: attributes.nombre,
        color: attributes.color,
        posicion: attributes.posicion,
        contador: 0,
        icono: {
          url: attributes.icono.data.attributes.url,
          name: attributes.icono.data.attributes.name,
        },
      };
    });

    // Paso 2: Iterar sobre los trabajos para actualizar el contador
    data.work.data.forEach((trabajo: any) => {
      const categoriaId = trabajo.attributes.categoria.data.id;
      if (mapaCategorias[categoriaId]) {
        mapaCategorias[categoriaId].contador += 1;
      }
    });

    const dataFinal = [mapaCategorias];

    setCategoriaMapa(dataFinal);
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
  }
};

export default fetchCategoriasEstadisticas;
