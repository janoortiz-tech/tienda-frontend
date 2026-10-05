import { useState, useEffect } from "react";
import { getProductos } from "./api";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(0);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await getProductos({ page, limit: 5, nombre: busqueda });
      setProductos(Array.isArray(data) ? data : data.productos || []);
    };

    cargarProductos();
  }, [page, busqueda]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h1>

      {/* Buscador */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
          value={busqueda}
          onChange={(e) => {
            setPage(0);
            setBusqueda(e.target.value);
          }}
        />
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {productos && productos.length > 0 ? (
          productos.map((prod) => (
            <ProductCard key={prod.id || prod._id} producto={prod} />
          ))
        ) : (
          <p className="col-span-full text-center text-slate-400">
            No se encontraron productos.
          </p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
        >
          Anterior
        </button>

        <span className="text-slate-300 font-medium">Página {page + 1}</span>

        <button
          disabled={productos.length < 5}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}