import { notify } from "@nano";

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
      "/api/categorias?fields[0]=id&fields[1]=nombre&fields[2]=color&fields[3]=posicion&fields[4]=url";
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

    console.log(data);

    const mapaCategorias: any = [];

    // Paso 1: Convertir categorias a objetos y agregarlos al array
    data.categorias.data.forEach((categoria: any) => {
      const { id, attributes } = categoria;
      mapaCategorias.push({
        id: id,
        nombre: attributes.nombre,
        url: attributes.url,
        color: attributes.color,
        posicion: attributes.posicion,
        contador: 0,
      });
    });

    // Paso 2: Iterar sobre los trabajos para actualizar el contador
    data.work.data.forEach((trabajo: any) => {
      if (trabajo.attributes.categoria.data) {
        // Verifica si data no es null
        const categoriaId = trabajo.attributes.categoria.data.id;
        const categoriaIndex = mapaCategorias.findIndex(
          (categoria: any) => categoria.id === categoriaId
        );
        if (categoriaIndex !== -1) {
          mapaCategorias[categoriaIndex].contador += 1;
        }
      } else {
        // Opcional: manejar el caso en que la categoría es null
      }
    });

    // Paso 3: Calcular el total de trabajos
    const totalTrabajos = data.work.data.length;

    // Paso 4: Calcular el porcentaje de cada categoría
    mapaCategorias.forEach((categoria: any) => {
      if (totalTrabajos > 0) {
        categoria.porcentaje = Math.round(
          (categoria.contador / totalTrabajos) * 100
        );
      } else {
        categoria.porcentaje = 0;
      }
    });

    mapaCategorias.sort(
      (a: any, b: any) => parseInt(a.posicion) - parseInt(b.posicion)
    );

    setCategoriaMapa(mapaCategorias);
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
  }
};

export default fetchCategoriasEstadisticas;
