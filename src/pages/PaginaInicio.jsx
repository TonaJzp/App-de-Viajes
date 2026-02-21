import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, MapPinned, PlaneTakeoff, Sparkles } from 'lucide-react';
import { getViajes } from '@/services/api';
import TarjetaViaje from '@/components/TarjetaViaje';
import TarjetaEsqueleto from '@/components/TarjetaEsqueleto';

export default function PaginaInicio() {
    const [viajesDestacados, setViajesDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        getViajes()
            .then((datos) => {
                const ordenados = [...datos].sort((a, b) => b.rating - a.rating).slice(0, 3);
                setViajesDestacados(ordenados);
            })
            .catch(console.error)
            .finally(() => setCargando(false));
    }, []);

    return (
        <div>
            {/* ─── Sección Hero ─── */}
            <section className="relative overflow-hidden text-white flex flex-col justify-center min-h-[90vh] sm:min-h-[85vh]">
                {/* Vídeo de fondo */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/videos/Enigma_Clip_22s.mp4.webm" type="video/webm" />
                </video>

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/50 z-0"></div>

                {/* Orbes decorativos */}
                <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" aria-hidden="true">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] bg-accent-500/30 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-20 pb-32 sm:pt-28¡ sm:pb-40 lg:pt-22 lg:pb-48">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                            <Sparkles className="h-4 w-4 text-accent-400" />
                            <span className="text-sm font-medium text-white/90">
                                Tu próxima aventura te espera
                            </span>
                        </div>

                        {/* Título */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight">
                            Planifica viajes{' '}
                            <span className="bg-gradient-to-r from-accent-400 to-amber-300 bg-clip-text text-transparent">
                                inolvidables
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-primary-100/90 max-w-xl leading-relaxed">
                            Descubre destinos extraordinarios, crea itinerarios personalizados
                            y guarda tus lugares favoritos en un solo lugar.
                        </p>

                        {/* Botones CTA */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/explorar"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold text-base hover:bg-primary-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <Compass className="h-5 w-5" />
                                Explorar Destinos
                            </Link>
                            <Link
                                to="/crear"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all"
                            >
                                <PlaneTakeoff className="h-5 w-5" />
                                Crear Itinerario
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divisor ondulado */}
                <div className="absolute bottom-0 left-0 right-0 leading-[0] z-10 drop-shadow-lg">
                    <svg
                        className="block w-full"
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: '80px' }}
                    >
                        <path
                            d="M0 120L48 110C96 100 192 80 288 65C384 50 480 40 576 45C672 50 768 70 864 75C960 80 1056 70 1152 60C1248 50 1344 40 1392 35L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
                            fill="#f8fafc"
                        />
                    </svg>
                </div>
            </section>

            {/* ─── Estadísticas ─── */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 -mt-16 sm:-mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { icon: MapPinned, value: '50+', label: 'Destinos Únicos' },
                        { icon: Compass, value: '5', label: 'Categorías' },
                        { icon: PlaneTakeoff, value: '∞', label: 'Aventuras' },
                    ].map((dato, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100/80 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="bg-primary-50 p-3.5 rounded-xl shrink-0">
                                <dato.icon className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{dato.value}</div>
                                <div className="text-sm text-slate-500">{dato.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Destinos Destacados ─── */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-20 pb-16">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                            Destinos Destacados
                        </h2>
                        <p className="mt-3 text-slate-500 text-lg">
                            Los mejor valorados por nuestra comunidad
                        </p>
                    </div>
                    <Link
                        to="/explorar"
                        className="hidden sm:inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm"
                    >
                        Ver todos <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {cargando
                        ? Array.from({ length: 3 }).map((_, i) => <TarjetaEsqueleto key={i} />)
                        : viajesDestacados.map((viaje) => (
                            <TarjetaViaje key={viaje.id} viaje={viaje} />
                        ))}
                </div>

                <div className="mt-10 text-center sm:hidden">
                    <Link
                        to="/explorar"
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Ver todos los destinos <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* ─── Sección CTA ─── */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20">
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 sm:p-16 overflow-hidden">
                    {/* Decorativo */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            ¿Listo para tu próxima aventura?
                        </h2>
                        <p className="mt-5 text-slate-400 text-lg leading-relaxed">
                            Crea tu itinerario personalizado y empieza a planificar el viaje
                            de tus sueños.
                        </p>
                        <Link
                            to="/crear"
                            className="inline-flex items-center gap-2 mt-8 bg-accent-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/25 hover:-translate-y-0.5"
                        >
                            <PlaneTakeoff className="h-5 w-5" />
                            Crear mi Itinerario
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
