import convert from '../src/index'

test('should convert to roman number', () => {
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
    'M'
  ]
  mils.forEach((milSym, mil) => {
    cents.forEach((centSym, cent) => {
      decs.forEach((decSym, dec) => {
        unities.forEach((unitySym, unity) => {
          expect(convert(mil * 1000 + cent * 100 + dec * 10 + unity)).toBe(milSym + centSym + decSym + unitySym)
        })
      })
    })
  })
})
