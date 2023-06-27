# dechroma.js

[![NPM version](https://img.shields.io/npm/v/dechroma.svg)](https://www.npmjs.com/package/dechroma)
[![NPM total downloads](https://img.shields.io/npm/dt/dechroma)](https://npmjs.org/package/dechroma)
[![install size](https://packagephobia.com/badge?p=dechroma)](https://packagephobia.com/result?p=dechroma)
[![minified size](https://img.shields.io/bundlephobia/min/dechroma)](https://bundlephobia.com/package/dechroma)

Chroma key compositing (e.g., green screen) for HTML canvas-manipulated video, using [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).

## Install

```sh
$ npm i dechroma
# or
$ yarn add dechroma
# or
$ pnpm add dechroma
```

## Example

```js
import { dechroma } from 'dechroma';

...

const video = document.querySelector('video');
const c = document.querySelector('canvas');
const ctx = c.getContext('2d');

...

video.addEventListener('play', drawVideo);

function drawVideo() {
  ctx.drawImage(video, 0, 0, width, height);
  const frame = ctx.getImageData(0, 0, width, height);

  // Remove green screen
  dechroma(frame, [0, 100], [170, 255], [0, 110]);

  ctx.putImageData(frame, 0, 0);
  requestAnimationFrame(drawVideo);
}
```

## License

Licensed under the [MIT License](LICENSE).
