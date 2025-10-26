import { format, formatDistance, parseISO } from 'date-fns';

export const formatters = {
  // Currency
  currency: (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  // Number with commas
  number: (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  },

  // Date formats
  date: (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd MMM yyyy');
  },

  dateTime: (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd MMM yyyy, hh:mm a');
  },

  relativeTime: (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(d, new Date(), { addSuffix: true });
  },

  // File size
  fileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },

  // Percentage
  percentage: (value, total) => {
    if (!total) return '0%';
    return ((value / total) * 100).toFixed(1) + '%';
  },

  // Truncate text
  truncate: (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  // Phone number
  phone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{5})$/);
    if (match) {
      return match[1] + ' ' + match[2];
    }
    return phone;
  },

  // Status badge color
  statusColor: (status) => {
    const colors = {
      planned: 'info',
      in_progress: 'warning',
      completed: 'success',
      delayed: 'danger',
      cancelled: 'danger',
      pending: 'warning',
      verified: 'success',
      rejected: 'danger',
    };
    return colors[status] || 'info';
  },
};

export default formatters;