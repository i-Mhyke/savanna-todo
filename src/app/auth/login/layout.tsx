import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: {
    default: "Login",
    template: `%s | Login`,
  },
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
