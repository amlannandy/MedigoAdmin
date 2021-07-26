export const isEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
