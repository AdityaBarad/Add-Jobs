/**
 * Form validation utilities
 */

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Salary validation (can be a number or a range like "50000-70000")
export const isValidSalary = (salary) => {
  const salaryRangeRegex = /^\d+(-\d+)?$/;
  return salaryRangeRegex.test(salary);
};

// Date validation (YYYY-MM-DD format)
export const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  return value ? null : `${fieldName} is required`;
};

// Generic validation function that can be used for any field
export const validateField = (value, fieldName, validationFn, errorMessage) => {
  if (!value) return validateRequired(value, fieldName);
  return validationFn(value) ? null : errorMessage;
};
