export const isEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

export const isMobilePhone = (phone: string) =>
  /^(\+?91|0)?[789]\d{9}$/.test(phone);
