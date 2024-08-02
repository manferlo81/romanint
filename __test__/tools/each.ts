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
  ];

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
  ];

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
  ];

  const mils = [
    '',
    'M',
    'MM',
    'MMM',
  ];

  mils.forEach((milSym, mil) => {
    cents.forEach((centSym, cent) => {
      decs.forEach((decSym, dec) => {
        unities.forEach((unitySym, unity) => {
          const num = mil * 1000 + cent * 100 + dec * 10 + unity;
          const expected = milSym + centSym + decSym + unitySym;
          callback(num, expected);
        });
      });
    });
  });

}
