import { useState, useEffect, FC } from "react";

const useCategorias = (
  backendUrl: string | undefined,
  strapiToken: string | undefined
) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/categorias`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${strapiToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const transformarDatos = (dataOriginal: any) => {
          return dataOriginal.data.map((item: any) => {
            const id = item.id.toString();
            const text = item.attributes.nombre;

            return { value: id, text, id };
          });
        };

        setCategorias(transformarDatos(data));
      } catch (error) {
        console.error("Hubo un problema con la operación fetch:", error);
      }
    };

    fetchCategorias();
  }, [backendUrl, strapiToken]);

  return categorias;
};

export default useCategorias;
