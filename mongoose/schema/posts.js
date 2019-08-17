import mongoose from "mongoose"

export default (() => {
  return new mongoose.Schema({
    content: String,
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
  })
})()