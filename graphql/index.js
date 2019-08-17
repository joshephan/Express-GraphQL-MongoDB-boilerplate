import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID
} from "graphql"
import db from '../db'

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {type: GraphQLID },
    email: { type: GraphQLString },
    pwd: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }
})


const Post = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: {type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: User },
    createdAt:{ type: GraphQLString }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: User,
      args: {
        email: { type: GraphQLString },
        pwd: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const {email, pwd} = args
        return await db.user.joinUser(email, pwd)
      }
    },
    createPost: {
      type: Post,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await db.posts.createPost(args)
      }
    },
  }
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    posts: {
      type: new GraphQLList(Post),
      resolve: async () => {
        return await db.posts.getAllPosts()
      }
    },
    users: {
      type: new GraphQLList(User),
      resolve: async () => {
        return await db.user.getAllUser()
      }
    },
    user: {
      type: User,
      resolve: async (parent, args) => {
        const {email} = args
        return await db.user.getUser(email)
      }
    }
  }
})

export default {
  schema: new GraphQLSchema({ query: Query, mutation: Mutation })}