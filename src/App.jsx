import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ExplorarPage from '@/pages/ExplorarPage';
import DetallePage from '@/pages/DetallePage';
import CrearItinerarioPage from '@/pages/CrearItinerarioPage';
import FavoritosPage from '@/pages/FavoritosPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explorar" element={<ExplorarPage />} />
          <Route path="/explorar/:id" element={<DetallePage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
          <Route path="/crear" element={<CrearItinerarioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
