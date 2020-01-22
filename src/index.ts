function repeat(s: string, count: number) {
  let r = ''
  while (r.length < count) {
    r += s
  }
  return r
}

const symbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

function f1(num: number, i: number): string {
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
  return nnn > 0 ? f1(nnn, i + 2) + r : r
}

function convert(num: number): string {
  const n = Math.floor(+num)
  if (n < 0) {
    throw new TypeError('number can\'t be less than zero.')
  }
  return f1(n, 0)
}

export default convert
