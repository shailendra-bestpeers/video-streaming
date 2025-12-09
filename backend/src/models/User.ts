import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// --------------------------- Types --------------------------- //

export type UserRole = "admin" | "creator" | "viewer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

// ------------------------ Schema ----------------------------- //

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true,},

    role: {
      type: String,
      enum: ["admin", "creator", "viewer"],
      default: "viewer",
    },

    avatar: { type: String },
  },
  { timestamps: true }
);

// --------------------- Password Hashing ---------------------- //

userSchema.pre<IUserDocument>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ------------------- Compare Password ------------------------ //

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// ------------------------ Model ------------------------------ //

export const User = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);
