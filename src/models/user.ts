import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true, "User Full Name is required"] 
  },
  email: {
    type: String,
    required: [true, "User Email is required."],
    unique: [true, "User Email must be unique."],
    trim: [true],
    lowercase: [true]
  },
  password: {
    type: String,
    required: [true, "User Password is required."],
    min: 8
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user"
  }
},
  {
    timestamps: true,
  }
);

//before saving --> encrypt the password and use salt 
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (isAuthenticated) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect email");
  }
};

const User = model("User", userSchema);

export default User;