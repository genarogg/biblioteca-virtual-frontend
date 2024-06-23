import { notify } from "@nano";

const handleSubmit = async (
  e: any,
  formData: any,
  setLoading: any,
  backendUrl: any,
  token: any
) => {
  e.preventDefault();

  setLoading(true);

  const transformData = (responseDataUpPDF: any) => {
    const transformedData = {
      data: {
        titulo: formData.titulo,
        descripcion: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: formData.descripcion,
              },
            ],
          },
        ],
        categoria: {
          id: formData.categoria,
        },
        nombreAutor: formData.nombreAutor,
        apellidoAutor: formData.apellidoAutor,
        emailAutor: formData.emailAutor,
        cedulaAutor: formData.cedulaAutor,

        PDF: responseDataUpPDF,
      },
    };

    return transformedData;
  };

  try {
    //cargar el pdf en el servidor
    const dataUpPDF = new FormData();

    dataUpPDF.append("files", formData.archivo);

    const responseUpPDF = await fetch(`${backendUrl}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: dataUpPDF,
    });

    setLoading(false);

    if (!responseUpPDF.ok) {
      notify({ message: "Error al cargar el pdf", type: "error" });
      return;
    }

    const responseDataUpPDF = await responseUpPDF.json();

    // crear la entrada de trabajo
    const dataToSend = transformData(responseDataUpPDF[0]);

    const response = await fetch(`${backendUrl}/api/trabajos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    setLoading(false);

    const data = await response.json();

    if (
      data.error &&
      data.error.details.errors.some((error: any) =>
        error.path.includes("titulo")
      )
    ) {
      notify({ message: "Trabajo dublicado", type: "error" });
      return;
    }

    if (!response.ok) {
      notify({ message: "Error al cargar el Trabajo", type: "error" });
      return;
    }

    notify({ message: "¡Trabajo Cargado!", type: "success" });
    setLoading(false);
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
  }
};

export default handleSubmit;
