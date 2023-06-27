/*!
 * dechroma.js
 * Copyright(c) 2023 Phurit D.
 * MIT Licensed
 */

/**
 * A utility library for chroma keying canvas video.
 * @packageDocumentation
 */

/**
 * Removes a range of RGB values from a frame.
 *
 * @param {ImageData} frame - The frame to be processed.
 * @param {number[]} r - The range of red values to be removed.
 * @param {number[]} g - The range of green values to be removed.
 * @param {number[]} b - The range of blue values to be removed.
 *
 * @returns {void}
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
  r: [number, number] = [0, 0],
  g: [number, number] = [0, 255],
  b: [number, number] = [0, 0]
): void {
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
