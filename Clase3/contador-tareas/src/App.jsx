import { useState, useEffect, useMemo } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const agregarTarea = () => {
  if (nuevaTarea && duracion) {
    const nuevaTareaObj = {
      nombre: nuevaTarea,
      duracion: parseInt(duracion),
    };

    setTareas([...tareas, nuevaTareaObj]);

    setNuevaTarea("");
    setDuracion("");
  }
};
const tareasFiltradas = tareas.filter((tarea) => {
  if (filtro === "cortas") {
    return tarea.duracion < 30;
  }

  if (filtro === "largas") {
    return tarea.duracion >= 30;
  }

  return true;
});

const calcularTiempoTotal = useMemo(() => {
  console.log("Calculando tiempo total...");

  return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
}, [tareas]);
useEffect(() => {
  document.title = `Total: ${calcularTiempoTotal} minutos`;
}, [calcularTiempoTotal]);

  return (
    <div>
      <h1>Contador de Tareas</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />

        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración en minutos"
        />

        <button onClick={agregarTarea}>Agregar tarea</button>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="cortas">Menos de 30 minutos</option>
        <option value="largas">30 minutos o más</option>
        </select>
        <h2>Tareas</h2>

<ul>
  {tareasFiltradas.map((tarea, index) => (
    <li key={index}>
      {tarea.nombre}: {tarea.duracion} minutos
    </li>
  ))}
  <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
</ul>
      </div>
    </div>
  );
}



export default App;