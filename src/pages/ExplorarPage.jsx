import { useState, useEffect } from 'react';
import { Compass, AlertTriangle, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import { getViajes } from '@/services/api';
import TripCard from '@/components/TripCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import SkeletonCard from '@/components/SkeletonCard';

const ITEMS_PER_PAGE = 12;

export default function ExplorarPage() {
    const [viajes, setViajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getViajes()
            .then((data) => setViajes(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const filteredViajes = viajes.filter((viaje) => {
        const matchesSearch = viaje.nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'Todos' || viaje.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredViajes.length / ITEMS_PER_PAGE);
    const paginatedViajes = filteredViajes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Page header */}
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

            {/* Filters — floating card */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        <CategoryFilter
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>
                </div>
            </div>

            {/* Results grid */}
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

                {/* Loading skeletons */}
                {loading && !error && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-5 w-44 bg-slate-200 rounded-lg animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-slate-500">
                                <span className="font-bold text-slate-800">
                                    {filteredViajes.length}
                                </span>{' '}
                                {filteredViajes.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
                                {totalPages > 1 && (
                                    <span className="text-slate-400">
                                        {' '}· Página {currentPage} de {totalPages}
                                    </span>
                                )}
                            </p>
                        </div>

                        {paginatedViajes.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                    {paginatedViajes.map((viaje) => (
                                        <TripCard key={viaje.id} viaje={viaje} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === 1
                                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm hover:shadow'
                                                }`}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Anterior
                                        </button>

                                        <div className="flex items-center gap-1.5">
                                            {getPageNumbers()[0] > 1 && (
                                                <>
                                                    <button
                                                        onClick={() => goToPage(1)}
                                                        className="w-10 h-10 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
                                                    >
                                                        1
                                                    </button>
                                                    {getPageNumbers()[0] > 2 && (
                                                        <span className="text-slate-400 px-1">…</span>
                                                    )}
                                                </>
                                            )}
                                            {getPageNumbers().map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === page
                                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                                                <>
                                                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                                                        <span className="text-slate-400 px-1">…</span>
                                                    )}
                                                    <button
                                                        onClick={() => goToPage(totalPages)}
                                                        className="w-10 h-10 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
                                                    >
                                                        {totalPages}
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === totalPages
                                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 shadow-sm hover:shadow'
                                                }`}
                                        >
                                            Siguiente
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
                                        setSearchTerm('');
                                        setSelectedCategory('Todos');
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

