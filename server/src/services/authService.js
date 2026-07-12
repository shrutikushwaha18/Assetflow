import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw { statusCode: 400, message: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role: 'Employee' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'assetflow-secret', { expiresIn: '8h' });

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department } };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 401, message: 'Invalid credentials' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { statusCode: 401, message: 'Invalid credentials' };

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'assetflow-secret', { expiresIn: '8h' });

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department } };
};
