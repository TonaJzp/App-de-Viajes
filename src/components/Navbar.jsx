import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/explorar', label: 'Explorar' },
    { to: '/crear', label: 'Crear Itinerario' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { totalFavoritos } = useFavorites();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                        <img
                            src="/imagenes/logo.svg"
                            alt="PlanyRuta"
                            className="h-10 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            PlanyRuta
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.to)
                                    ? 'bg-primary-50 text-primary-700 font-semibold'
                                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Favorites */}
                        <Link
                            to="/favoritos"
                            className="ml-3 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer group"
                            title="Ver mis favoritos"
                        >
                            <Heart className="h-4 w-4 fill-rose-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold">{totalFavoritos}</span>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-200/80 bg-white">
                    <div className="px-6 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.to)
                                    ? 'bg-primary-50 text-primary-700 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/favoritos"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <Heart className="h-4 w-4 fill-rose-500" />
                            <span className="text-sm font-semibold">Mis Favoritos ({totalFavoritos})</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
