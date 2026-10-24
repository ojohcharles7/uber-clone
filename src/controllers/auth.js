
// src/controllers/auth.js
import { validateSignup, validateLogin } from '../validators/auth.js';
import * as authService from '../services/auth.js';

export async function signup(req, res) {
  const { valid, errors } = validateSignup(req.body);
  if (!valid) {
    return res.status(400).json({ error: { message: 'Validation failed', details: errors } });
  }
  try {
    const { user, token } = await authService.signup(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === '23505' || err.cause?.code === '23505') { // Postgres unique-constraint violation
      return res.status(409).json({ error: { message: 'Email already in use' } });
    }
    res.status(500).json({ error: { message: 'Something went wrong' } });
  }
}

export async function login(req, res) {
  const { valid, errors } = validateLogin(req.body);
  if (!valid) {
    return res.status(400).json({ error: { message: 'Validation failed', details: errors } });
  }
  try {
    const result = await authService.login(req.body);
    if (!result) {
      return res.status(401).json({ error: { message: 'Invalid email or password' } });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: { message: 'Something went wrong' } });
  }
}
