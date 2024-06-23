import React, { useState } from "react";
import Layout from "@layout";
import { Input, InputFile, Select, TextArea, TextAreaEnriquecido } from "@form";

import {
  FaEnvelope,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
  FaIdCard,
  FaT,
  FaTableList,
  FaFilePdf,
} from "react-icons/fa6";

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const token = "2cdc3391c29d5d86578e62d19ce8fee669f45db0f3ace43becfdf722415d0fbf67a4db19debfc9e38dd73a9d2c3162ea26147437bdd25ec14bd599f7920c716d7ab4305c8925a95c67d9a4fab08eff350fb2854200c81b5da220c91eb59aee1a591394c461ce4007da61d25cb2ebdd69abe6dcbc1bd71e87a697e42ddcd54ac4";

    try {
      const data = new FormData();
      data.append("files", formData.archivo); 

      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      // Maneja la respuesta exitosa aquí
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
    } finally {
      setLoading(false);
    }

    /*  fetch("http://localhost:8000/cargar-trabajo", {
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
      .catch((error) => console.error(error)); */
  };

  return (
    <Layout>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="container-info-user">
            <Input
              icono={<FaRegFaceGrin />}
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombreAutor}
              valueChange={(e) =>
                setFormData({ ...formData, nombreAutor: e.target.value })
              }
            />
            <Input
              icono={<FaRegFaceGrinBeam />}
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellidoAutor}
              valueChange={(e) =>
                setFormData({ ...formData, apellidoAutor: e.target.value })
              }
            />
            <Input
              icono={<FaIdCard />}
              type="number"
              name="cedula"
              placeholder="Cedula"
              value={formData.cedulaAutor}
              valueChange={(e) =>
                setFormData({ ...formData, cedulaAutor: e.target.value })
              }
            />
            <Input
              icono={<FaEnvelope />}
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
              icono={<FaT />}
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
              icono={<FaTableList />}
              name="categoria"
              placeholder="categoria"
              value={formData.categoria}
              valueChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
            />
            <InputFile
              icono={<FaFilePdf />}
              id="file"
              name="file"
              placeholder="Cargar archivo PDF"
              valueChange={(e: any) => {
                setFormData({ ...formData, archivo: e });
              }}
            />

            <TextAreaEnriquecido
              placeholder="Resumen del trabajo"
              value={formData.descripcion}
              valueChange={(value) =>
                setFormData({ ...formData, descripcion: value })
              }
            />
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
