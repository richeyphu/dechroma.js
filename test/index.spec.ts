import dechroma from '../src/index';

class MockImageData {
  width: number;
  height: number;
  data: Uint8ClampedArray;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = new Uint8ClampedArray(width * height * 4);
  }
}

beforeAll(() => {
  global.ImageData = MockImageData as any;
});

describe('dechroma', () => {
  it('should remove pixels within the specified RGB range', () => {
    const width = 2;
    const height = 2;
    const frame = new ImageData(width, height);

    // prettier-ignore
    frame.data.set([
      // [R, G, B, A]
      0, 255, 0, 255, // Pixel 1: Green
      255, 0, 0, 255, // Pixel 2: Red
      0, 0, 255, 255, // Pixel 3: Blue
      0, 0, 0, 255,   // Pixel 4: Black
    ]);

    dechroma(frame, [0, 100], [170, 255], [0, 110]);

    expect(frame.data[3]).toBe(0); // Pixel 1 alpha should be 0
    expect(frame.data[7]).toBe(255); // Pixel 2 alpha should remain 255
    expect(frame.data[11]).toBe(255); // Pixel 3 alpha should remain 255
    expect(frame.data[15]).toBe(255); // Pixel 4 alpha should remain 255
  });

  it('should throw an error if the range is invalid', () => {
    const width = 1;
    const height = 1;
    const frame = new ImageData(width, height);

    expect(() => {
      dechroma(frame, [100, 0], [0, 255], [0, 0]);
    }).toThrow(RangeError);

    expect(() => {
      dechroma(frame, [0, 0], [255, 0], [0, 0]);
    }).toThrow(RangeError);

    expect(() => {
      dechroma(frame, [0, 0], [0, 255], [110, 0]);
    }).toThrow(RangeError);
  });

  it('should not alter pixels outside the specified RGB range', () => {
    const width = 2;
    const height = 2;
    const frame = new ImageData(width, height);

    // prettier-ignore
    frame.data.set([
      // [R, G, B, A]
      0, 255, 0, 255, // Pixel 1: Green
      255, 0, 0, 255, // Pixel 2: Red
      0, 0, 255, 255, // Pixel 3: Blue
      0, 0, 0, 255,   // Pixel 4: Black
    ]);

    dechroma(frame, [0, 0], [0, 0], [0, 0]);

    expect(frame.data[3]).toBe(255); // Pixel 1 alpha should remain 255
    expect(frame.data[7]).toBe(255); // Pixel 2 alpha should remain 255
    expect(frame.data[11]).toBe(255); // Pixel 3 alpha should remain 255
    expect(frame.data[15]).toBe(0); // Pixel 4 alpha should remain 0
  });
});
