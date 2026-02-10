"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validarEmail = (valor: string) => {
    setEmail(valor);

    if (!valor.endsWith("@alumno.ieselrincon.es")) {
      setError("El correo debe terminar en @alumno.ieselrincon.es");
    } else {
      setError("");
    }
  };

  const puedeEntrar =
    email.endsWith("@alumno.ieselrincon.es") && password.length >= 6;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00b4ff", // <-- tu azul nuevo
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          border: "2px solid black",
          width: "380px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <Image
            src="/logo.png"
            alt="Logo del proyecto"
            width={120}
            height={120}
            style={{ margin: "0 auto" }}
          />
        </div>

        <h2 style={{ color: "black", marginBottom: "15px" }}>
          Iniciar sesión en puente joven
        </h2>

        <input
          type="email"
          placeholder="usuario@alumno.ieselrincon.es"
          value={email}
          onChange={(e) => validarEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", color: "black", border: "2px solid black", outline: "none" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px", color: "black", border: "2px solid black", outline: "none" }}
        />

        <button
          disabled={!puedeEntrar}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: puedeEntrar ? "black" : "gray",
            color: "white",
            border: "none",
            cursor: puedeEntrar ? "pointer" : "not-allowed",
          }}
        >
          Iniciar sesión
        </button>

        <div style={{ marginTop: "15px" }}>
          <a href="/register" style={{ display: "block", color: "black" }}>
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
