import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import logger from "morgan"
import graphqlHTTP from "express-graphql"
import graphql from "./../graphql"

process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == "production"
    ? "production"
    : "development"

const app = express()

app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
)

app.get("/status", (req, res) => {
  res.send({
    message: "hello world!"
  })
})

app.listen(process.env.PORT || 4000)
