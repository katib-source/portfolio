import { notFound } from "next/navigation";

// Unknown URLs under /en or /fr render the localized not-found page inside the site layout.
export default function CatchAll() {
  notFound();
}
