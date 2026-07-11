export const validateRegister = ({
  firstname,
  lastname,
  email,
  password,
  phone,
}) => {

  const errors = [];

  if (!firstname || firstname.length < 2) {
    errors.push("Invalid first name");
  }

  if (!lastname || lastname.length < 2) {
    errors.push("Invalid last name");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  if (!emailRegex.test(email)) {
    errors.push("Invalid email");
  }

 const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;

if (!passwordRegex.test(password)) {
  errors.push(
    "Password must contain at least 10 characters, one letter, one number and one special character"
  );
}

  const phoneRegex = /^\d{9}$/;

  if (!phoneRegex.test(phone)) {
    errors.push("Phone must contain 9 digits");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }

};