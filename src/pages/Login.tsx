import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";

// Componente para el inicio de sesión
const Login = () => {
  // Variable de estado para almacenar el nombre de usuario
  const [Usuario, setUsuario] = useState(""); 

  // Variable de estado para almacenar la contraseña
  const [Contrasena, setContrasena] = useState("");

  // Función para validar las credenciales del usuario
  const validarUsuario = () => {
    if (Usuario === "admin") {
      if (Contrasena === "admin") {
        // Se redirige a la página del menú principal
        router.push("/MenuPrincipal"); 
      } else {
        // Se muestrar una alerta para contraseña incorrecta
        alert("Contraseña incorrecta"); 
      }
    } else if (Contrasena === "admin") {
      // Se muestra una alerta en el caso que el nombre de usuario sea incorrecto
      alert("Usuario incorrecto"); 
    } else {
      // Se muestra una alerta cuando el nombre de usuario y su contraseña sean incorrectos
      alert("Usuario y contraseña incorrectos"); 
    }
  };
  
  // Hook para la navegación entre páginas
  const router = useRouter();

  // Función que actualiza el estado del nombre de usuario
  const guardarUsuario = (e: any) => {
    setUsuario(e.currentTarget.value);
  };

  // Función que actualiza el estado de la contraseña 
  const guardarContrasena = (e: any) => {
    setContrasena(e.currentTarget.value);
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre usuario"
            value={Usuario}
            onChange={guardarUsuario}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={Contrasena}
            onChange={(c) => {
              guardarContrasena(c);
            }}
          />
        </Form.Group>

        <Button variant="outline-success" onClick={validarUsuario}>
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default Login;