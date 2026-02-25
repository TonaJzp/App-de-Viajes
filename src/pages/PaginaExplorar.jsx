import { useState, useEffect } from 'react';
import { Compass, AlertTriangle, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import { obtenerViajes } from '@/services/api';
import TarjetaViaje from '@/components/TarjetaViaje';
import BarraBusqueda from '@/components/BarraBusqueda';
import FiltroCategorias from '@/components/FiltroCategorias';
import TarjetaEsqueleto from '@/components/TarjetaEsqueleto';

const ITEMS_POR_PAGINA = 12;

export default function PaginaExplorar() {
    const [viajes, setViajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        setCargando(true);
        setError(null);
        obtenerViajes()
            .then((datos) => setViajes(datos))
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    // Reiniciar página al cambiar filtros
    useEffect(() => {
        setPaginaActual(1);
    }, [terminoBusqueda, categoriaSeleccionada]);

    const viajesFiltrados = viajes.filter((viaje) => {
        // Comprueba si el nombre del viaje coincide con el término de búsqueda
        const coincideBusqueda = viaje.nombre
            .toLowerCase()
            .includes(terminoBusqueda.toLowerCase());
        // Comprueba si la categoría del viaje coincide con la categoría seleccionada
        const coincideCategoria =
            categoriaSeleccionada === 'Todos' || viaje.categoria === categoriaSeleccionada;
        return coincideBusqueda && coincideCategoria;
    });

    // Calcula el número total de páginas que van a hacer falta para mostrar todos los viajes
    const totalPaginas = Math.ceil(viajesFiltrados.length / ITEMS_POR_PAGINA);

    // Calcula los viajes que se van a mostrar en la página actual
    const viajesPaginados = viajesFiltrados.slice(
        (paginaActual - 1) * ITEMS_POR_PAGINA,
        paginaActual * ITEMS_POR_PAGINA
    );

    const irAPagina = (pagina) => {
        setPaginaActual(pagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generar números de página visibles
    const obtenerNumerosPagina = () => {
        const paginas = [];
        const maxVisibles = 5;
        let inicio = Math.max(1, paginaActual - Math.floor(maxVisibles / 2));
        let fin = Math.min(totalPaginas, inicio + maxVisibles - 1);
        if (fin - inicio + 1 < maxVisibles) {
            inicio = Math.max(1, fin - maxVisibles + 1);
        }
        for (let i = inicio; i <= fin; i++) {
            paginas.push(i);
        }
        return paginas;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Cabecera */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl">
                            <Compass className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold">Explorar Destinos</h1>
                    </div>
                    <p className="text-primary-100/90 text-lg max-w-2xl leading-relaxed">
                        Descubre lugares increíbles en todo el mundo. Filtra por categoría o
                        busca tu destino ideal.
                    </p>
                </div>
            </div>

            {/* Filtros — tarjeta flotante */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <BarraBusqueda valor={terminoBusqueda} alCambiar={setTerminoBusqueda} />
                        <FiltroCategorias
                            seleccionada={categoriaSeleccionada}
                            alSeleccionar={setCategoriaSeleccionada}
                        />
                    </div>
                </div>
            </div>

            {/* Cuadrícula de resultados */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-12">
                {/* Error */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="bg-rose-50 p-5 rounded-2xl mb-5">
                            <AlertTriangle className="h-10 w-10 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            Error al cargar los destinos
                        </h3>
                        <p className="text-slate-500 mb-6 max-w-md">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Esqueletos de carga */}
                {cargando && !error && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-5 w-44 bg-slate-200 rounded-lg animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {/* Muestra 6 esqueletos de carga */}
                            <TarjetaEsqueleto />
                            <TarjetaEsqueleto />
                            <TarjetaEsqueleto />
                            <TarjetaEsqueleto />
                            <TarjetaEsqueleto />
                            <TarjetaEsqueleto />
                        </div>
                    </div>
                )}

                {/* Resultados */}
                {!cargando && !error && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-slate-500">
                                <span className="font-bold text-slate-800">
                                    {viajesFiltrados.length}
                                </span>{' '}
                                {viajesFiltrados.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
                                {totalPaginas > 1 && (
                                    <span className="text-slate-400">
                                        {' '}· Página {paginaActual} de {totalPaginas}
                                    </span>
                                )}
                            </p>
                        </div>

                        {viajesPaginados.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                    {viajesPaginados.map((viaje) => (
                                        <TarjetaViaje key={viaje.id} viaje={viaje} />
                                    ))}
                                </div>

                                {/* Paginación */}
                                {totalPaginas > 1 && (
                                    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 flex-wrap">
                                        <button
                                            onClick={() => irAPagina(paginaActual - 1)}
                                            disabled={paginaActual === 1}
                                            className={`flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${paginaActual === 1
                                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm hover:shadow'
                                                }`}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            <span className="hidden sm:inline">Anterior</span>
                                        </button>

                                        <div className="flex items-center gap-1 sm:gap-1.5">
                                            {/* Botón página 1 */}
                                            {obtenerNumerosPagina()[0] > 1 && (
                                                <>
                                                    <button
                                                        onClick={() => irAPagina(1)}
                                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
                                                    >
                                                        1
                                                    </button>
                                                    {obtenerNumerosPagina()[0] > 2 && (
                                                        <span className="text-slate-400 px-0.5 sm:px-1">…</span>
                                                    )}
                                                </>
                                            )}
                                            {/* Botones de paginación */}
                                            {obtenerNumerosPagina().map((pagina) => (
                                                <button
                                                    key={pagina}
                                                    onClick={() => irAPagina(pagina)}
                                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-medium transition-all duration-200 ${paginaActual === pagina
                                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm'
                                                        }`}
                                                >
                                                    {pagina}
                                                </button>
                                            ))}
                                            {/* Botón página final */}
                                            {obtenerNumerosPagina()[obtenerNumerosPagina().length - 1] < totalPaginas && (
                                                <>
                                                    {obtenerNumerosPagina()[obtenerNumerosPagina().length - 1] < totalPaginas - 1 && (
                                                        <span className="text-slate-400 px-0.5 sm:px-1">…</span>
                                                    )}
                                                    <button
                                                        onClick={() => irAPagina(totalPaginas)}
                                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
                                                    >
                                                        {totalPaginas}
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => irAPagina(paginaActual + 1)}
                                            disabled={paginaActual === totalPaginas}
                                            className={`flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${paginaActual === totalPaginas
                                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm hover:shadow'
                                                }`}
                                        >
                                            <span className="hidden sm:inline">Siguiente</span>
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="bg-slate-100 p-5 rounded-2xl mb-5">
                                    <SearchX className="h-10 w-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    No se encontraron destinos
                                </h3>
                                <p className="text-slate-500 max-w-md">
                                    Intenta con otro término de búsqueda o cambia la categoría
                                    seleccionada.
                                </p>
                                <button
                                    onClick={() => {
                                        setTerminoBusqueda('');
                                        setCategoriaSeleccionada('Todos');
                                    }}
                                    className="mt-6 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
