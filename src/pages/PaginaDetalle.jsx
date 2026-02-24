import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Heart,
    Star,
    DollarSign,
    Tag,
    AlertTriangle,
} from 'lucide-react';
import { obtenerViajePorId } from '@/services/api';
import { useFavoritos } from '@/context/FavoritosContext';

const coloresCategorias = {
    Playa: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    Montaña: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Ciudad: 'bg-violet-50 text-violet-700 border border-violet-200',
    Cultural: 'bg-amber-50 text-amber-700 border border-amber-200',
    Aventura: 'bg-rose-50 text-rose-700 border border-rose-200',
};

const iconosCategorias = { Playa: '🏖️', Montaña: '🏔️', Ciudad: '🏙️', Cultural: '🏛️', Aventura: '⛺' };

export default function PaginaDetalle() {
    const { id } = useParams();
    const navegar = useNavigate();
    const { toggleFavorito, esFavorito } = useFavoritos();

    const [viaje, setViaje] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [estaSobre, setEstaSobre] = useState(false);

    const esFav = viaje ? esFavorito(viaje.id) : false;

    useEffect(() => {
        setCargando(true);
        setError(null);
        obtenerViajePorId(id)
            .then((datos) => setViaje(datos))
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, [id]);

    if (cargando) {
        return (
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-12 animate-pulse">
                <div className="h-5 w-36 bg-slate-200 rounded-lg mb-8" />
                <div className="h-72 sm:h-[28rem] bg-slate-200 rounded-3xl mb-10" />
                <div className="space-y-4">
                    <div className="h-8 w-2/3 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-1/3 bg-slate-100 rounded" />
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <div className="bg-rose-50 p-5 rounded-2xl mb-5">
                    <AlertTriangle className="h-10 w-10 text-rose-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Destino no encontrado</h2>
                <p className="text-slate-500 mb-6">{error}</p>
                <button
                    onClick={() => navegar('/explorar')}
                    className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary-700 transition-colors"
                >
                    Volver a Explorar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
                {/* Volver */}
                <button
                    onClick={() => navegar('/explorar')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a Explorar
                </button>

                {/* Imagen principal */}
                <div
                    className="relative h-72 sm:h-[28rem] rounded-3xl overflow-hidden shadow-xl"
                    onMouseEnter={() => setEstaSobre(true)}
                    onMouseLeave={() => setEstaSobre(false)}
                >
                    <img
                        src={viaje.imagen}
                        alt={viaje.nombre}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${estaSobre ? 'scale-105' : 'scale-100'
                            }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Categoría */}
                    <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-sm ${coloresCategorias[viaje.categoria]}`}>
                            {iconosCategorias[viaje.categoria]} {viaje.categoria}
                        </span>
                    </div>

                    {/* Favorito */}
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={() => toggleFavorito(viaje.id)}
                            className={`p-3 rounded-xl backdrop-blur-md transition-all shadow-lg hover:scale-105 ${esFav
                                ? 'bg-rose-500 text-white'
                                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500'
                                }`}
                        >
                            <Heart className={`h-5 w-5 ${esFav ? 'fill-white' : ''}`} />
                        </button>
                    </div>

                    {/* Título sobre imagen */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                            {viaje.nombre}
                        </h1>
                    </div>
                </div>

                {/* Cuadrícula de contenido */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                    {/* Principal */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                Sobre este destino
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-base">
                                {viaje.descripcion}
                            </p>
                        </div>

                        {/* Tarjetas de info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-amber-50 p-2.5 rounded-xl">
                                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                    </div>
                                    <span className="text-sm text-slate-500">Valoración</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{viaje.rating}/5</p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-emerald-50 p-2.5 rounded-xl">
                                        <DollarSign className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-slate-500">Precio estimado</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    {viaje.precio_estimado.toLocaleString('es-ES')} €
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-violet-50 p-2.5 rounded-xl">
                                        <Tag className="h-5 w-5 text-violet-500" />
                                    </div>
                                    <span className="text-sm text-slate-500">Categoría</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    {iconosCategorias[viaje.categoria]} {viaje.categoria}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Barra lateral */}
                    <div>
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-sm text-slate-500 mb-1">Desde</div>
                                <div className="text-4xl font-black text-slate-900">
                                    {viaje.precio_estimado.toLocaleString('es-ES')} €
                                </div>
                                <div className="text-sm text-slate-400 mt-1">por persona</div>
                            </div>

                            <button
                                onClick={() => toggleFavorito(viaje.id)}
                                className={`w-full py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 mb-3 ${esFav
                                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/25'
                                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25'
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${esFav ? 'fill-white' : ''}`} />
                                {esFav ? 'En Favoritos ✓' : 'Añadir a Favoritos'}
                            </button>

                            <Link
                                to="/crear"
                                className="block w-full py-3.5 rounded-2xl font-semibold transition-all text-center border-2 border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-600"
                            >
                                Crear Itinerario
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
