const Koa = require('koa');
const Router = require('koa-tree-router');
const Auth = require('koa-basic-auth');
const Flag = require('./flag');

const app = new Koa();
const router = new Router();

const credentials = { name: 'Jerry', pass: 'ThisIsMySuperSecurePassword1!' };

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status == 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'Error: Invalid Credentials.';
    } else {
      ctx.status = 400;
      ctx.body = `Uh-oh: ${err.message}`;
      console.log('Error handler:', err.message);
    }
  }
});

router.get('/', async ctx => {
  ctx.body = 'hello';
});

router.get('/portal', Auth(credentials), async ctx => {
  ctx.body = Flag;
});

app.use(router.routes());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
