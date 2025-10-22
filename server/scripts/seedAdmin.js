// Usage: node scripts/seedAdmin.js NAME EMAIL PASSWORD
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const connectDB = require('../config/db');

const main = async () => {
  try{
    await connectDB();
    const [,, name, email, password] = process.argv;
    if(!name || !email || !password){
      console.log('Usage: node scripts/seedAdmin.js NAME EMAIL PASSWORD');
      process.exit(1);
    }
    const existing = await User.findOne({ email });
    if(existing){
      console.log('User exists:', existing.email);
      process.exit(0);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash, role: 'admin' });
    await user.save();
    console.log('Admin created:', user.email);
    process.exit(0);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
};

main();
