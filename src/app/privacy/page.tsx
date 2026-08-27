import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/privacy", label: "Privacy" }]} />
      <h1 className="font-serif text-3xl font-semibold">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated August 26, 2026</p>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          This policy describes how this website (“the site”) handles information. It is written for a
          small independent site, not a fabricated corporation.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Information we do not collect by default</h2>
        <p>
          Calculators run in your browser. We do not require an account. Contact messages are sent
          through your own email app when a contact address is configured; they are not stored in a
          database on this site.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Analytics</h2>
        <p>
          If Google Analytics is enabled through an environment variable, Google may collect standard
          usage data such as pages viewed, approximate location, and device type. If Analytics is not
          configured, that script is not loaded.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Advertising</h2>
        <p>
          If Google AdSense is enabled, Google and its partners may use cookies or similar technologies
          to serve and measure ads. Ad units are not shown until publisher and slot IDs are configured.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Affiliate links</h2>
        <p>
          If the site later includes affiliate links, those retailers may collect information according
          to their own policies when you follow a link. See the affiliate disclosure page.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Cookies</h2>
        <p>
          Essential cookies are not required for calculators. Third-party cookies may appear only if
          Analytics or AdSense is turned on.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Contact</h2>
        <p>
          Privacy questions can be sent through the contact page if an email address is published there.
        </p>
      </div>
    </Container>
  );
}
