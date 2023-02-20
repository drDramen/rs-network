const isEmailValid = (email: string): boolean => {
  let isValid = true;
  const regEx = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
  if (!regEx.test(email)) {
    isValid = false;
  }
  return isValid;
};

export default isEmailValid;
