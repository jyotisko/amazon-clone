export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (days: number): string => {
  const dateTimestamp = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
  const day = dateTimestamp.getDate();
  const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateTimestamp);
  const month = MONTHS[dateTimestamp.getMonth()];
  return `${weekDay}, ${month} ${day}`;
}
