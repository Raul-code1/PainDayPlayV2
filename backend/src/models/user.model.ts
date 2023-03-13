import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  role: string;
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hashSync(this.password, salt);
  this.password = hashPassword;
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password);
};

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;
