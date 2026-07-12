import Department from '../models/Department.js';
import User from '../models/User.js';

export const listDepartments = async (_req, res, next) => {
  try {
    const departments = await Department.find().populate('departmentHead', 'name email').populate('parentDepartment', 'name');
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(department);
  } catch (error) {
    next(error);
  }
};

export const assignRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
