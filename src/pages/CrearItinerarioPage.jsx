import { useState } from 'react';
import { PlaneTakeoff, MapPin, Calendar, Wallet, StickyNote, Send } from 'lucide-react';
import { createItinerario } from '@/services/api';
import Toast from '@/components/Toast';

const initialForm = {
    nombre: '',
    destino: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: '',
    notas: '',
};

export default function CrearItinerarioPage() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!form.destino.trim()) newErrors.destino = 'El destino es obligatorio';
        if (!form.fechaInicio) newErrors.fechaInicio = 'Selecciona una fecha de inicio';
        if (!form.fechaFin) newErrors.fechaFin = 'Selecciona una fecha de fin';
        if (form.fechaInicio && form.fechaFin && form.fechaInicio > form.fechaFin) {
            newErrors.fechaFin = 'La fecha fin debe ser posterior a la de inicio';
        }
        if (!form.presupuesto || Number(form.presupuesto) <= 0) {
            newErrors.presupuesto = 'Ingresa un presupuesto válido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await createItinerario({
                ...form,
                presupuesto: Number(form.presupuesto),
            });
            setToast({ message: '¡Itinerario creado exitosamente! 🎉', type: 'success' });
            setForm(initialForm);
            setErrors({});
        } catch {
            setToast({ message: 'Error al crear el itinerario. Inténtalo de nuevo.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full px-4 py-3.5 bg-slate-50 border rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${errors[field]
            ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-400'
            : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-400'
        }`;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
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

            {/* Form card — floating */}
            <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 -mt-8 pb-20">
                <form
                    onSubmit={handleSubmit}
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
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Vacaciones de verano 2026"
                                className={inputClass('nombre')}
                            />
                            {errors.nombre && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errors.nombre}</p>
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
                                value={form.destino}
                                onChange={handleChange}
                                placeholder="Ej: Cancún, México"
                                className={inputClass('destino')}
                            />
                            {errors.destino && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errors.destino}</p>
                            )}
                        </div>

                        {/* Dates */}
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
                                    value={form.fechaInicio}
                                    onChange={handleChange}
                                    className={inputClass('fechaInicio')}
                                />
                                {errors.fechaInicio && (
                                    <p className="mt-2 text-xs text-rose-500 font-medium">{errors.fechaInicio}</p>
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
                                    value={form.fechaFin}
                                    onChange={handleChange}
                                    className={inputClass('fechaFin')}
                                />
                                {errors.fechaFin && (
                                    <p className="mt-2 text-xs text-rose-500 font-medium">{errors.fechaFin}</p>
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
                                value={form.presupuesto}
                                onChange={handleChange}
                                placeholder="Ej: 2000"
                                className={inputClass('presupuesto')}
                            />
                            {errors.presupuesto && (
                                <p className="mt-2 text-xs text-rose-500 font-medium">{errors.presupuesto}</p>
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
                                value={form.notas}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Ej: Quiero visitar los cenotes y probar comida local..."
                                className={`${inputClass('notas')} resize-none`}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-8 w-full py-4 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${loading
                            ? 'bg-primary-400 cursor-not-allowed'
                            : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5'
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Creando itinerario...
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                Crear Itinerario
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
