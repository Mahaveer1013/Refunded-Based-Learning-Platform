import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: String,
  phone: String,
  is_active: { type: Boolean, default: true },
  is_verified: { type: Boolean, default: false },
  is_superuser: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  last_login: Date
}, {
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.hashed_password;
      return ret;
    }
  }
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.hashed_password);
};

const User = mongoose.model('User', userSchema);
export default User;
