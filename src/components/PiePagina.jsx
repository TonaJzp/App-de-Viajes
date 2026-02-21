import { Link } from 'react-router-dom';

export default function PiePagina() {
    return (
        <footer className="bg-slate-900 text-slate-400 mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center text-center">
                    {/* Marca */}
                    <div>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <img
                                src="/imagenes/logo.svg"
                                alt="PlanyRuta"
                                className="h-10 w-auto"
                            />
                            <span className="text-2xl font-black text-white tracking-tight">PlanyRuta</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Tu compañero de viajes. Explora destinos increíbles, crea
                            itinerarios personalizados y vive experiencias únicas.
                        </p>
                    </div>

                    {/* Enlaces */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navegación</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/explorar" className="hover:text-white transition-colors">
                                    Explorar Destinos
                                </Link>
                            </li>
                            <li>
                                <Link to="/crear" className="hover:text-white transition-colors">
                                    Crear Itinerario
                                </Link>
                            </li>
                            <li>
                                <Link to="/mis-itinerarios" className="hover:text-white transition-colors">
                                    Mis Itinerarios
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categorías */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Categorías</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/explorar?categoria=Playa" className="hover:text-white transition-colors">
                                    🏖️ Playa
                                </Link>
                            </li>
                            <li>
                                <Link to="/explorar?categoria=Montaña" className="hover:text-white transition-colors">
                                    🏔️ Montaña
                                </Link>
                            </li>
                            <li>
                                <Link to="/explorar?categoria=Ciudad" className="hover:text-white transition-colors">
                                    🏙️ Ciudad
                                </Link>
                            </li>
                            <li>
                                <Link to="/explorar?categoria=Cultural" className="hover:text-white transition-colors">
                                    🏛️ Cultural
                                </Link>
                            </li>
                            <li>
                                <Link to="/explorar?categoria=Aventura" className="hover:text-white transition-colors">
                                    ⛺ Aventura
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex items-center justify-center">
                    <p className="text-xs text-slate-500">
                        © 2026 PlanyRuta.
                    </p>
                </div>
            </div>
        </footer>
    );
}
