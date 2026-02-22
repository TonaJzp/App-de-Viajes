import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Notificacion({ mensaje, tipo = 'exito', duracion = 4000, alCerrar }) {
    const [esVisible, setEsVisible] = useState(true);

    useEffect(() => {
        const temporizador = setTimeout(() => {
            setEsVisible(false);
            setTimeout(alCerrar, 300);
        }, duracion);
        return () => clearTimeout(temporizador);
    }, [duracion, alCerrar]);

    const estilos = {
        exito: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        error: 'bg-rose-50 border-rose-200 text-rose-800',
    };

    const iconos = {
        exito: <CheckCircle className="h-5 w-5 text-emerald-500" />,
        error: <XCircle className="h-5 w-5 text-rose-500" />,
    };

    return (
        <div className="fixed top-20 right-4 z-[200]">
            <div
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border shadow-lg transition-all duration-300 ${estilos[tipo]
                    } ${esVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
                {iconos[tipo]}
                <p className="text-sm font-medium">{mensaje}</p>
                <button
                    onClick={() => {
                        setEsVisible(false);
                        setTimeout(alCerrar, 300);
                    }}
                    className="ml-2 p-1 rounded-lg hover:bg-black/5 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
