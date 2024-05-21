import React, { useState } from "react";
import Layout from "@layout";
import { Input, Select } from "@form";
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
    archivo: null,
  });

  return (
    <Layout>
      <div className="container-form">
        <form>
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
            
          />

          <Input
            icono={<FaUser />}
            type="file"
            name="titulo"
            placeholder="titulo"
            value={formData.titulo}
            valueChange={(e) =>
              setFormData({ ...formData, titulo: e.target.value })
            }
          />
        </form>
      </div>
    </Layout>
  );
};

export default CargarTrabajo;
