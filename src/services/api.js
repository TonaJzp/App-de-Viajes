const API_URL = 'http://localhost:3001';

export async function obtenerViajes() {
    const respuesta = await fetch(`${API_URL}/viajes`);
    if (!respuesta.ok) {
        throw new Error('Error al obtener los viajes');
    }
    return respuesta.json();
}

export async function obtenerViajePorId(id) {
    const respuesta = await fetch(`${API_URL}/viajes/${id}`);
    if (!respuesta.ok) {
        throw new Error(`No se encontró el viaje con id ${id}`);
    }
    return respuesta.json();
}

export async function obtenerViajesPorCategoria(categoria) {
    if (!categoria || categoria === 'Todos') {
        return obtenerViajes();
    }
    const respuesta = await fetch(`${API_URL}/viajes?categoria=${categoria}`);
    if (!respuesta.ok) {
        throw new Error('Error al filtrar viajes por categoría');
    }
    return respuesta.json();
}

export async function crearItinerario(itinerario) {
    const nuevoItinerario = {
        id: Date.now(),
        ...itinerario,
        creadoEn: new Date().toISOString(),
    };
    return { exito: true, datos: nuevoItinerario };
}
