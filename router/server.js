const Koa = require('koa');
const Router = require('koa-tree-router');
const Crypto = require('crypto');

const app = new Koa();
const router = new Router();

const urlCache = () => {
  let cache = new Map();

  const key = new Int32Array([
    0x8360af7b, 0x04da33d5,
    0xc865ac67, 0x5b4ff51c
  ]);

  const toURL = n => {
    const hmac = Crypto.createHmac('sha256', key);
    hmac.update(`${n}`);
    return `/${hmac.digest('hex')}`
  }

  return n => {
    if (cache.has(n)) {
      return cache.get(n);
    }

    let newURL = toURL(n);
    cache.set(n, newURL);
    return newURL;
  }
}

const prng = () => {
  let s = [ 0xac88c921, 0xba480bf8 ];

  const rotl = (k, x) => {
    const a = (x << k) >>> 0,
          b = x >>> (32 - k);

    return (a | b) >>> 0;
  };

  const rotl26 = rotl.bind(null, 26),
        rotl13 = rotl.bind(null, 13);

  return () => {
    const s0 = s[0],
          result = (s0 * 0x9E3779BB) >>> 0;

    let s1 = s[1];

    s1 ^= s0;
    s[0] = (rotl26(s0) ^ s1 ^ (s1 << 9)) >> 0;
    s[1] = rotl13(s1);

    return ((result & 0xFFFFFFF0) >>> 4) / (1 << 28);
  }
}

const getURL = urlCache(),
      nextFloat = prng();

const mazeBuilder = () => {
  let maze = new Map(),
      visited = 1,
      special = [];

  const flag = s => {
    let n = Math.floor(nextFloat() * maze.size) + 2;

    while (special.includes(n)) {
      n = Math.floor(nextFloat() * maze.size) + 2;
    }

    let node = maze.get(n);
    node.message = s;
    special.push(n);
  }

  const populate = (n, d) => {
    if (d < 1) {
      maze.set(n, { message: 'You\'ve reached the end of the world.' });
    } else {
      let children = [],
          size = Math.floor(nextFloat() * 6) + 1;

      for (let i = 0; i < size; i++) {
        let child = visited++;
        children[i] = child;
        populate(child, d - 1);
      }
      maze.set(n, { children });
    }
  }

  populate(visited++, 6);

  flag('1: mazes');
  flag('2: _shou')
  flag('3: ld_on');
  flag('4: ly_ha');
  flag('5: ve_on');
  flag('6: e_end');

  return maze;
}

const maze = mazeBuilder();

maze.forEach((value, key, map) => {
  router.get(getURL(key), ctx => {
    let redirect = false;
    ctx.body = '';

    if (value.children) {
      const n = Math.floor(Math.random() * value.children.length);
      ctx.redirect(getURL(value.children[n]));
      ctx.body = `Redirecting to path ${n + 1} of ${value.children.length}`;
      redirect = true;
    }

    if (value.message) {
      if (redirect)
        ctx.body += '\n';
      ctx.body += value.message;
    }
  });
});

router.get('/', ctx => {
  ctx.redirect(getURL(1));
});

app.use(router.routes());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
