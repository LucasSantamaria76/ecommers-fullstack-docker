import axios from 'axios';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Details, ErrorPage, Home } from '../Pages';
import { useProductsStore } from '../store';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
        loader: async () => {
          useProductsStore.getState().setProducts();
          return '';
        },
      },
      {
        path: '/details',
        element: <Details />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
