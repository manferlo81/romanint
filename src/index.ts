const { floor } = Math

function fmt(asInteger: number, symbols: string, unityIndex: number): string {

  const one = symbols[unityIndex]
  const two = `${one}${one}`
  const three = `${two}${one}`
  const five = symbols[unityIndex + 1]

  const result = [
    '',
    one,
    two,
    three,
    `${one}${five}`,
    five,
    `${five}${one}`,
    `${five}${two}`,
    `${five}${three}`,
    `${one}${symbols[unityIndex + 2]}`,
  ][asInteger % 10]

  const next = floor(asInteger / 10)

  if (!next) return result

  const prefix = fmt(next, symbols, unityIndex + 2)
  return `${prefix}${result}`

}

function format(num: number): string {

  if (!num && num !== 0) {
    throw new TypeError(`"${num}" is not a valid numeric value.`)
  }

  const asInteger = floor(num)

  if (isNaN(asInteger)) {
    throw new TypeError(`"${num}" is not a valid numeric value.`)
  }

  if (asInteger < 0) {
    throw new RangeError('number can\'t be less than zero.')
  }

  if (asInteger > 3999) {
    throw new RangeError('number can\'t be greater than 3999.')
  }

  return fmt(asInteger, 'IVXLCDM', 0)

}

export default format
