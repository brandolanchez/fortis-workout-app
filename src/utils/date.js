// "2025-12-28" se interpreta en UTC y en Venezuela se mostraba como el día anterior.
export const formatDate = (value) => {
  if (!value) return '';
  const str = String(value);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(str) ? new Date(`${str}T12:00:00`) : new Date(str);
  return date.toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' });
};
