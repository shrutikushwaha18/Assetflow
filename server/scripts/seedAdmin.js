import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';

const run = async () => {
  try {
    await connectDB();

    const email = process.env.SEED_ADMIN_EMAIL || 'admin@assetflow.test';
    const password = process.env.SEED_ADMIN_PASSWORD || 'AdminPass123!';
    const name = 'Admin User';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed, role: 'Admin' });

    console.log('Seeded admin user:');
    console.log('  email:', email);
    console.log('  password:', password);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

run();
