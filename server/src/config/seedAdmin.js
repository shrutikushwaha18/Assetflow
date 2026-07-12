import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@assetflow.test';
    const password = process.env.SEED_ADMIN_PASSWORD || 'AdminPass123!';
    const name = 'Admin User';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role: 'Admin' });
    console.log('Seeded admin user:');
    console.log('  email:', email);
    console.log('  password:', password);
  } catch (err) {
    console.error('Admin seed failed:', err.message || err);
  }
};

export default seedAdmin;
