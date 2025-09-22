export const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n ?? 0);

export const formatDate = (d) =>
  d ? new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(d)) : '-';
