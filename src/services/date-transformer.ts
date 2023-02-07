const MONTH = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const dateTransformer = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = MONTH[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day > 9 ? day : '0' + `${day}`} ${month} ${year} ${
    hours > 9 ? hours : '0' + `${hours}`
  }:${minutes > 9 ? minutes : '0' + `${minutes}`}`;
};

export default dateTransformer;
