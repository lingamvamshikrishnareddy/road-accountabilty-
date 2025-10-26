export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
  },

  phone: (phone) => {
    // Indian phone number format
    const re = /^[6-9]\d{9}$/;
    return re.test(phone.replace(/\D/g, ''));
  },

  pincode: (pincode) => {
    const re = /^[1-9][0-9]{5}$/;
    return re.test(pincode);
  },

  required: (value) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  minLength: (value, min) => {
    return value && value.length >= min;
  },

  maxLength: (value, max) => {
    return value && value.length <= max;
  },

  number: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  positiveNumber: (value) => {
    return validators.number(value) && parseFloat(value) > 0;
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  date: (date) => {
    return date instanceof Date && !isNaN(date);
  },

  futureDate: (date) => {
    return validators.date(date) && date > new Date();
  },

  pastDate: (date) => {
    return validators.date(date) && date < new Date();
  },

  latitude: (lat) => {
    return validators.number(lat) && lat >= -90 && lat <= 90;
  },

  longitude: (lng) => {
    return validators.number(lng) && lng >= -180 && lng <= 180;
  },

  fileSize: (file, maxSizeMB) => {
    return file && file.size <= maxSizeMB * 1024 * 1024;
  },

  fileType: (file, allowedTypes) => {
    return file && allowedTypes.includes(file.type);
  },
};

export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      if (rule.type === 'required' && !validators.required(value)) {
        errors[field] = rule.message || `${field} is required`;
      } else if (rule.type === 'email' && !validators.email(value)) {
        errors[field] = rule.message || 'Invalid email address';
      } else if (rule.type === 'password' && !validators.password(value)) {
        errors[field] = rule.message || 'Password must be at least 8 characters with uppercase, lowercase, and number';
      } else if (rule.type === 'minLength' && !validators.minLength(value, rule.value)) {
        errors[field] = rule.message || `Minimum length is ${rule.value}`;
      } else if (rule.type === 'maxLength' && !validators.maxLength(value, rule.value)) {
        errors[field] = rule.message || `Maximum length is ${rule.value}`;
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validators;