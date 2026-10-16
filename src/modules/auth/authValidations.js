
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;

export const validateRegister = ({
  firstName,
  lastName,
  email,
  password,
  phone
}) => {
  const errors = [];

  if (typeof firstName !== "string" || firstName.trim().length < 2) {
    errors.push("First name must contain at least 2 characters");
  }

  if (typeof lastName !== "string" || lastName.trim().length < 2) {
    errors.push("Last name must contain at least 2 characters");
  }

  if (typeof email !== "string" || !emailRegex.test(email.trim())) {
    errors.push("Invalid email address");
  }

  if (typeof password !== "string" || !passwordRegex.test(password)) {
    errors.push(
      "Password must contain at least 10 characters, one letter, one number and one special character"
    );
  }

  if (typeof phone !== "string" || !/^\d{9}$/.test(phone.trim())) {
    errors.push("Phone must contain 9 digits");
  }

  if (errors.length) {
    throw new Error(errors.join(", "));
  }
};

export const validateVerifyEmail = ({ email, code }) => {
  if (typeof email !== "string" || !emailRegex.test(email.trim())) {
    throw new Error("Invalid email address");
  }

  if (typeof code !== "string" || !/^\d{6}$/.test(code.trim())) {
    throw new Error("Verification code must contain 6 digits");
  }
};

export const validateResendVerification = ({ email }) => {
  if (typeof email !== "string" || !emailRegex.test(email.trim())) {
    throw new Error("Invalid email address");
  }
};

export const validateLogin = ({ email, password }) => {
  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("Email is required");
  }

  if (typeof password !== "string" || password === "") {
    throw new Error("Password is required");
  }
};

export const validateForgotPassword = ({ email }) => {
  if (typeof email !== "string" || !emailRegex.test(email.trim())) {
    throw new Error("Invalid email address");
  }
};

export const validateResetPassword = ({ token, newPassword }) => {
  if (typeof token !== "string" || token.trim() === "") {
    throw new Error("Reset token is required");
  }

  if (typeof newPassword !== "string" || !passwordRegex.test(newPassword)) {
    throw new Error(
      "Password must contain at least 10 characters, one letter, one number and one special character"
    );
  }
};
