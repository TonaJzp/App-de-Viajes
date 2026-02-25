import { useState, useEffect } from 'react';
import { Heart, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { obtenerViajes } from '@/services/api';
import { useFavoritos } from '@/context/FavoritosContext';
import TarjetaViaje from '@/components/TarjetaViaje';
import TarjetaEsqueleto from '@/components/TarjetaEsqueleto';

export default function PaginaFavoritos() {
    const { favoritos } = useFavoritos();
    const [viajes, setViajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCargando(true);
        setError(null);
        obtenerViajes()
            .then((datos) => {
                const viajesFav = datos.filter((v) => favoritos.includes(v.id));
                setViajes(viajesFav);
            })
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, [favoritos]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <Heart className="h-6 w-6 fill-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold">Mis Favoritos</h1>
                    </div>
                    <p className="text-rose-100 text-lg max-w-2xl leading-relaxed">
                        Aquí están los destinos que has guardado para tu próxima aventura.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8 pb-20">
                {cargando && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {/* 3 Tarjetas de esqueleto */}
                        <TarjetaEsqueleto />
                        <TarjetaEsqueleto />
                        <TarjetaEsqueleto />
                    </div>
                )}
                {error && (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-200/60">
                        <div className="bg-rose-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="h-8 w-8 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Error al cargar favoritos</h3>
                        <p className="text-slate-500 mb-6">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors">Reintentar</button>
                    </div>
                )}
                {!cargando && !error && (
                    <>
                        {viajes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {viajes.map((v) => <TarjetaViaje key={v.id} viaje={v} />)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-10 sm:p-16 text-center">
                                <div className="bg-slate-50 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <Heart className="h-10 w-10 text-slate-300" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Aún no tienes favoritos</h2>
                                <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">Explora nuestros destinos y guarda los que más te gusten haciendo clic en el corazón.</p>
                                <Link to="/explorar" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 hover:shadow-xl hover:-translate-y-0.5">
                                    Explorar Destinos <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
