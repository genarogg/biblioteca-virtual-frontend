import React, { useState } from "react";
import Layout from "@layout";
import { Input, InputFile, Select, TextArea } from "@form";
import { FaUser } from "react-icons/fa6";

import categoriaData from "./categoria";
import { Bounce, toast } from "react-toastify";

interface CargarTrabajoProps {}

const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombreAutor: "",
    apellidoAutor: "",
    cedulaAutor: "",
    emailAutor: "",
    titulo: "",
    categoria: "",
    descripcion: "",
    archivo: new File([], ""),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Iterar sobre las propiedades de formData y agregarlas a data
    for (const key in formData) {
      // @ts-ignore
      data.append(key, formData[key]);
    }

    fetch("http://localhost:8000/cargar-trabajo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Layout>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="container-info-user">
            <Input
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
              type="email"
              name="email"
              placeholder="email"
              value={formData.emailAutor}
              valueChange={(e) =>
                setFormData({ ...formData, emailAutor: e.target.value })
              }
            />
          </div>
          <div className="container-info-trabajo">
            <Input
              icono={<FaUser />}
              type="text"
              name="titulo"
              placeholder="titulo"
              value={formData.titulo}
              valueChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
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
            />
            <InputFile
              icono={<FaUser />}
              name="file"
              placeholder="Cargar archivo PDF"
              valueChange={(e: any) => {
                setFormData({ ...formData, archivo: e });
              }}
            />

            <TextArea
              name="descripcion"
              placeholder="descripcion"
              value={formData.descripcion}
              valueChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
            ></TextArea>
          </div>
          <div className="submit-container">
            <button type="submit" disabled={loading}>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CargarTrabajo;
