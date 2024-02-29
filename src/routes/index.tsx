import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import {
  Dashboard
  ,ListagemDePessoa
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      },
    ]);
  });

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/> } />
      
      <Route path="/pessoas" element={<ListagemDePessoa/> } />
      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};