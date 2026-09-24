import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function ToolLayout({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="section">
      <div className="container max-w-4xl">
        <Breadcrumbs name={name} />
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{name}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-7 muted">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
