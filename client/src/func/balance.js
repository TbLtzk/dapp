export const roundBalance = (num, zeroAfterComa = false) => {
  if (undefined === num || num.isNaN) return 0;

  let roundedNum = Math.round(Number(num) * 10000) / 10000;

  if (zeroAfterComa === true) {
    roundedNum = String(roundedNum);
    const splitedNum = roundedNum.split('.');
    if (undefined !== splitedNum[1]) {
      for (let i = 0; i < 4 - splitedNum[1].length; i++) {
        roundedNum += '0';
      }
    }
  }

  return roundedNum;
};

export const QToWei = (Q) => Q * 1000000000000000000;

export const WeiToQ = (Wei) => {
  if (Wei === 0) return 0;
  return Wei / 1000000000000000000;
};
