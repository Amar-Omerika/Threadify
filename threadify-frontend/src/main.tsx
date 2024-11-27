import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StateContext } from '@context/ContextStore.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContext>
      <App />
    </StateContext>
  </StrictMode>,
);
