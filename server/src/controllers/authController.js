import { loginUser, registerUser } from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: 'Signup successful', ...result });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
