export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

// ------------------------------------------------------------------------------------------------
export function validateEmail(emailInput) {
  const email = emailInput.trim();
  if (email.length === 0) return "please enter an email address";
  if (!email.includes("@"))
    return "email address should include the '@' character";
  const [first, second] = email.split("@");
  if (first.length === 0) return "please enter a part followed by '@'";
  if (second.length === 0) return "please enter a part following '@'";

  return null;
}

export function validatePassword(passwordInput) {
  // white-spaces are allowed
  const minPasswordLength = 8;
  const maxPasswordLength = 20;
  if (
    passwordInput.length < minPasswordLength ||
    passwordInput.length > maxPasswordLength
  ) {
    return `the password should be ${minPasswordLength} to ${maxPasswordLength} characters long`;
  }

  return null;
}

export function validateName(nameInput) {
  const name = nameInput.trim();
  if (name.length === 0) {
    return "name cannot be empty";
  }

  return null;
}
