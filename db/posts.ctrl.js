import model from '../mongoose/models'

async function createPost({title, content, author}){
  const newPost = new model.Post({title, content, author})
  const result = await newPost.save()
  return await result.populate('author').execPopulate()
}

async function getAllPosts(){
  return await model.Post.find().populate('author')
}

export {
  createPost,
  getAllPosts
}