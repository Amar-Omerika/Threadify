import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routes/AppRouter';
import { StateContext } from './context/ContextStore';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContext>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </StateContext>
  </StrictMode>,
);
