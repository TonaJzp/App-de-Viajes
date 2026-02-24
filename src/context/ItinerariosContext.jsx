import { createContext, useContext, useState } from 'react';

const ItinerariosContext = createContext();

export function ItinerariosProvider({ children }) {
    const [itinerarios, setItinerarios] = useState([]);

    const agregarItinerario = (itinerario) => {
        setItinerarios((prev) => [itinerario, ...prev]);
    };

    const eliminarItinerario = (id) => {
        setItinerarios((prev) => prev.filter((it) => it.id !== id));
    };


    const totalItinerarios = itinerarios.length;

    return (
        <ItinerariosContext.Provider
            value={{ itinerarios, agregarItinerario, eliminarItinerario, totalItinerarios }}
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
