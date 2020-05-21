import convert from '../src/index';
import { each } from './tools/each';

test('should throw on negative number', () => {
  expect(() => convert(-1)).toThrow();
});

test('should throw on out of bound number', () => {
  expect(() => convert(4000)).toThrow();
});

test('should throw on invalid input', () => {

  const invalids = [
    '',
    NaN,
    'string',
    '-1',
    '-0.99',
    '4000',
  ];

  invalids.forEach((invalid) => {
    expect(() => convert(invalid as never)).toThrow();
  });

});

test('should convert number to roman number', () => {
  each((num, expected) => {
    expect(convert(num)).toBe(expected);
  });
});

test('should convert numeric string to roman number', () => {
  each((num, expected) => {
    expect(convert(`${num}` as never)).toBe(expected);
  });
});
