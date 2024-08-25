"use client";
import { AppContainer } from "@/components/commons/AppContainer";
import { SocialLogin } from "@/components/commons/SocialLogin";
import Button from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/inputs/Input";
import { Label } from "@/components/ui/inputs/Label";
import { firebaseSignUp } from "@/controllers/firebase.auth";
import { signupFormValidation } from "@/libs/helpers";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type signupFormSchema = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupPageTemplate = () => {
  const [formErrors, setErrors] = useState<signupFormSchema>();
  const router = useRouter();
  const [formLoading, setLoading] = useState<boolean>();
  const [formWarning, setWarning] = useState<string>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = Object.fromEntries(formData.entries()) as signupFormSchema;
    const errors = signupFormValidation(value);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    try {
      setErrors(undefined);
      setWarning(undefined);
      setLoading(true);
      const register = await firebaseSignUp(
        value.name,
        value.email,
        value.password
      );
      setLoading(false);
      router.push("/todo");
    } catch (error) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setWarning("Account already exists, kindly login to continue.");
          return;
        }
        setWarning(error.message);
      }
    }
  };

  return (
    <AppContainer className="h-screen">
      <div className="flex justify-between h-full w-full gap-5 py-10">
        <div className="lg:w-1/2 h-full flex flex-col items-center justify-center relative">
          <div className="max-w-[360px] space-y-5">
            <h2 className="font-semibold">Welcome to App 👋🏼</h2>
            <p>
              Today is a new day. Its your day. You shape it. Signup to start
              managing your projects
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Example@email.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  required
                  type="password"
                  placeholder="At least 8 characters"
                />
              </div>
              <p className="text-accent">
                {formErrors?.name ||
                  formErrors?.email ||
                  formErrors?.password ||
                  formErrors?.confirmPassword}
              </p>
              <p className="text-accent">{formWarning}</p>
              <Button type="submit" className="w-full" isLoading={formLoading}>
                Create Account
              </Button>
            </form>
            <div className="my-3 flex items-center gap-8">
              <div className="w-[45%] border-[1px] border-input-border"></div>
              <span>Or</span>
              <div className="w-[45%] border-[1px] border-input-border"></div>
            </div>
            <SocialLogin />
            <div className="text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary">
                Login
              </Link>
            </div>
          </div>
          <div className="absolute bottom-3">
            <p className="uppercase text-muted text-sm">
              &copy; 2023 All Rights Reserved
            </p>
          </div>
        </div>
        <div className="max-lg:hidden lg:w-1/2 relative h-full">
          <Image
            src="/auth.png"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            alt="auth"
          />
        </div>
      </div>
    </AppContainer>
  );
};
