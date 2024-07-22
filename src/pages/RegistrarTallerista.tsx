import React, { useState } from "react";
import { Tallerista } from "@/interfaces/Tallerista";
import { registrarTallerista } from "@/firebase/promesas";
import { Button, Form } from "react-bootstrap";
import Menu from "./Menu";

const initialStateTallerista: Tallerista = {
  nombre: '',
  apellido: '',
  edad: 0,
  correo: '',
  ocupacion: '',
  biografia: '',
  numero_talleres: 0,
  key: '', 
};

const RegistrarTallerista = () => {
  const [tallerista, setTallerista] = useState<Tallerista>(initialStateTallerista);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setTallerista({ ...tallerista, [name]: value });
  };

  const registrar = async () => {
    try {
      await registrarTallerista(tallerista);
      alert("Tallerista registrado con éxito");
      setTallerista(initialStateTallerista); 
    } catch (e) {
      alert("No se pudo registrar el tallerista");
      console.log(e);
    }
  };

  return (
    <>
    <Menu></Menu>
        <h1>REGISTRO DE UN TALLERISTA</h1>
      <Form>
        <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Nombre"
            name="nombre"
            value={tallerista.nombre}
            onChange={manejarCambio}
          />

        <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Apellido"
            name="apellido"
            value={tallerista.apellido}
            onChange={manejarCambio}
          />

        <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese Edad"
            name="edad"
            value={tallerista.edad}
            onChange={manejarCambio}
          />

        <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese Correo"
            name="correo"
            value={tallerista.correo}
            onChange={manejarCambio}
          />

        <Form.Label>Ocupación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Ocupación"
            name="ocupacion"
            value={tallerista.ocupacion}
            onChange={manejarCambio}
          />

        <Form.Label>Biografía</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ingrese Biografía"
            name="biografia"
            value={tallerista.biografia}
            onChange={manejarCambio}
          />

        <Button variant="success" onClick={registrar}>
          Registrar
        </Button>
      </Form>
    </>
  );
};

export default RegistrarTallerista;
