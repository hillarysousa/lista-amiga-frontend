import { Suspense } from "react";
import { ListsContent } from "./content";

export default function ListsPage() {
  return (
    <Suspense fallback={null}>
      <ListsContent />
    </Suspense>
  );
}
