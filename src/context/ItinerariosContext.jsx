import { createContext, useContext, useState, useCallback } from 'react';

const ItinerariosContext = createContext();

export function ItinerariosProvider({ children }) {
    const [itinerarios, setItinerarios] = useState([]);

    const agregarItinerario = useCallback((itinerario) => {
        setItinerarios((prev) => [itinerario, ...prev]);
    }, []);

    const eliminarItinerario = useCallback((id) => {
        setItinerarios((prev) => prev.filter((it) => it.id !== id));
    }, []);

    const actualizarItinerario = useCallback((id, cambios) => {
        setItinerarios((prev) =>
            prev.map((it) => (it.id === id ? { ...it, ...cambios } : it))
        );
    }, []);

    const totalItinerarios = itinerarios.length;

    return (
        <ItinerariosContext.Provider
            value={{ itinerarios, agregarItinerario, eliminarItinerario, actualizarItinerario, totalItinerarios }}
        >
            {children}
        </ItinerariosContext.Provider>
    );
}

export function useItinerarios() {
    const context = useContext(ItinerariosContext);
    if (!context) {
        throw new Error('useItinerarios debe usarse dentro de un ItinerariosProvider');
    }
    return context;
}
