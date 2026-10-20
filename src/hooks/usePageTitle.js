import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO, SITE_NAME, canonicalFor } from '../config/seo';

const setMeta = (selector, attr, key, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attr === 'rel' ? 'link' : 'meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr === 'rel' ? 'href' : 'content', value);
};

// Actualiza título, descripción, canonical y Open Graph al navegar entre páginas.
export const applySeo = ({ title, description, path, noindex = false }) => {
  if (title) {
    document.title = title;
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  }
  if (description) {
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  }
  if (noindex) {
    document.head.querySelector('link[rel="canonical"]')?.remove();
  } else if (path) {
    setMeta('link[rel="canonical"]', 'rel', 'canonical', canonicalFor(path));
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalFor(path));
  }
  setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
};

export const usePageTitle = (fallbackTitle, { noindex = false } = {}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = SEO[pathname];
    applySeo({
      title: route?.title || (fallbackTitle ? `${fallbackTitle} | ${SITE_NAME}` : SEO['/'].title),
      description: route?.description,
      path: noindex ? null : pathname,
      noindex,
    });
  }, [pathname, fallbackTitle, noindex]);
};
