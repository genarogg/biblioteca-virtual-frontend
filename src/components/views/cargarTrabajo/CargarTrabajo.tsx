import React, { useState } from "react";
import Layout from "@layout";
import { Input, InputFile, Select } from "@form";
import { FaUser } from "react-icons/fa6";

import categoriaData from "./categoria";

interface CargarTrabajoProps {}

const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
  const [formData, setFormData] = useState({
    nombreAutor: "",
    apellidoAutor: "",
    cedulaAutor: "",
    titulo: "",
    categoria: "",
    descripcion: "",
    archivo: new File([], ""),
  });

  const fileInput = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (fileInput.current.files.length > 0) {
      data.append("archivo", fileInput.current.files[0]);
    }

    // Agregar los otros campos al objeto FormData
/*     data.append("nombreAutor", formData.nombreAutor);
    data.append("apellidoAutor", formData.apellidoAutor);
    data.append("cedulaAutor", formData.cedulaAutor);
    data.append("titulo", formData.titulo);
    data.append("categoria", formData.categoria);
    data.append("descripcion", formData.descripcion);
 */
    console.log(data);
    fetch("http://localhost:8000/cargar-trabajo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Layout>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          {/* <Input
            icono={<FaUser />}
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombreAutor}
            valueChange={(e) =>
              setFormData({ ...formData, nombreAutor: e.target.value })
            }
          />
          <Input
            icono={<FaUser />}
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellidoAutor}
            valueChange={(e) =>
              setFormData({ ...formData, apellidoAutor: e.target.value })
            }
          />
          <Input
            icono={<FaUser />}
            type="number"
            name="cedula"
            placeholder="Cedula"
            value={formData.cedulaAutor}
            valueChange={(e) =>
              setFormData({ ...formData, cedulaAutor: e.target.value })
            }
          />

          <Input
            icono={<FaUser />}
            type="text"
            name="titulo"
            placeholder="titulo"
            value={formData.titulo}
            valueChange={(e) =>
              setFormData({ ...formData, titulo: e.target.value })
            }
            content={true}
          />

          <Select
            data={categoriaData}
            icono={<FaUser />}
            name="categoria"
            placeholder="categoria"
            value={formData.categoria}
            valueChange={(e) =>
              setFormData({ ...formData, categoria: e.target.value })
            }
          /> */}
          <input type="file" name="file" ref={fileInput} />
          {/* <InputFile
            icono={<FaUser />}
            name="file"
            placeholder="Cargar archivo PDF"
  
            valueChange={(e) => {
              setFormData({ ...formData, file: e });
            }}
          /> */}

          {/* <textarea
            onChange={(e) => {
              setFormData({ ...formData, descripcion: e.target.value });
            }}
            name="descripcion"
            id="descripcion"
          ></textarea> */}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </Layout>
  );
};

export default CargarTrabajo;
