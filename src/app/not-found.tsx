import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container width="narrow" className="py-20 text-center">
      <h1 className="font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That URL does not exist on Harvestbench.</p>
      <p className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className="font-medium text-accent hover:underline">
          Home
        </Link>
        <Link href="/calculators" className="font-medium text-accent hover:underline">
          Calculators
        </Link>
        <Link href="/guides" className="font-medium text-accent hover:underline">
          Guides
        </Link>
      </p>
    </Container>
  );
}
