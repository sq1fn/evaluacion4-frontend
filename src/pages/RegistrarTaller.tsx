import React, { useState, useEffect } from "react";
import { Taller } from "@/interfaces/Taller";
import { registrarTaller, recuperarTalleristas } from "@/firebase/promesas";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import Menu from "./Menu";
import { Tallerista } from "@/interfaces/Tallerista"; // Asegúrate de tener esta importación

const initialStateTaller: Taller = {
  titulo: '',
  tematica: '',
  fecha_inicio: '',
  fecha_termino: '',
  tallerista: '',
  cuposDisponibles: 0,
  descripcion: '',
};

const RegistrarTaller = () => {
  const [taller, setTaller] = useState<Taller>(initialStateTaller);
  const [talleristas, setTalleristas] = useState<Tallerista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalleristas = async () => {
      try {
        const data = await recuperarTalleristas();
        setTalleristas(data);
      } catch (e) {
        setError("No se pudieron recuperar los talleristas");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTalleristas();
  }, []);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setTaller({ ...taller, [name]: value });
  };

  const registrar = () => {
    registrarTaller(taller)
      .then(() => {
        alert("Taller registrado con éxito");
      })
      .catch((e: any) => {
        alert("No se pudo registrar el taller");
        console.log(e);
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <h1>REGISTRO DE UN TALLER</h1>
      <Form>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Título"
            name="titulo"
            value={taller.titulo}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group controlId="formTematica">
          <Form.Label>Temática</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Temática"
            name="tematica"
            value={taller.tematica}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group controlId="formFechaInicio">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingrese Fecha de Inicio"
            name="fecha_inicio"
            value={taller.fecha_inicio}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group controlId="formFechaTermino">
          <Form.Label>Fecha de Término</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingrese Fecha de Término"
            name="fecha_termino"
            value={taller.fecha_termino}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group controlId="formTallerista">
          <Form.Label>Tallerista</Form.Label>
          <Form.Control
            as="select"
            name="tallerista"
            value={taller.tallerista}
            onChange={manejarCambio}
          >
            <option value="">Selecciona un tallerista</option>
            {talleristas.map((tallerista) => (
              <option key={tallerista.nombre} value={tallerista.nombre}>
                {tallerista.nombre} {tallerista.apellido}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formCuposDisponibles">
          <Form.Label>Cupos Disponibles</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese Cupos Disponibles"
            name="cuposDisponibles"
            value={taller.cuposDisponibles}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ingrese Descripción"
            name="descripcion"
            value={taller.descripcion}
            onChange={manejarCambio}
          />
        </Form.Group>

        <Button variant="success" onClick={registrar}>
          Registrar
        </Button>
      </Form>
    </>
  );
};

export default RegistrarTaller;
