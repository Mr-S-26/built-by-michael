import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study | Michael Ryan",
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
