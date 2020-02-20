function f1(num: number, i: number, symbols: string[]): string {
  const unity = symbols[i]
  const unity2 = unity + unity
  const unity3 = unity2 + unity
  const five = symbols[i + 1]
  const db = [
    '',
    unity,
    unity2,
    unity3,
    unity + five,
    five,
    five + unity,
    five + unity2,
    five + unity3,
    unity + symbols[i + 2],
  ]
  const result = db[num % 10]
  const next = Math.floor(num / 10)
  return next > 0 ? (f1(next, i + 2, symbols) + result) : result
}

function toRoman(num: number): string {
  const n = Math.floor(+num)
  if (n < 0) {
    throw new RangeError('number can\'t be less than zero.')
  }
  if (n >= 4000) {
    throw new RangeError('number can\'t be greater than 3999.')
  }
  return f1(n, 0, 'IVXLCDM'.split(''))
}

export default toRoman
