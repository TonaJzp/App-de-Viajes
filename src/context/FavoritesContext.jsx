import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    const toggleFavorito = useCallback((id) => {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
        );
    }, []);

    const isFavorito = useCallback(
        (id) => favoritos.includes(id),
        [favoritos]
    );

    const totalFavoritos = favoritos.length;

    return (
        <FavoritesContext.Provider
            value={{ favoritos, toggleFavorito, isFavorito, totalFavoritos }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
    }
    return context;
}
