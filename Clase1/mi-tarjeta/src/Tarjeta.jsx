function Tarjeta() {
  const nombre = "América Alarcón Ponce";
  const profesion = "Estudiante en Desarrollo de Software Multiplataforma";
  const mensaje = "Holiss!";

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <h2>{nombre}</h2>
      <h4>{profesion}</h4>
      <p>{mensaje}</p>
    </div>
  );
}

export default Tarjeta;