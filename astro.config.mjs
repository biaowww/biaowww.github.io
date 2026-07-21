import { defineConfig } from 'astro/config';

// GitHub Pages · project page（仓库 biaowww/my-site）
// 若日后提升为 user page（仓库 biaowww.github.io），删掉 base 这一行即可。
export default defineConfig({
  site: 'https://biaowww.github.io',
  base: '/my-site',
});
