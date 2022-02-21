export const DEFAULT_PAIRS = [
  {
    label: 'USDC / WETH',
    imageUrl: '',
    pairId: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  },
  {
    label: 'WETH / RKFL',
    imageUrl: '',
    pairId: '0xbc9d21652cca70f54351e3fb982c6b5dbe992a22',
  },
];

export const UNISWAP_V2_UNITARY_FEE = 0.003;
export const EXPIRING_PERIOD_MS = 60 * 60 * 1000; // mins * secs * ms (in an hour)
export const DAY_IN_HOURS = 24;
export const HOUR_IN_SECONDS = 3600;
export const HOUR_IN_MS = HOUR_IN_SECONDS * 1000;
export const YEAR_IN_HOURS = 24 * 365;
export const YEAR_IN_DAYS = 365;
export const WEEK_IN_HOURS = DAY_IN_HOURS * 7;
export const HOUR_AVERAGE_LIMIT = WEEK_IN_HOURS;
