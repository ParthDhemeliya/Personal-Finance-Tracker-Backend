import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
//  Removed unused enum values to fix lint error
// export enum UserRole {
//   ADMIN = 'admin',
//   USER = 'user',
// }
export var UserRole;
(function (UserRole) {
    // ADMIN = 'admin',
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
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
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updated_at: new Date() });
    next();
});
userSchema.pre('updateOne', function (next) {
    this.set({ updated_at: new Date() });
    next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
