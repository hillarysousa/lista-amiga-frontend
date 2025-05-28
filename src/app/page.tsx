import { Suspense } from "react";
import { HomeContent } from "./content";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
