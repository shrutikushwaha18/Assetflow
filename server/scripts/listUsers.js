import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../src/models/User.js';
import connectDB from '../src/config/db.js';

const run = async () => {
  try {
    await connectDB();
    const users = await User.find({}, 'email role name').lean();
    console.log('Users:');
    users.forEach(u => console.log(`${u.email} — ${u.role} (${u.name || 'n/a'})`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
