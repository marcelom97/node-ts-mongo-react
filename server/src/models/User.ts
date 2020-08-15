import mongoose from 'mongoose';

import { PasswordManager } from '../services/passwordManager';

const userSchema = new mongoose.Schema({
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
    required: [true, 'Please provide a password']
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// An interface that describes the properties
// that aer erquired to create a new User
interface UserAttrs {
  username: string;
  email: string;
  password: string;
}

// An interface that describes the properties
// that  User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that  User Document has
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

// Function to create a new User
// because typecript and mongoose don't cooperate
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
