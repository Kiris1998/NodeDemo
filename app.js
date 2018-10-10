//通过引入"babel-plugin-transform-es2015-modules-commonjs"插件实现import语法
import Koa from 'koa'
import cors from 'koa-cors'
import router from './routers/api'
import bodyparser from 'koa-bodyparser'

const app = new Koa()
app.use(bodyparser())        //解决post请求的插件
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));  // 解决跨域问题

app.use(router.routes())
  //  .use(router.allowedMethods())

app.listen(8080,(ctx) => {
  console.log('Running in 8080')
})