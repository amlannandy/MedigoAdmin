export const isEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export const isMobilePhone = (phone: string) =>
  /^(\+?91|0)?[789]\d{9}$/.test(phone);

export const getDates = () => {
  var dates = [];
  const nowDate = new Date();
  for (var i = 0; i <= 6; i++) {
    let currentDate = new Date();
    currentDate.setDate(nowDate.getDate() + i);
    const currElement = `${currentDate.getDate()}-${getMonth(
      currentDate.getMonth()
    )}-${currentDate.getFullYear()}`;
    dates.push(currElement);
  }
  return dates;
};

const getMonth = (month: number) => {
  if (month < 10) {
    return '0' + month;
  }
  return month;
};
