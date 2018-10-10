import Router from 'koa-router'
import User from '../mongo'

const router = new Router({
  prefix: '/api'
})

router.get('/userInfo',async (ctx,next) => {
    let val = null
    const data = await User.find()
    const result = {
      statusCode: 200,
      res: data
    }
    ctx.body = result
    next()
  })
router.post('/userInfo',async (ctx,next) => {
    let postData = ctx.request.body
    // console.log(postData)
    let userData = new User(postData) //Put the data into the model
    userData.save()
    const result = {
      statusCode: 200,
      res: 'Add successfully'
    }
    ctx.body = result
    next()
  })
router.post('/searchInfo',async (ctx,next) => {
  let postData = ctx.request.body
  let searchData = await User.find(postData)
  const result = {
    statusCode: 200,
    res: searchData,
    mes: 'Successfully'
  }
  ctx.body = result
  next()
})
router.post('/deleteInfo',async (ctx,next) => {
  let deleteData = ctx.request.body
  console.log(deleteData)
  let deleteInfo = await User.remove(deleteData)
  const result = {
    statusCode: 200,
    mes: 'Successfully',
    res: deleteInfo
  }
  ctx.body = result
  next()
})
router.post('/editInfo',async (ctx,next) => {
  let editData = ctx.request.body
  console.log(editData)
  let id = editData._id
  console.log(id)
  let editInfo = await User.updateOne({"_id":id},{
    $set: {
      username: editData.username,
      age: editData.age
    }
  })
  console.log(editInfo)
  const result = {
    statusCode: 200,
    mes: 'Successfully',
    res: editInfo
  }
  ctx.body = result
})

export default router