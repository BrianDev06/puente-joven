"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("alumno");
  const [error, setError] = useState("");

  const validarEmail = (valor: string) => {
    setEmail(valor);

    if (!valor.endsWith("@alumno.ieselrincon.es")) {
      setError("El correo debe terminar en @alumno.ieselrincon.es");
    } else {
      setError("");
    }
  };

  const puedeRegistrar =
    name.trim() !== "" &&
    email.endsWith("@alumno.ieselrincon.es") &&
    password.length >= 6;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00b4ff",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          border: "2px solid black",
          width: "380px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registro
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            color: "black",
          }}
        />

        <input
          type="email"
          placeholder="usuario@alumno.ieselrincon.es"
          value={email}
          onChange={(e) => validarEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "5px",
            color: "black",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          type="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            color: "black",
          }}
        />

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            color: "black",
          }}
        >
          <option value="admin">Admin</option>
          <option value="profesor">Profesor</option>
          <option value="alumno">Alumno</option>
        </select>

        <button
          disabled={!puedeRegistrar}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: puedeRegistrar ? "black" : "gray",
            color: "white",
            border: "none",
            cursor: puedeRegistrar ? "pointer" : "not-allowed",
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

