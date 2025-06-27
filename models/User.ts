import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// ✅ Plain shape (no Document extension)
export interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  _id: Types.ObjectId;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// ✅ Mongoose Document version
 export interface IUserDocument extends Omit<IUser, '_id'>, Document<Types.ObjectId> {}

const userSchema: Schema<IUserDocument> = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  is_active: { type: Boolean, default: true, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true,
  },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
});

userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre<IUserDocument>('findOneAndUpdate', function (next) {
  this.set({ updated_at: new Date() });
  next();
});

userSchema.pre<IUserDocument>('updateOne', function (next) {
  this.set({ updated_at: new Date() });
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default User;