'use server';

import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
}, { timestamps: true });

const User = models.User || model('User', userSchema);

export default User;
