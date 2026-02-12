import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const categoryColors = {
    Playa: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    Montaña: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Ciudad: 'bg-violet-50 text-violet-700 border border-violet-200',
};

const categoryIcons = {
    Playa: '🏖️',
    Montaña: '🏔️',
    Ciudad: '🏙️',
};

export default function TripCard({ viaje }) {
    const [isHovered, setIsHovered] = useState(false);
    const { toggleFavorito, isFavorito } = useFavorites();
    const esFav = isFavorito(viaje.id);

    return (
        <Link
            to={`/explorar/${viaje.id}`}
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${isHovered
                        ? 'shadow-xl shadow-primary-500/10 -translate-y-1.5 border-primary-200'
                        : 'shadow-sm border-slate-200/80'
                    }`}
            >
                {/* Image container */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={viaje.imagen}
                        alt={viaje.nombre}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'
                            }`}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Category badge */}
                    <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryColors[viaje.categoria] || 'bg-slate-100 text-slate-700'
                            }`}
                    >
                        {categoryIcons[viaje.categoria]} {viaje.categoria}
                    </span>

                    {/* Favorite button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorito(viaje.id);
                        }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 ${esFav
                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                                : 'bg-white/70 text-slate-500 hover:bg-white hover:text-rose-500'
                            }`}
                        aria-label={esFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    >
                        <Heart className={`h-4 w-4 ${esFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Price tag */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm">
                        <span className="text-sm font-bold text-slate-900">
                            {viaje.precio_estimado.toLocaleString('es-ES')} €
                        </span>
                    </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-1">
                            {viaje.nombre}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-700">
                                {viaje.rating}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {viaje.descripcion}
                    </p>

                    <div
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 ${isHovered
                                ? 'text-primary-600 translate-x-1'
                                : 'text-slate-400'
                            }`}
                    >
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Ver detalles →</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
