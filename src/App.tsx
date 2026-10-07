import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import BuscadorPersonas from './pages/BuscadorPersonas';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Redirigir por defecto a la búsqueda de personas */}
          <Route index element={<Navigate to="/personas" replace />} />
          <Route path="personas" element={<BuscadorPersonas />} />
          
          {/* Dejamos las otras rutas listas para conectarlas después */}
          <Route path="vehiculos" element={<div className="p-6">Módulo de Vehículos en construcción...</div>} />
          <Route path="auditoria" element={<div className="p-6 text-red-600">Módulo de Auditoría en construcción...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}