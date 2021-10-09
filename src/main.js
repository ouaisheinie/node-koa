const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(5000, () => {
    console.log('server is running on localhost:5000')
})