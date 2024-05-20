import React, { useState } from "react";
import Layout from "@layout";
import { Input, Select } from "@form";
import { FaUser } from "react-icons/fa6";

interface CargarTrabajoProps {}

const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
  const [formData, setFormData] = useState({
    nombreAutor: "",
    apellidoAutor: "",
    cedulaAutor: "",
    categoria: "",
    titulo: "",
    descripcion: "",
    archivo: null,
  });

  const categoriaData: (string | number)[] = [];

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

          <Select data={categoriaData} />
        </form>
      </div>
    </Layout>
  );
};

export default CargarTrabajo;
