import { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    const toggleFavorito = (id) => {
        setFavoritos((prev) =>
            // si el id esta en favoritos, lo quita, si no, lo añade
            prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
        );
    };

    const esFavorito = (id) => favoritos.includes(id);

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
