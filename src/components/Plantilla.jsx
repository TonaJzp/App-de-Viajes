import { Outlet } from 'react-router-dom';
import BarraNavegacion from './BarraNavegacion';
import PiePagina from './PiePagina';

export default function Plantilla() {
    return (
        <>
            <BarraNavegacion />
            <main className="flex-1">
                <Outlet />
            </main>
            <PiePagina />
        </>
    );
}
