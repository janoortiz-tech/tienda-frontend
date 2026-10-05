export default function ProductCard({ producto }) {
    return (
        <div className="max-w-xs rounded-xl border border-slate-700 bg-slate-800 p-4 text-white shadow-md transition-all hover:shadow-xl">
            <img
                src={producto?.imagen || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400"}
                alt={producto?.nombre}
                className="h-44 w-full rounded-lg object-cover mb-3"
            />
            <h3 className="text-lg font-bold text-slate-100">{producto?.nombre}</h3>
            <p className="my-2 text-xl font-semibold text-emerald-400">
                ${producto?.precio}
            </p>
            <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700">
                Agregar al carrito
            </button>
        </div>
    );
}