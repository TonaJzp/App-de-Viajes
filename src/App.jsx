import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Plantilla from '@/components/Plantilla';
import PaginaInicio from '@/pages/PaginaInicio';
import PaginaExplorar from '@/pages/PaginaExplorar';
import PaginaDetalle from '@/pages/PaginaDetalle';
import PaginaCrearItinerario from '@/pages/PaginaCrearItinerario';
import PaginaFavoritos from '@/pages/PaginaFavoritos';
import PaginaMisItinerarios from '@/pages/PaginaMisItinerarios';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Plantilla />}>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/explorar" element={<PaginaExplorar />} />
          <Route path="/explorar/:id" element={<PaginaDetalle />} />
          <Route path="/favoritos" element={<PaginaFavoritos />} />
          <Route path="/crear" element={<PaginaCrearItinerario />} />
          <Route path="/mis-itinerarios" element={<PaginaMisItinerarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
