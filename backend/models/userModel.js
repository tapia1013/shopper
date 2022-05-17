import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password before we save
userSchema.pre('save', async function (next) {
  // only if pw field is sent or modified
  if (!this.isModified('password')) {
    next()
  }

  // encypt pw
  const salt = await bcrypt.genSalt(10)
  // user were creatings password and hash it
  this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)


export default User