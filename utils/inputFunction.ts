export function isValidEmail(email: string) {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@esti\.mg$/;
  return pattern.test(email);
}
