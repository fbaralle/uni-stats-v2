import upperFirst from 'lodash/upperFirst';

const currencyFormatter = {
  rounded: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }),
  fixed: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
};

function toCurrency(number, method = 'fixed') {
  return currencyFormatter[method].format(number).replace('US', '');
}

function removeCurrencyFormat(currency) {
  const noCurrencyRegex = /[^0-9.]+/g;

  if (typeof currency !== 'string') {
    return currency;
  }

  return Number(currency.replace(noCurrencyRegex, ''));
}

function toMinorUnits(number) {
  return parseInt((number * 100).toFixed(), 10);
}

function toLargerUnits(number) {
  return (number / 100).toFixed(2);
}

function prependPrefixToObject(object, prefix) {
  const formattedObject = {};

  Object.keys(object).forEach((key) => {
    const property = upperFirst(key);

    formattedObject[`${prefix}${property}`] = object[key];
  });

  return formattedObject;
}

export {
  toCurrency,
  removeCurrencyFormat,
  toMinorUnits,
  toLargerUnits,
  prependPrefixToObject,
};
