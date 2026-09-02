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
      <p className="mt-2 text-sm text-muted">Last updated September 2, 2026</p>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          This policy describes how this website (“the site”) handles information. It is written for a
          small independent site, not a fabricated corporation.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Information we do not collect by default</h2>
        <p>
          Calculators run in your browser. We do not require an account, and we do not run a newsletter
          or comment system. Contact messages go through your own email app to contact@harvestbench.com;
          they are not stored in a database on this site.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Analytics</h2>
        <p>
          The site may use Google Analytics to understand how pages are used. When Analytics is active,
          Google may collect standard usage data such as pages viewed, approximate location, and device
          type.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Advertising</h2>
        <p>
          The site may display Google ads. When ads are shown, Google and its partners may use cookies
          or similar technologies to serve and measure those ads.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Affiliate links</h2>
        <p>
          The site does not currently use affiliate links. Retailer policies do not apply unless you
          leave this site on your own. See the affiliate disclosure page.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Cookies</h2>
        <p>
          Calculators do not require cookies. Third-party cookies may appear when Analytics or ads are
          active.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Contact</h2>
        <p>
          Privacy questions can be sent through the contact page.
        </p>
      </div>
    </Container>
  );
}
