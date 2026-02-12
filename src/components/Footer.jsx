import { Plane, Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 mt-auto">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl">
                                <Plane className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ViajaYa</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Tu compañero de viajes. Explora destinos increíbles, crea
                            itinerarios personalizados y vive experiencias únicas.
                        </p>
                    </div>

                    {/* Links */}
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
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © 2026 ViajaYa. Hecho con{' '}
                        <Heart className="inline h-3 w-3 text-rose-500 fill-rose-500" /> para
                        amantes de los viajes.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
