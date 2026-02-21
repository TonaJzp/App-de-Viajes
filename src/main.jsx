import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritosProvider } from '@/context/FavoritosContext';
import { ItinerariosProvider } from '@/context/ItinerariosContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritosProvider>
      <ItinerariosProvider>
        <App />
      </ItinerariosProvider>
    </FavoritosProvider>
  </StrictMode>
);
