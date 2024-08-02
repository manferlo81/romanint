const { floor } = Math;

function fmt(num: number, i: number, symbols: string[]): string {

  const unity = symbols[i];
  const unity2 = unity + unity;
  const unity3 = unity2 + unity;
  const five = symbols[i + 1];

  const result = [
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
  ][num % 10];

  const next = floor(num / 10);
  return next ? fmt(next, i + 2, symbols) + result : result;

}

function format(num: number): string {

  if (!num && num !== 0) {
    throw new TypeError(`"${num}" is not a valid numeric value.`);
  }

  const n = floor(num);

  if (isNaN(n)) {
    throw new TypeError(`"${num}" is not a valid numeric value.`);
  }

  if (n < 0) {
    throw new RangeError('number can\'t be less than zero.');
  }

  if (n > 3999) {
    throw new RangeError('number can\'t be greater than 3999.');
  }

  return fmt(
    n,
    0,
    'IVXLCDM'.split(''),
  );

}

export default format;
