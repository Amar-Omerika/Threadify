import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/AppRouter';
import { StateContext } from './context/ContextStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContext>
      <AppRouter />
    </StateContext>
  </StrictMode>,
);
