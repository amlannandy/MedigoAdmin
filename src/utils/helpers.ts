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
    const currElement = `${getMonth(
      currentDate.getMonth()
    )}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
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

export const getEndTime = (startTime: string) => {
  var totalInMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  var otherMinutes = 30;
  var grandTotal = otherMinutes + totalInMinutes;
  var hh = Math.floor(grandTotal / 60);
  var mm = grandTotal % 60;
  var endTime = hh + ':' + mm;
  return endTime;
};
