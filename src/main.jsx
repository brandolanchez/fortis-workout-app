import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReglamentoPage from './pages/ReglamentoPage';
import Patrocinios from './pages/Patrocinios';
import FAQ from './pages/FAQ';
import TestimoniosPage from './pages/TestimoniosPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage standalone />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'patrocinios', element: <Patrocinios /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'reglamento', element: <ReglamentoPage /> },
      { path: 'testimonios', element: <TestimoniosPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
