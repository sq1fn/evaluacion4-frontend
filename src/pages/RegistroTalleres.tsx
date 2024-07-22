import React, { useEffect, useState } from "react";
import { recuperarTalleres, actualizarTaller, eliminarTaller } from "@/firebase/promesas";
import { Taller } from "@/interfaces/Taller";
import { Button, Table, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { TiDelete, TiEdit } from "react-icons/ti";
import Menu from "./Menu";

const RegistroTalleres = () => {
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [tallerSeleccionado, setTallerSeleccionado] = useState<Taller | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const talleresData = await recuperarTalleres();
                setTalleres(talleresData);
                setLoading(false);
            } catch (e) {
                setError("Error al recuperar los talleres.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const EditarElemento = (taller: Taller) => {
        setTallerSeleccionado(taller);
        setMostrarModalEditar(true);
    };

    const EliminarElemento = (taller: Taller) => {
        setTallerSeleccionado(taller);
        setMostrarModalEliminacion(true);
    };

    const [mostrarModalEditar, setMostrarModalEditar] = useState<boolean>(false);
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState<boolean>(false);

    const cerrarModalEditar = () => setMostrarModalEditar(false);
    const cerrarModalEliminacion = () => setMostrarModalEliminacion(false);

    const handleUpdate = () => {
        if (tallerSeleccionado) {
            actualizarTaller(tallerSeleccionado).then(() => {
                console.log("Taller actualizado correctamente");
                cerrarModalEditar();
                recuperarTalleres().then((talleresData) => {
                    setTalleres(talleresData);
                });
            });
        }
    };

    const EliminarElementoConfirm = () => {
        if (tallerSeleccionado && tallerSeleccionado.key) {
            eliminarTaller(tallerSeleccionado.key).then(() => {
                console.log("Taller eliminado correctamente");
                cerrarModalEliminacion();
                recuperarTalleres().then((talleresData) => {
                    setTalleres(talleresData);
                });
            });
        }
    };

    return (
        <>
            <Menu />
            <h1>Registros de Talleres</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Temática</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Término</th>
                            <th>Tallerista</th>
                            <th>Cupos Disponibles</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {talleres.map((taller) => (
                            <tr>
                                <td>{taller.titulo}</td>
                                <td>{taller.tematica}</td>
                                <td>{taller.fecha_inicio}</td>
                                <td>{taller.fecha_termino}</td>
                                <td>{taller.tallerista}</td>
                                <td>{taller.cuposDisponibles}</td>
                                <td>{taller.descripcion}</td>
                                <td>
                                    <Button variant="success" onClick={() => EditarElemento(taller)}>
                                        <TiEdit/>
                                    </Button>
                                    <Button variant="danger" onClick={() => EliminarElemento(taller)}>
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
                    <Modal.Title>Editar Taller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tallerSeleccionado && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={tallerSeleccionado.titulo}
                                    name="titulo"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, titulo: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Temática</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={tallerSeleccionado.tematica}
                                    name="tematica"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, tematica: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha de Inicio</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={tallerSeleccionado.fecha_inicio}
                                    name="fecha_inicio"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, fecha_inicio: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha de Término</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={tallerSeleccionado.fecha_termino}
                                    name="fecha_termino"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, fecha_termino: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tallerista</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={tallerSeleccionado.tallerista}
                                    name="tallerista"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, tallerista: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Cupos Disponibles</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={tallerSeleccionado.cuposDisponibles}
                                    name="cuposDisponibles"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, cuposDisponibles: +e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={tallerSeleccionado.descripcion}
                                    name="descripcion"
                                    onChange={(e) => setTallerSeleccionado({ ...tallerSeleccionado, descripcion: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEditar}>Cerrar</Button>
                    <Button variant="primary" onClick={handleUpdate}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarModalEliminacion} onHide={cerrarModalEliminacion}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el taller {tallerSeleccionado?.titulo}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModalEliminacion}>Cancelar</Button>
                    <Button variant="danger" onClick={EliminarElementoConfirm}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegistroTalleres;
