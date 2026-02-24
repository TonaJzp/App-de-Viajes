import { useState } from 'react';
import { PlaneTakeoff, MapPin, Calendar, Wallet, StickyNote, Send } from 'lucide-react';
import { crearItinerario } from '@/services/api';
import { useItinerarios } from '@/context/ItinerariosContext';
import Notificacion from '@/components/Notificacion';

const formularioInicial = {
    nombre: '',
    destino: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: '',
    notas: '',
};

export default function PaginaCrearItinerario() {
    const { agregarItinerario } = useItinerarios();
    const [formulario, setFormulario] = useState(formularioInicial);

    const [notificacion, setNotificacion] = useState(null);
    const [errores, setErrores] = useState({});

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        //
        setFormulario((prev) => ({ ...prev, [name]: value }));
        // Elimina el error cuando el usuario empieza a escribir
        if (errores[name]) {
            setErrores((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validar = () => {
        const nuevosErrores = {};
        if (!formulario.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
        if (!formulario.destino.trim()) nuevosErrores.destino = 'El destino es obligatorio';
        if (!formulario.fechaInicio) nuevosErrores.fechaInicio = 'Selecciona una fecha de inicio';
        if (!formulario.fechaFin) nuevosErrores.fechaFin = 'Selecciona una fecha de fin';
        if (formulario.fechaInicio && formulario.fechaFin && formulario.fechaInicio > formulario.fechaFin) {
            nuevosErrores.fechaFin = 'La fecha fin debe ser posterior a la de inicio';
        }
        if (!formulario.presupuesto || Number(formulario.presupuesto) <= 0) {
            nuevosErrores.presupuesto = 'Ingresa un presupuesto válido';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        try {
            const resultado = await crearItinerario({
                ...formulario,
                presupuesto: Number(formulario.presupuesto),
            });
            agregarItinerario(resultado.datos);
            setNotificacion({ mensaje: '¡Itinerario creado exitosamente!', tipo: 'exito' });
            setFormulario(formularioInicial);
            setErrores({});
        } catch {
            setNotificacion({ mensaje: 'Error al crear el itinerario. Inténtalo de nuevo.', tipo: 'error' });
        }
    };

    const claseInput = (campo) =>
        `w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errores[campo]
            ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
            : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-400'
        }`;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Cabecera */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-accent-500/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <PlaneTakeoff className="h-6 w-6 text-accent-400" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold">Crear Itinerario</h1>
                    </div>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Diseña tu viaje perfecto. Completa el formulario y nosotros nos
                        encargamos del resto.
                    </p>
                </div>
            </div>

            {/* Tarjeta formulario — flotante */}
            <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8 pb-20">
                <form
                    onSubmit={manejarEnvio}
                    className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 sm:p-10"
                    noValidate
                >
                    <div className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label
                                htmlFor="nombre"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                            >
                                <StickyNote className="h-4 w-4 text-slate-400" />
                                Nombre del Itinerario
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                                placeholder="Ej: Vacaciones de verano 2026"
                                className={claseInput('nombre')}
                            />
                            {errores.nombre && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errores.nombre}</p>
                            )}
                        </div>

                        {/* Destino */}
                        <div>
                            <label
                                htmlFor="destino"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                            >
                                <MapPin className="h-4 w-4 text-slate-400" />
                                Destino
                            </label>
                            <input
                                id="destino"
                                name="destino"
                                type="text"
                                value={formulario.destino}
                                onChange={manejarCambio}
                                placeholder="Ej: Cancún, México"
                                className={claseInput('destino')}
                            />
                            {errores.destino && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errores.destino}</p>
                            )}
                        </div>

                        {/* Fechas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="fechaInicio"
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                                >
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    Fecha de Inicio
                                </label>
                                <input
                                    id="fechaInicio"
                                    name="fechaInicio"
                                    type="date"
                                    value={formulario.fechaInicio}
                                    onChange={manejarCambio}
                                    className={claseInput('fechaInicio')}
                                />
                                {errores.fechaInicio && (
                                    <p className="mt-2 text-xs text-rose-500 font-medium">{errores.fechaInicio}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="fechaFin"
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                                >
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    Fecha de Fin
                                </label>
                                <input
                                    id="fechaFin"
                                    name="fechaFin"
                                    type="date"
                                    value={formulario.fechaFin}
                                    onChange={manejarCambio}
                                    className={claseInput('fechaFin')}
                                />
                                {errores.fechaFin && (
                                    <p className="mt-2 text-xs text-rose-500 font-medium">{errores.fechaFin}</p>
                                )}
                            </div>
                        </div>

                        {/* Presupuesto */}
                        <div>
                            <label
                                htmlFor="presupuesto"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                            >
                                <Wallet className="h-4 w-4 text-slate-400" />
                                Presupuesto (€)
                            </label>
                            <input
                                id="presupuesto"
                                name="presupuesto"
                                type="number"
                                min="0"
                                value={formulario.presupuesto}
                                onChange={manejarCambio}
                                placeholder="Ej: 2000"
                                className={claseInput('presupuesto')}
                            />
                            {errores.presupuesto && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errores.presupuesto}</p>
                            )}
                        </div>

                        {/* Notas */}
                        <div>
                            <label
                                htmlFor="notas"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5"
                            >
                                <StickyNote className="h-4 w-4 text-slate-400" />
                                Notas adicionales
                                <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <textarea
                                id="notas"
                                name="notas"
                                value={formulario.notas}
                                onChange={manejarCambio}
                                rows={4}
                                placeholder="Ej: Quiero visitar los cenotes y probar comida local..."
                                className={`${claseInput('notas')} resize-none`}
                            />
                        </div>
                    </div>

                    {/* Enviar */}
                    <button
                        type="submit"
                        className="mt-8 w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Send className="h-5 w-5" />
                        Crear Itinerario
                    </button>
                </form>
            </div>

            {/* Notificación */}
            {notificacion && (
                <Notificacion
                    mensaje={notificacion.mensaje}
                    tipo={notificacion.tipo}
                    alCerrar={() => setNotificacion(null)}
                />
            )}
        </div>
    );
}
