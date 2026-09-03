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
          The site may use Google AdSense to display advertising when advertising is enabled. When
          that happens, third-party vendors, including Google, may use cookies to serve ads based on
          your previous visits to this site or to other websites. Google’s use of advertising cookies
          enables Google and its partners to serve personalized ads to you.
        </p>
        <p>
          Google and other advertising partners may also use web beacons, IP addresses, and similar
          identifiers to serve, personalize, and measure advertising.
        </p>
        <p>
          You can manage or opt out of personalized advertising at any time in{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Google Ads Settings
          </a>
          . Google also explains{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            how it uses data on sites that use its services
          </a>
          .
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Affiliate links</h2>
        <p>
          Selected buying guides on this site contain affiliate links. HarvestBench may earn a
          commission when a visitor purchases through one of those links, at no extra cost to you.
          Not every guide or product on the site uses an affiliate link. The{" "}
          <a href="/affiliate-disclosure" className="underline hover:text-foreground">
            Affiliate Disclosure
          </a>{" "}
          page has more information.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Cookies</h2>
        <p>
          Calculators do not require cookies, and the site does not set its own advertising cookies.
          Third-party cookies may appear when Analytics or advertising is active, as described above.
          Most browsers let you block or delete cookies in their settings, and personalized Google
          ads can be turned off in Google Ads Settings.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Contact</h2>
        <p>
          Privacy questions can be sent through the contact page.
        </p>
      </div>
    </Container>
  );
}
