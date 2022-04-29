# unocss-preset-short

## 安装

```bash
  npm install unocss-preset-short -D
```

## 使用

```js
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';
import { presetShort } from 'unocss-preset-short';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetShort(),
  ],
});
```

```html
<div class="size-auto" />
<div class="size-full" />
<div class="size-1/2" />
<div class="size-xs" />
<div class="size-1" />
<div class="size-[1px]" />
```

这将生成以下 css 代码

```css
.size-auto { width: auto; height: auto; }
.size-full { width: 100%; height: 100%; }
.size-1/2 { width: 50%; height: 50%; }
.size-xs { width: 20rem; height: 20rem; }
.size-1 { width: 0.25rem; height: 0.25rem; }
.size-[1px] { width: 1px; height: 1px; }
```

## License

unocss-preset-short is licensed under a [MIT License](./LICENSE).