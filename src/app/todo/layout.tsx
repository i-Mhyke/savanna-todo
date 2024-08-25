import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: {
    default: "Todo",
    template: `%s | Todo`,
  },
};

export default function TodoPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
