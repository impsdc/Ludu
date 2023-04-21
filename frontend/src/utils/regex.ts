export const isValidPhonenumber = (value) => {
  const match = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g;
  return match.test(value);
};
export const isZipCodeValide = (value: string) => {
  const match = /\b\d{5}\b/g;
  return match.test(value);
};

export const isEmailInvalid = (email: string) => {
  const match =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !match.test(email);
};

export const isPasswordInvalid = (password: string) => {
  const match = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return !match.test(password);
};
