import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: {
    default: "Sign Up",
    template: `%s | Sign Up`,
  },
};

export default function SignUpPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
