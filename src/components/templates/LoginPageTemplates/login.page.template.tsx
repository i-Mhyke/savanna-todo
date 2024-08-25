"use client";
import { AppContainer } from "@/components/commons/AppContainer";
import { SocialLogin } from "@/components/commons/SocialLogin";
import Button from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/inputs/Input";
import { Label } from "@/components/ui/inputs/Label";
import { firebaseSignin } from "@/controllers/firebase.auth";
import { loginFormValidation } from "@/libs/helpers";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type loginFormSchema = {
  email: string;
  password: string;
};

export const LoginPageTemplate = () => {
  const router = useRouter();
  const [formErrors, setErrors] = useState<loginFormSchema>();
  const [formLoading, setLoading] = useState<boolean>();
  const [formWarning, setWarning] = useState<string>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = Object.fromEntries(formData.entries()) as loginFormSchema;
    const errors = loginFormValidation(value);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      setWarning(undefined);
      setErrors(undefined);
      setLoading(true);
      const login = await firebaseSignin(value.email, value.password);
      setLoading(false);
      router.push("/todo");
    } catch (error) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setWarning("Invalid email or password");
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
            <h2 className="font-semibold">Welcome Back 👋🏼</h2>
            <p>
              Today is a new day. Its your day. You shape it. Signin to start
              managing your projects
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Example@email.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm">
                  Forgot password?
                </a>
              </div>
              <p className="text-accent">
                {formErrors?.email || formErrors?.password}
              </p>
              <p className="text-accent">{formWarning}</p>
              <Button type="submit" className="w-full" isLoading={formLoading}>
                Sign In
              </Button>
            </form>
            <div className="my-3 flex items-center gap-8">
              <div className="w-[45%] border-[1px] border-input-border"></div>
              <span>Or</span>
              <div className="w-[45%] border-[1px] border-input-border"></div>
            </div>
            <SocialLogin />
            <div className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign up
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10">
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
