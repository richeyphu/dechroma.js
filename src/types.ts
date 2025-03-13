/*!
 * dechroma.js
 * Copyright(c) 2023 Phurit D.
 * MIT Licensed
 */

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type RGBValues = IntRange<0, 256>;

type ChromaKeyRange = [RGBValues, RGBValues];

export { ChromaKeyRange };
