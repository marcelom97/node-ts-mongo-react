import mongoose from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
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
    required: [true, 'Please provide a password'],
    select: false,
    minlength: [6, 'The password must be at least 6 characters']
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
// that are required to create a new User
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
// that User Document has
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

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  const JWT_SECRET = process.env.JWT_SECRET as Secret;
  const JWT_EXPIRE = process.env.JWT_EXPIRE;
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
