// const Koa = require('koa')
// const Router = require('koa-router')
// const bodyparser = require('koa-bodyparser')
import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import mongoose from 'mongoose'
import cors from 'koa-cors'

const app = new Koa()
const db = mongoose.connect("mongodb://localhost/testDB")
app.use(bodyparser())
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));  // Solve the cors problem

let UserSchema = new mongoose.Schema({
  username: String,
  age: Number
})  //Create a data model

let User = mongoose.model('User',UserSchema)  //Instantiate the model

// let user = {
//   username: 'Kiris',
//   age: 19
// }                 //Instantiate a data

// let userData = new User(user) //Put the data into the model

// userData.save()

const router = new Router({
  prefix: '/api'
})

router.get('/userInfo',async (ctx,next) => {
  let val = null
  const data = await User.find({username: 'Kiris'})
  const result = {
    statusCode: 200,
    res: data
  }
  ctx.body = result
})
app.use(router.routes())

app.listen(8080,(ctx) => {
  console.log('Running in 8080')
})