import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Schema({})
class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    minlength: 6,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a phone number'],
    length: [10, 'Please provide a valid phone number'],
    unique: [
      true,
      'The provided phone number is already associated with another account',
    ],
  })
  phone: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isVerified: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password with hashed password in db
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export { User, UserSchema };
