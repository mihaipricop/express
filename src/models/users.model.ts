import mongoose, { CallbackError, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { logger } from "../middleware/logger";
import validator from "validator";

interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: 'Username must be alphanumeric'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    validate: {
      validator: (value: string) => validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }),
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol'
    }
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    logger.error(error);
    next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;