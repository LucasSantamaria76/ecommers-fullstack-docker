import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './styles';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <ModalsProvider>
      <RouterProvider router={router} />
    </ModalsProvider>
  </MantineProvider>
);
