export const getProductos = async ({ page = 0, limit = 5, nombre = "" } = {}) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      nombre: nombre
    });

    const response = await fetch(`http://localhost:8000/productos?${params.toString()}`);
    let data = await response.json();

    // Filtro y paginación
    if (Array.isArray(data)) {
      if (nombre.trim() !== "") {
        data = data.filter((prod) =>
          prod.nombre?.toLowerCase().includes(nombre.toLowerCase())
        );
      }
      const inicio = page * limit;
      data = data.slice(inicio, inicio + limit);
    }

    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};