import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  info: { type: String, required: true, default: "Nenhuma informação adicional." },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  gender: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);