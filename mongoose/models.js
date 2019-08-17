import mongoose from "mongoose"
import schema from "./schema"
import * as config from "./../config"

const db = mongoose.connection

const model = (() => {
  db.on("eeror", console.error)
  db.on("open", () => {
    console.log("Connected to mongod server")
  })

  // 몽고 DB 서버와 연결
  mongoose.connect(
    `mongodb://${config.db.dbuser}:${config.db.dbpassword}@${config.db.uri}`,
    { useNewUrlParser: true })

  const model = {} 
  for (let k in schema) {
    model[k] = mongoose.model(k, schema[k])
  }

  return model
})()

export default model