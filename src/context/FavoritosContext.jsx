import { createContext, useContext, useState, useCallback } from 'react';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    const toggleFavorito = useCallback((id) => {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
        );
    }, []);

    const esFavorito = useCallback(
        (id) => favoritos.includes(id),
        [favoritos]
    );

    const totalFavoritos = favoritos.length;

    return (
        <FavoritosContext.Provider
            value={{ favoritos, toggleFavorito, esFavorito, totalFavoritos }}
        >
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    const context = useContext(FavoritosContext);
    if (!context) {
        throw new Error('useFavoritos debe usarse dentro de un FavoritosProvider');
    }
    return context;
}
