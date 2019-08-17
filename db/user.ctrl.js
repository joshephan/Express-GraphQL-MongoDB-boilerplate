import model from '../mongoose/models'

async function getUser (email) {
  return await model.User.findOne({email})
}

async function getAllUser () {
  return await model.User.find()
}

async function joinUser (email, pwd) {
  if(await getUser(email)) throw "Exist email address"
  
  const newUser = new model.User({email, pwd})
  const result = await newUser.save()

  return result
}

export {
  getUser,
  getAllUser,
  joinUser
}