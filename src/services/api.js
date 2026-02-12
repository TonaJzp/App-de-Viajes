import dbData from '@/data/db.json';

const SIMULATED_DELAY = 800;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getViajes() {
    await delay(SIMULATED_DELAY);
    return dbData.viajes;
}

export async function getViajeById(id) {
    await delay(SIMULATED_DELAY / 2);
    const viaje = dbData.viajes.find((v) => v.id === Number(id));
    if (!viaje) {
        throw new Error(`No se encontró el viaje con id ${id}`);
    }
    return viaje;
}

export async function getViajesByCategoria(categoria) {
    await delay(SIMULATED_DELAY);
    if (!categoria || categoria === 'Todos') {
        return dbData.viajes;
    }
    return dbData.viajes.filter((v) => v.categoria === categoria);
}

export async function createItinerario(itinerario) {
    await delay(1000);
    const newItinerario = {
        id: Date.now(),
        ...itinerario,
        createdAt: new Date().toISOString(),
    };
    return { success: true, data: newItinerario };
}
