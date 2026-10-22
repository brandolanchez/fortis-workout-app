import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import './index.css';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Las demás páginas se cargan solo cuando se visitan, para que el inicio pese menos.
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ReglamentoPage = lazy(() => import('./pages/ReglamentoPage'));
const Patrocinios = lazy(() => import('./pages/Patrocinios'));
const FAQ = lazy(() => import('./pages/FAQ'));
const TestimoniosPage = lazy(() => import('./pages/TestimoniosPage'));

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
