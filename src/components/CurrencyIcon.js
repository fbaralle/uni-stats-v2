const CURRENCIES = {
  WETH: {
    iconPath: '/icons/crypto/eth.svg',
  },
  UNI: {
    iconPath: '/icons/crypto/uni.svg',
  },
  USD: {
    iconPath: '/icons/crypto/usd.svg',
  },
  USDC: {
    iconPath: '/icons/crypto/usdc.svg',
  },
  RKFL: {
    iconPath: '/icons/crypto/rkfl.svg',
  },
};

const getCurrencyIconPath = (currency) => {
  return CURRENCIES[currency].iconPath;
};

const CurrencyIcon = ({ currency, props }) => {
  return (
    getCurrencyIconPath(currency) && (
      <img
        src={getCurrencyIconPath(currency)}
        alt="next"
        width={25}
        {...props}
      />
    )
  );
};

export default CurrencyIcon;
