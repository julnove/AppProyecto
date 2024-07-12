// tests/taskManager.test.js
const { agregarTarea, obtenerTareas, eliminarTarea, editarTarea, cambiarEstado, buscarTareaPorId } = require('../taskManager.js');

describe('Gestión de Tareas', () => {
  let tarea;

  beforeEach(() => {
    tarea = {
      id: 1,
      titulo: "Tarea de Prueba",
      descripcion: "Descripción de prueba",
      estado: "Pendiente",
      fechaCreacion: new Date(),
      fechaVencimiento: new Date(Date.now() + 86400000) // 1 día en el futuro
    };
    agregarTarea(tarea);
  });

  afterEach(() => {
    eliminarTarea(1);
  });

  test('Debe agregar una tarea correctamente', () => {
    const tareas = obtenerTareas();
    expect(tareas).toHaveLength(1);
    expect(tareas[0].titulo).toBe("Tarea de Prueba");
  });

  test('Debe eliminar una tarea correctamente', () => {
    eliminarTarea(1);
    const tareas = obtenerTareas();
    expect(tareas).toHaveLength(0);
  });

  test('Debe editar una tarea correctamente', () => {
    editarTarea(1, { titulo: "Tarea Editada" });
    const tareaEditada = obtenerTareas().find(t => t.id === 1);
    expect(tareaEditada.titulo).toBe("Tarea Editada");
  });

  test('Debe cambiar el estado de una tarea correctamente', () => {
    cambiarEstado(1, "Completada");
    const tareaCompletada = obtenerTareas().find(t => t.id === 1);
    expect(tareaCompletada.estado).toBe("Completada");
  });

  test('Debe buscar una tarea por ID correctamente', () => {
    const tareaEncontrada = buscarTareaPorId(1);
    expect(tareaEncontrada.titulo).toBe("Tarea de Prueba");
  });
});
