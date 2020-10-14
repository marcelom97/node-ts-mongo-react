import { Schema } from 'mongoose';
import { getSignedJwtToken, getResetPasswordToken } from './users.methods';
import { PasswordManager } from '../../services/passwordManager';

// import { getSignedJwtToken, getResetPasswordToken } from './users.statics';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide an username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    minlength: [6, 'The password must be at least 6 characters']
  },
  firstname: {
    type: String,
    required: [true, 'Please provide a valid first name']
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a valid last name']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.getSignedJwtToken = getSignedJwtToken;
UserSchema.methods.getResetPasswordToken = getResetPasswordToken;

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

export default UserSchema;
