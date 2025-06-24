// TODO: Add tests for these functions

/**
 * Validate an email address
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a name
 * @param name - The name to validate
 * @returns True if the name is valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validate a password
 * @param password - The password to validate
 * @returns True if the password is valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  // At least 8 characters
  // At least one lowercase letter
  // At least one uppercase letter
  // At least one digit
  // At least one special character (!@#$%^&*() and similar)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\\[\]:;"'<>,.?/~`\\|=-]).{8,}$/;
  return passwordRegex.test(password);
};
