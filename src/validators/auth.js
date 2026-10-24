// src/validators/auth.js
export function validateSignup(body = {}) {
  const data = body && typeof body === 'object' ? body : {};
  const errors = [];
  if (typeof data.name !== 'string' || data.name.trim() === '') errors.push('name is required');
  if (typeof data.email !== 'string' || !data.email.includes('@')) errors.push('a valid email is required');
  if (typeof data.password !== 'string' || data.password.length < 8) errors.push('password must be at least 8 characters');
  if (!['rider', 'driver'].includes(data.role)) errors.push("role must be 'rider' or 'driver'");
  return { valid: errors.length === 0, errors };
}

export function validateLogin(body = {}) {
  const data = body && typeof body === 'object' ? body : {};
  const errors = [];
  if (typeof data.email !== 'string' || data.email.trim() === '') errors.push('email is required');
  if (typeof data.password !== 'string' || data.password.trim() === '') errors.push('password is required');
  return { valid: errors.length === 0, errors };
}