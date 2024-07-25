/* import React, { useState, useEffect } from "react";
import Layout from "@layout";
import { Input, InputFile, Select, TextAreaEnriquecido } from "@form";

import {
  FaEnvelope,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
  FaIdCard,
  FaT,
  FaTableList,
  FaFilePdf,
} from "react-icons/fa6";
import useCategorias from "./hook/useCategorias";
import handleSubmit from "./hook/handleSubmit";

import { STRAPI_API_URL, STRAPI_TOKEN } from "@env";

interface CargarTrabajoProps {}

const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
  const [loading, setLoading] = useState(false);

  const backendUrl = STRAPI_API_URL;
  const strapiToken = STRAPI_TOKEN;

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

  const categorias = useCategorias(backendUrl, strapiToken);

  return (
    <Layout>
      <div className="container-form">
        <form
          onSubmit={(e) =>
            handleSubmit(e, formData, setLoading, backendUrl, strapiToken)
          }
        >
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
              data={categorias}
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
              placeholder="Cargar archivo PDF (TEG | TG | TD)"
              valueChange={(e: any) => {
                setFormData({ ...formData, archivo: e });
              }}
            />

            <TextAreaEnriquecido
              placeholder="Resumen del trabajo"
              content={true}
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
 */

interface CargarTrabajoProps {
    
}
 
const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
    return ( <h1>t</h1> );
}
 
export default CargarTrabajo;