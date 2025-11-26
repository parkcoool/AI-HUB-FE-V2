import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "AI Hub" }];
}

export default function Home() {
  return <div></div>;
}
