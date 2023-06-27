/*!
 * dechroma.js
 * Copyright(c) 2023 Phurit D.
 * MIT Licensed
 */

/**
 * A utility library for chroma keying canvas-manipulated video.
 * @packageDocumentation
 */

import { type ChromaKeyRange } from './types';

/**
 * Removes a range of RGB values from a frame.
 *
 * @param {ImageData} frame - The frame to be processed.
 * @param {ChromaKeyRange} r - The range of red values to be removed.
 * @param {ChromaKeyRange} g - The range of green values to be removed.
 * @param {ChromaKeyRange} b - The range of blue values to be removed.
 *
 * @returns {void}
 *
 * @throws {RangeError} ChromaKeyRange: index[0] must not be greater than index[1]
 *
 * @example Here's a simple example:
 * ```js
 * const c = document.querySelector('canvas');
 * const ctx = c.getContext('2d');
 * const frame = ctx.getImageData(0, 0, width, height);
 *
 * dechroma(frame, [0, 100], [170, 255], [0, 110]);
 * ```
 */
function dechroma(
  frame: ImageData,
  r: ChromaKeyRange = [0, 0],
  g: ChromaKeyRange = [0, 255],
  b: ChromaKeyRange = [0, 0]
): void {
  // Check if the range is valid
  if (r[0] > r[1] || g[0] > g[1] || b[0] > b[1]) {
    throw new RangeError(
      'ChromaKeyRange: index[0] must not be greater than index[1]'
    );
  }

  for (let i = 0; i < frame.data.length; i += 4) {
    // Get the pixel's RGB values
    const red = frame.data[i];
    const green = frame.data[i + 1];
    const blue = frame.data[i + 2];

    // Check if the pixel is within the range
    if (
      red >= r[0] &&
      red <= r[1] &&
      green >= g[0] &&
      green <= g[1] &&
      blue >= b[0] &&
      blue <= b[1]
    ) {
      // If the pixel is within the range, set the alpha to 0
      frame.data[i + 3] = 0;
    }
  }
}

export { dechroma };
export default dechroma;
