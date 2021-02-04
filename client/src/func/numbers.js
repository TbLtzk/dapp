import { drizzleRegistry, web3 } from '../contracts/config/drizzle-config';

export const fromBtcBlockchain = (btc) => {
  if (btc.isNaN === true) return 0;
  return btc / 1e+8;
};

export const toBtcBlockchain = (num) => {
  if (num.isNaN === true) return 0;
  return num * 1e+8;
};

const decimalAdjust = (type, value, exp) => {
  // Если степень не определена, либо равна нулю...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // Если значение не является числом, либо степень не является целым числом...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Сдвиг разрядов
  value = value.toString()
    .split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Обратный сдвиг
  value = value.toString()
    .split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
};

export const roundNumbers = (value, exp) => {
  return decimalAdjust('round', value, exp);
};

export const maxApproveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const max_allowance = "115792089237316195423570985008687907853269984665640564039457.584007913129639935";
