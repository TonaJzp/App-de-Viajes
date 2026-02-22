export default function TarjetaEsqueleto() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 animate-pulse">
            {/* Espacio imagen */}
            <div className="h-56 bg-slate-200" />

            {/* Espacio contenido */}
            <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="h-5 bg-slate-200 rounded-lg w-3/5" />
                    <div className="h-6 bg-slate-200 rounded-lg w-14" />
                </div>
                <div className="space-y-2">
                    <div className="h-3.5 bg-slate-100 rounded w-full" />
                    <div className="h-3.5 bg-slate-100 rounded w-4/5" />
                </div>
                <div className="h-3 bg-slate-100 rounded w-24 mt-4" />
            </div>
        </div>
    );
}
