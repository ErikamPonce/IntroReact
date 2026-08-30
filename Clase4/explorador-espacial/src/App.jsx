import React, { useState, useEffect, useMemo, useRef } from "react";
import Planeta from "./Planeta";

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");

  const [planetasVisitados, setPlanetasVisitados] = useState(() => {
    const planetasGuardados = localStorage.getItem("planetas");
    return planetasGuardados ? JSON.parse(planetasGuardados) : [];
  });

  const [nombrePlaneta, setNombrePlaneta] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);

  const inputImagenRef = useRef(null);

  useEffect(() => {
    console.log("El panel de control está listo");

    const intervalo = setInterval(() => {
      setDistancia((distanciaActual) => distanciaActual + 10);

      setCombustible((combustibleActual) => {
        if (combustibleActual <= 0) {
          return 0;
        }

        return combustibleActual - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel de control se ha apagado");
    };
  }, []);

  useEffect(() => {
    console.log("Combustible actualizado");
  }, [combustible]);

  useEffect(() => {
    localStorage.setItem(
      "planetas",
      JSON.stringify(planetasVisitados)
    );
  }, [planetasVisitados]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const convertirImagen = (archivo) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.readAsDataURL(archivo);

      lector.onload = () => {
        resolve(lector.result);
      };

      lector.onerror = (error) => {
        reject(error);
      };
    });
  };

  const aterrizar = async () => {
    if (
      nombrePlaneta.trim() === "" ||
      descripcion.trim() === ""
    ) {
      alert("Completa el nombre y la descripción");
      return;
    }

    let imagenBase64 = null;

    if (imagen) {
      try {
        imagenBase64 = await convertirImagen(imagen);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
        alert("No se pudo cargar la imagen");
        return;
      }
    }

    const nuevoPlaneta = {
      id: Date.now(),
      nombre: nombrePlaneta,
      descripcion: descripcion,
      imagen: imagenBase64
    };

    setEstadoNave("Aterrizando");

    setPlanetasVisitados([
      ...planetasVisitados,
      nuevoPlaneta
    ]);

    setNombrePlaneta("");
    setDescripcion("");
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = "";
    }
  };

  const eliminarPlaneta = (id) => {
    const nuevosPlanetas = planetasVisitados.filter(
      (planeta) => planeta.id !== id
    );

    setPlanetasVisitados(nuevosPlanetas);
  };

  const editarPlaneta = (id) => {
    const planeta = planetasVisitados.find(
      (planeta) => planeta.id === id
    );

    if (!planeta) {
      return;
    }

    const nuevoNombre = prompt(
      "Nuevo nombre del planeta:",
      planeta.nombre
    );

    if (nuevoNombre === null) {
      return;
    }

    const nuevaDescripcion = prompt(
      "Nueva descripción:",
      planeta.descripcion
    );

    if (nuevaDescripcion === null) {
      return;
    }

    const planetasActualizados = planetasVisitados.map(
      (planeta) => {
        if (planeta.id === id) {
          return {
            ...planeta,
            nombre: nuevoNombre,
            descripcion: nuevaDescripcion
          };
        }

        return planeta;
      }
    );

    setPlanetasVisitados(planetasActualizados);
  };

  return (
    <div>
      <h1>Bitácora de Exploración</h1>

      <h2>Panel de Control</h2>

      <p>Distancia: {distancia} km</p>
      <p>Combustible: {combustible}%</p>
      <p>{mensajeEstado}</p>

      <h2>Registrar planeta</h2>

      <input
        type="text"
        placeholder="Nombre del planeta"
        value={nombrePlaneta}
        onChange={(e) => setNombrePlaneta(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Descripción del planeta"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br />
      <br />

      <input
        type="file"
        accept="image/*"
        ref={inputImagenRef}
        onChange={(e) => setImagen(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={aterrizar}>
        Aterrizar y registrar
      </button>

      <h2>Planetas visitados</h2>

      {planetasVisitados.length === 0 ? (
        <p>No hay planetas registrados</p>
      ) : (
        planetasVisitados.map((planeta) => (
          <Planeta
            key={planeta.id}
            nombre={planeta.nombre}
            descripcion={planeta.descripcion}
            imagen={planeta.imagen}
            onDelete={() => eliminarPlaneta(planeta.id)}
            onEdit={() => editarPlaneta(planeta.id)}
          />
        ))
      )}
    </div>
  );
}

export default App;
