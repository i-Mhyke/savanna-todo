import { loginFormSchema } from "@/components/templates/LoginPageTemplates/login.page.template";
import { signupFormSchema } from "@/components/templates/SignupPageTemplates/signup.page.template";

export const signupFormValidation = (value: signupFormSchema) => {
  const errors: any = {};
  if (!value.name) {
    errors.name = "Name is required";
  }
  if (!value.email) {
    errors.email = "Email is required";
  }
  if (!value.password) {
    errors.password = "Password is required";
  }
  if (value.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (value.password !== value.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }
  return errors;
};

export const loginFormValidation = (value: loginFormSchema) => {
  const errors: any = {};
  if (!value.email) {
    errors.email = "Email is required";
  }
  if (!value.password) {
    errors.password = "Password is required";
  }
  return errors;
};
