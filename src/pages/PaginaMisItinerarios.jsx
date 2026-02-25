import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, MapPin, Calendar, Wallet, StickyNote, Trash2, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { useItinerarios } from '@/context/ItinerariosContext';

export default function PaginaMisItinerarios() {
    const { itinerarios, eliminarItinerario } = useItinerarios();
    const [estaSobreId, setEstaSobreId] = useState(null);

    const formatearFecha = (cadenaFecha) => {
        if (!cadenaFecha) return '';
        return new Date(cadenaFecha).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
    };

    return (
        // Cabecera
        <div className="min-h-screen bg-slate-50">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold">Mis Itinerarios</h1>
                    </div>
                    <p className="text-primary-100 text-lg max-w-2xl leading-relaxed">
                        Todos los viajes que has planificado en un solo lugar.
                    </p>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8 pb-20">
                {itinerarios.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {itinerarios.map((it) => (
                            <div key={it.id} className={`bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 transition-all duration-300 ${estaSobreId === it.id ? 'shadow-xl -translate-y-1 border-primary-200' : 'hover:shadow-lg'}`} onMouseEnter={() => setEstaSobreId(it.id)} onMouseLeave={() => setEstaSobreId(null)}>
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{it.nombre}</h3>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button onClick={() => eliminarItinerario(it.id)} className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors" title="Eliminar itinerario"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-500 shrink-0" /><span>{it.destino}</span></div>
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary-500 shrink-0" /><span>{formatearFecha(it.fechaInicio)} — {formatearFecha(it.fechaFin)}</span></div>
                                    <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary-500 shrink-0" /><span className="font-semibold text-slate-900">{it.presupuesto.toLocaleString('es-ES')} €</span></div>
                                    {it.notas && (<div className="flex items-start gap-2 pt-2 border-t border-slate-100"><StickyNote className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" /><p className="text-slate-500 line-clamp-2">{it.notas}</p></div>)}
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100"><p className="text-xs text-slate-400">Creado el {formatearFecha(it.creadoEn)}</p></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-10 sm:p-16 text-center">
                        <div className="bg-slate-50 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"><ClipboardList className="h-10 w-10 text-slate-300" /></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Aún no tienes itinerarios</h2>
                        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">Crea tu primer itinerario y empieza a planificar el viaje de tus sueños.</p>
                        <Link to="/crear" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 hover:shadow-xl hover:-translate-y-0.5"><PlaneTakeoff className="h-5 w-5" />Crear Itinerario <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                )}
            </div>
        </div>
    );
}
