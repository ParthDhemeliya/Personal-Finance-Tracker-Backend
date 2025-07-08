import mongoose, { Schema } from 'mongoose';
const COLOR_REGEX = /^#([0-9A-F]{3}){1,2}$/i;
const CATEGORY_TYPES = ['income', 'expense'];
const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        minlength: [1, 'Category name must not be empty'],
        maxlength: [50, 'Category name must be at most 50 characters'],
    },
    color: {
        type: String,
        default: '#3b82f6',
        trim: true,
        set: (val) => val.toLowerCase(),
        validate: {
            validator: (value) => COLOR_REGEX.test(value),
            message: (props) => `${props.value} is not a valid hex color code!`,
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true,
    },
    type: {
        type: String,
        enum: CATEGORY_TYPES,
        required: [true, 'Category type is required'],
        index: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// ✅ Ensure uniqueness: each user can't create duplicate names per type
categorySchema.index({ user: 1, name: 1, type: 1 }, { unique: true });
export default mongoose.model('Category', categorySchema);
