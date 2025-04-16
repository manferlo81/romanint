import convert from '../src/index'
import { each } from './tools/each'

test('should throw on negative number', () => {
  const negative = [
    -1,
    -10,
  ]
  negative.forEach((input) => {
    expect(() => convert(input)).toThrow()
  })
})

test('should throw on out of bound number', () => {
  expect(() => convert(4000)).toThrow()
})

test('should throw on invalid input', () => {
  const invalid = [
    '',
    NaN,
    'string',
    '-1',
    '-0.99',
    '4000',
  ]
  invalid.forEach((input) => {
    expect(() => convert(input as never)).toThrow()
  })
})

test('should convert number to roman number', () => {
  each((num, expected) => {
    expect(convert(num)).toBe(expected)
  })
})

test('should convert numeric string to roman number', () => {
  each((num, expected) => {
    const inputs = [
      { pre: '', radix: 10 },
      { pre: '0b', radix: 2 },
      { pre: '0o', radix: 8 },
      { pre: '0x', radix: 16 },
    ]
    inputs.forEach(({ pre, radix }) => {
      const input = `${pre}${num.toString(radix)}`
      expect(convert(input as never)).toBe(expected)
    })
  })
})
