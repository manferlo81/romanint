function repeat(s: string, count: number): string {
  let r = ''
  while (r.length < count) {
    r += s
  }
  return r
}

function f1(num: number, i: number, symbols: string[]): string {
  const unity = symbols[i]
  const five = symbols[i + 1]
  const ten = symbols[i + 2]
  const db = [
    '',
    unity,
    repeat(unity, 2),
    repeat(unity, 3),
    `${unity}${five}`,
    five,
    `${five}${unity}`,
    `${five}${repeat(unity, 2)}`,
    `${five}${repeat(unity, 3)}`,
    `${unity}${ten}`,
  ]
  const r = db[num % 10]
  const nnn = Math.floor(num / 10)
  return nnn > 0 ? `${f1(nnn, i + 2, symbols)}${r}` : r
}

function convert(num: number): string {
  const n = Math.floor(+num)
  if (n < 0) {
    throw new RangeError('number can\'t be less than zero.')
  }
  if (n >= 4000) {
    throw new RangeError('number can\'t be greater than 3999.')
  }
  return f1(n, 0, ['I', 'V', 'X', 'L', 'C', 'D', 'M'])
}

export default convert
