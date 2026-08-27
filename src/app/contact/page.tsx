import { ContactForm } from "@/components/content/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { analytics } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact Harvestbench at ${analytics.contactEmail}.`,
  path: "/contact",
});

export default function ContactPage() {
  const email = analytics.contactEmail;
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} />
      <h1 className="font-serif text-3xl font-semibold">Contact</h1>
      <p className="mt-3 leading-7 text-muted">
        Email{" "}
        <a href={`mailto:${email}`} className="font-medium text-accent hover:underline">
          {email}
        </a>
        . The form below opens a draft in your email app. We do not publish a street address, phone
        number, or staff directory.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </Container>
  );
}
