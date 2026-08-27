import { ContactForm } from "@/components/content/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Harvestbench. Email is enabled only when a public address is configured.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} />
      <h1 className="font-serif text-3xl font-semibold">Contact</h1>
      <p className="mt-3 leading-7 text-muted">
        Use this form if a contact email has been configured for the site. We do not publish a street
        address, phone number, or staff directory.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </Container>
  );
}
