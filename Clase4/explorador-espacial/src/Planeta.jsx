import React, { useEffect } from "react";

function Planeta({
  nombre,
  descripcion,
  imagen,
  onDelete,
  onEdit
}) {
  useEffect(() => {
    console.log(`El planeta ${nombre} ha aparecido`);

    return () => {
      console.log(`El planeta ${nombre} ha desaparecido`);
    };
  }, [nombre]);

  return (
    <div>
      <h3>{nombre}</h3>

      <p>{descripcion}</p>

      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          width="300"
        />
      )}

      <br />
      <br />

      <button onClick={onEdit}>
        Editar
      </button>

      <button onClick={onDelete}>
        Eliminar
      </button>
    </div>
  );
}

export default Planeta;
