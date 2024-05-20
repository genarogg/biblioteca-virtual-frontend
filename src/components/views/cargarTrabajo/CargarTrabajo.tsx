import React, { useState } from "react";
import Layout from "@layout";
import { Input } from "@form";
import { FaUser } from "react-icons/fa6";

interface CargarTrabajoProps {}

const CargarTrabajo: React.FC<CargarTrabajoProps> = () => {
  const [formState, setFormState] = useState({
    categoria: "",
    nombreAutor: "",
    apellidoAutor: "",
    cedulaAutor: "",
    titulo: "",
    descripcion: "",
    archivo: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="containerForm">
        <form>
          <Input
            icono={<FaUser />}
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formState.nombreAutor}
            valueChange={handleChange}
          />
        </form>
      </div>
    </Layout>
  );
};

export default CargarTrabajo;
