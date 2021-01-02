const app = new (require('koa'))();

const {router} = require('./router');
const serve = require('koa-static');

app.use(require('koa-logger')());
app.use(require('koa-body')());

//app.use(serve('app'));
app.use(router.routes());


app.listen(3000);