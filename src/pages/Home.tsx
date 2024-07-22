import React, { useEffect, useState } from "react";
import { recuperarTalleristas, actualizarTallerista, eliminarTallerista } from "@/firebase/promesas";
import { Tallerista } from "@/interfaces/Tallerista";
import { Button, Table, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { TiDelete, TiEdit } from "react-icons/ti";
import Menu from "./Menu";

const RegistroTalleristas = () => {
    const [talleristas, setTalleristas] = useState<Tallerista[]>([]);
    const [talleristaSeleccionado, setTalleristaSeleccionado] = useState<Tallerista | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const talleristasData = await recuperarTalleristas();
                setTalleristas(talleristasData);
                setLoading(false);
            } catch (e) {
                setError("Error al recuperar los talleristas.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const EditarElemento = (tallerista: Tallerista) => {
        setTalleristaSeleccionado(tallerista);
        setMostrarModalEditar(true);
    };

    const EliminarElemento = (tallerista: Tallerista) => {
        setTalleristaSeleccionado(tallerista);
        setMostrarModalEliminacion(true);
    };

    const [mostrarModalEditar, setMostrarModalEditar] = useState<boolean>(false);
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState<boolean>(false);

    const cerrarModalEditar = () => setMostrarModalEditar(false);
    const cerrarModalEliminacion = () => setMostrarModalEliminacion(false);

    const ActualizarElemento= () => {
        if (talleristaSeleccionado) {
            actualizarTallerista(talleristaSeleccionado).then(() => {
                console.log("Tallerista actualizado correctamente");
                cerrarModalEditar();
                recuperarTalleristas().then((talleristasData) => {
                    setTalleristas(talleristasData);
                });
            });
        }
    };

    const ConfirmarEliminacion = () => {
        if (talleristaSeleccionado) {
            eliminarTallerista(talleristaSeleccionado).then(() => {
                console.log("Tallerista eliminado correctamente");
                cerrarModalEliminacion();
                recuperarTalleristas().then((talleristasData) => {
                    setTalleristas(talleristasData);
                });
            });
        }
    };

    return (
        <>
            <Menu />
            <h1>Registros de Talleristas</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Correo</th>
                            <th>Ocupación</th>
                            <th>Biografía</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talleristas.map((tallerista) => (
                            <tr>
                                <td>{tallerista.nombre}</td>
                                <td>{tallerista.apellido}</td>
                                <td>{tallerista.edad}</td>
                                <td>{tallerista.correo}</td>
                                <td>{tallerista.ocupacion}</td>
                                <td>{tallerista.biografia}</td>
                                <td>
                                    <Button variant="success" onClick={() => EditarElemento(tallerista)}>
                                        <TiEdit />
                                    </Button>
                                    <Button variant="danger" onClick={() => EliminarElemento(tallerista)}>
                                        <TiDelete />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={mostrarModalEditar} onHide={cerrarModalEditar}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Tallerista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {talleristaSeleccionado && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={talleristaSeleccionado.nombre}
                                    name="nombre"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, nombre: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={talleristaSeleccionado.apellido}
                                    name="apellido"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, apellido: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={talleristaSeleccionado.edad}
                                    name="edad"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, edad: +e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={talleristaSeleccionado.correo}
                                    name="correo"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, correo: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ocupación</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={talleristaSeleccionado.ocupacion}
                                    name="ocupacion"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, ocupacion: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Biografía</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={talleristaSeleccionado.biografia}
                                    name="biografia"
                                    onChange={(e) => setTalleristaSeleccionado({ ...talleristaSeleccionado, biografia: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEditar}>Cerrar</Button>
                    <Button variant="primary" onClick={ActualizarElemento}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarModalEliminacion} onHide={cerrarModalEliminacion}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar al tallerista {talleristaSeleccionado?.nombre} {talleristaSeleccionado?.apellido}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEliminacion}>Cancelar</Button>
                    <Button variant="danger" onClick={ConfirmarEliminacion}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegistroTalleristas;
