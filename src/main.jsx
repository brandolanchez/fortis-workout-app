import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

// Layout and Page Imports
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReglamentoPage from './pages/ReglamentoPage';
import Patrocinios from './pages/Patrocinios';
import FAQ from './pages/FAQ';
import TestimoniosPage from './pages/TestimoniosPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'patrocinios',
        element: <Patrocinios />,
      },
      {
        path: 'privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'reglamento',
        element: <ReglamentoPage />,
      },
      {
        path: 'testimonios',
        element: <TestimoniosPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
            <RouterProvider router={router} />
  </React.StrictMode>
);
