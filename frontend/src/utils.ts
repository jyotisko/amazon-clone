import numeral from 'numeral';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MAX_HISTORY_CAPACITY = 8;

export const availableCurrencies = [
  {
    currency: 'USD',
    symbol: '$',
    multiplier: 1,
    currencyName: 'US Dollar'
  },
  {
    currency: 'INR',
    symbol: '₹',
    multiplier: 74.16,
    currencyName: 'Indian Rupee'
  },
  {
    currency: 'Euro',
    symbol: '€',
    multiplier: 0.85,
    currencyName: 'Euro'
  },
  {
    currency: 'RUB',
    symbol: '₽',
    multiplier: 73.76,
    currencyName: 'Russian Ruble'
  }
];

export const countries = ['USA', 'India', 'Russia', 'UAE', 'Nepal', 'China', 'Portugal', 'Spain'];

export const getDate = (days: number): string => {
  const dateTimestamp = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
  const day = dateTimestamp.getDate();
  const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateTimestamp);
  const month = MONTHS[dateTimestamp.getMonth()];
  return `${weekDay}, ${month} ${day}`;
};

export const formatNumber = (prefix: string, number: number) => {
  const formattedNumber = numeral(number.toFixed(2)).format('0,0');
  return `${prefix}${formattedNumber}`;
};