import dbData from '@/data/db.json';

const RETRASO_SIMULADO = 800;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function obtenerViajes() {
    await delay(RETRASO_SIMULADO);
    return dbData.viajes;
}

export async function obtenerViajePorId(id) {
    await delay(RETRASO_SIMULADO / 2);
    const viaje = dbData.viajes.find((v) => v.id === Number(id));
    if (!viaje) {
        throw new Error(`No se encontró el viaje con id ${id}`);
    }
    return viaje;
}

export async function obtenerViajesPorCategoria(categoria) {
    await delay(RETRASO_SIMULADO);
    if (!categoria || categoria === 'Todos') {
        return dbData.viajes;
    }
    return dbData.viajes.filter((v) => v.categoria === categoria);
}

export async function crearItinerario(itinerario) {
    await delay(1000);
    const nuevoItinerario = {
        id: Date.now(),
        ...itinerario,
        creadoEn: new Date().toISOString(),
    };
    return { exito: true, datos: nuevoItinerario };
}
