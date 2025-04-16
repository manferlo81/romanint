export function each(callback: (num: number, expected: string) => void): void {

  const unities = [
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
  ]

  const decs = [
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
  ]

  const cents = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
  ]

  const mils = [
    '',
    'M',
    'MM',
    'MMM',
  ]

  mils.forEach((milSymbol, milMultiplier) => {
    cents.forEach((centSymbol, centMultiplier) => {
      decs.forEach((decSymbol, decMultiplier) => {
        unities.forEach((unitySymbol, unity) => {
          const number = 1000 * milMultiplier + 100 * centMultiplier + 10 * decMultiplier + unity
          const romanExpected = `${milSymbol}${centSymbol}${decSymbol}${unitySymbol}`
          callback(number, romanExpected)
        })
      })
    })
  })

}
