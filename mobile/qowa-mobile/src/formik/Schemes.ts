import * as yup from "yup";

const EmailReg = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const email = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Email must be valid")
  .matches(EmailReg, "Email must be valid");

const name = (label: string) =>
  yup.string().trim().required(`${label} is required`).max(50, `${label} is too long`);

export const Email_Schema = yup.object({
  email,
});

export const Login_Schema = yup.object({
  email,
  password: yup.string().required("Password is required"),
});

export const Signup_Schema = yup.object({
  firstName: name("First name"),
  lastName: name("Last name"),
  email,
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
});
