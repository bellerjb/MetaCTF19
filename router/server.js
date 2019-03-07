const Koa = require('koa');
const Router = require('koa-tree-router');
const Crypto = require('crypto');

const app = new Koa();
const router = new Router();

const key = new Int32Array([
  0x8360af7b, 0x04da33d5,
  0xc865ac67, 0x5b4ff51c
]);

const maze = new Map([
  [1, [2, 3]],
  [2, [3]],
  [3, 'Hello']
]);

const toURL = n => {
  const hmac = Crypto.createHmac('sha256', key);
  hmac.update(`${n}`);
  return `/${hmac.digest('hex')}`
}

maze.forEach((value, key, map) => {
  router.get(toURL(key), ctx => {
    if (Array.isArray(value)) {
      const n = Math.floor(Math.random() * value.length);
      ctx.redirect(toURL(value[n]));
      ctx.body = `Redirecting to path ${n + 1} of ${value.length}`;
    } else {
      ctx.body = value;
    }
  });
});

router.get('/', ctx => {
  ctx.redirect(toURL(1));
});

app.use(router.routes());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
