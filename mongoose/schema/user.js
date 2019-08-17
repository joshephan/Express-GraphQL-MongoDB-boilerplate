import mongoose from 'mongoose'

export default (() => {
  return new mongoose.Schema({
    pwd: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
  })
})()