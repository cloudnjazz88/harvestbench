import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { CardLink, SectionHeading, cardSurfaceClass } from "@/components/content/CardLink";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculators, getPopularCalculators } from "@/data/calculators";
import { getFeaturedGuides, getProductGuides } from "@/data/guides";
import { getFeaturedSeasonalGuideCards } from "@/data/seasonalGuides";
import { filterPublicLinks } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Grow More in Your Backyard Garden",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const popular = getPopularCalculators();
  const seasonalGuides = getFeaturedSeasonalGuideCards();
  const featuredGuides = getFeaturedGuides();
  const productGuides = getProductGuides();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: siteConfig.headline,
          description: siteConfig.subheadline,
        }}
      />
      <section className="relative isolate min-h-[24rem] overflow-hidden border-b border-border sm:min-h-[29rem]">
        <Image
          src="/images/hero-raised-beds.jpg"
          alt="Wooden raised beds planted with lettuce, kale, peppers, and tomatoes in a backyard garden"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[center_42%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/88 from-[8%] via-background/78 via-[38%] to-background/5"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-background/25"
          aria-hidden="true"
        />
        <Container width="wide" className="relative py-14 sm:py-20 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Raised beds, pots & harvestable vegetables
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-4xl font-semibold tracking-tight text-foreground sm:max-w-2xl sm:text-5xl">
            {siteConfig.headline}
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-8 text-foreground/80 sm:max-w-xl">
            {siteConfig.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-cta px-5 font-semibold text-white hover:bg-cta-hover"
            >
              Explore Garden Calculators
            </Link>
            <Link
              href="/guides"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-card/90 px-5 font-semibold backdrop-blur-sm hover:border-accent"
            >
              Browse Gardening Guides
            </Link>
          </div>
        </Container>
      </section>

      <Container width="wide" className="py-12">
        <AdSlot position="top" className="mb-10" />

        <section>
          <SectionHeading
            title="Popular garden calculators"
            description="Get cubic yards, bag counts, and plant counts without a spreadsheet."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((item) => (
              <CardLink
                key={item.id}
                href={item.href}
                kicker="Tool"
                title={item.shortTitle}
                description={item.description}
              />
            ))}
          </div>
          <p className="mt-4">
            <Link href="/calculators" className="font-medium text-accent hover:underline">
              All {calculators.length} calculators
            </Link>
          </p>
        </section>

        {seasonalGuides.length ? (
          <section className="mt-14">
            <SectionHeading
              title="Fall garden projects"
              description="Clear finished beds, handle seasonal pruning, and move leaves, compost, and soil before the next planting."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {seasonalGuides.map((card) => (
                <CardLink
                  key={card.href}
                  href={card.href}
                  kicker={card.eyebrow}
                  title={card.title}
                  description={card.description}
                  cta={card.cta}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <HubPanel
            title="Raised bed gardening"
            body="Depth, soil volume, mixes, and whether a frame is worth it compared with in-ground rows."
            href="/raised-beds"
            links={[
              { href: "/calculators/raised-bed-soil", label: "Soil calculator" },
              { href: "/guides/hugelkultur-in-raised-beds", label: "Hugelkultur: save soil" },
              { href: "/guides/how-deep-should-a-raised-bed-be", label: "How deep should a bed be?" },
              { href: "/guides/how-to-prepare-a-raised-bed", label: "Prepare a new bed" },
            ]}
          />
          <HubPanel
            title="Vegetable gardening"
            body="Crop pages with spacing, sun, water, and harvest timing — tomatoes, peppers, beans, kale, onions, herbs, and more."
            href="/vegetable-gardening"
            links={[
              { href: "/vegetable-gardening/tomatoes", label: "Tomatoes" },
              { href: "/vegetable-gardening/beans", label: "Beans" },
              { href: "/vegetable-gardening/kale", label: "Kale" },
              { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
            ]}
          />
          <HubPanel
            title="Container gardening"
            body="Plastic, ceramic, and fabric pots in 1, 3, 5, 7, and 10 gallons — plus which vegetables fit each size."
            href="/container-gardening"
            links={[
              { href: "/calculators/potting-mix", label: "Potting mix calculator" },
              { href: "/guides/growing-vegetables-in-containers", label: "Which plant in which pot" },
              { href: "/guides/potting-mix-vs-garden-soil", label: "Potting mix vs garden soil" },
            ]}
          />
          <HubPanel
            title="Soil & compost"
            body="What to put in the box, how much compost to top-dress, and how to read a soil bag."
            href="/soil-compost"
            links={[
              { href: "/guides/best-soil-mix-for-raised-beds", label: "Soil mix" },
              { href: "/calculators/compost", label: "Compost calculator" },
              { href: "/guides/best-raised-bed-soil", label: "Buying soil" },
            ]}
          />
          <HubPanel
            title="Watering"
            body="Raised beds dry faster than in-ground soil. Schedule from soil moisture, crop, and weather — not a gallon formula."
            href="/watering"
            links={[
              { href: "/guides/how-often-to-water-raised-beds", label: "How often to water" },
              { href: "/guides/best-drip-irrigation", label: "Drip irrigation" },
              { href: "/guides/best-soaker-hose", label: "Soaker hose criteria" },
            ]}
          />
          <HubPanel
            title="Seeds & seed starting"
            body="Seed starting, germination, and transplanting — when to start indoors and how to harden off."
            href="/seeds"
            links={[
              { href: "/guides/how-to-start-vegetable-seeds-indoors", label: "Start seeds indoors" },
              { href: "/guides/when-to-transplant-seedlings", label: "When to transplant" },
              { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
            ]}
          />
          <HubPanel
            title="Garden tools"
            body="Pruners, trellis, garden carts, hoses, and drip gear — what to look for, not ranked brand lists."
            href="/garden-tools"
            links={[
              { href: "/guides/best-pruning-shears", label: "Pruning shears" },
              { href: "/guides/best-garden-trellis", label: "Trellis" },
              { href: "/guides/best-garden-cart", label: "Garden cart" },
              { href: "/guides/best-garden-hose", label: "Garden hose" },
            ]}
          />
          <HubPanel
            title="Pest & plant problems"
            body="Photos, controls, and product types for common garden pests — plus blossom-end rot."
            href="/pest-problems"
            links={[
              { href: "/pest-problems/aphids", label: "Aphids" },
              { href: "/pest-problems/tomato-hornworm", label: "Tomato hornworms" },
              { href: "/guides/blossom-end-rot", label: "Blossom-end rot" },
            ]}
          />
        </section>

        <section className="mt-14">
          <SectionHeading
            title="Featured guides"
            description="Short answers with tables and worked examples — not a blog feed."
          />
          <ul className="grid gap-3">
            {featuredGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className={`block px-5 py-4 ${cardSurfaceClass}`}>
                  <span className="font-medium">{guide.title}</span>
                  <span className="mt-1 block text-sm text-muted">{guide.intro}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {productGuides.length ? (
          <section className="mt-14">
            <SectionHeading
              title="Buying guides"
              description="How to choose soil, frames, watering gear, and tools — specs and trade-offs, not ranked brand lists."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productGuides.map((guide) => (
                <CardLink
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  kicker="Buying guide"
                  title={guide.title.replace(": What to Look For", "").replace(": How to Choose a Frame", "").replace(": Buying Criteria", "")}
                  description={guide.description}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold">Why this site exists</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Most gardening articles bury the number you actually need — cubic yards of soil, plants in a 4×8 bed,
            fertilizer ounces — inside a story. HarvestBench is a utility for food gardens: calculators first, then
            the guides that explain when those numbers break. It is written for US homeowners growing vegetables they
            can harvest, not as a personal blog.
          </p>
          <p className="mt-3">
            <Link href="/about" className="font-medium text-accent hover:underline">
              About HarvestBench
            </Link>
          </p>
        </section>
        <AdSlot position="bottom" className="mt-12" />
      </Container>
    </>
  );
}

function HubPanel({
  title,
  body,
  href,
  links,
}: {
  title: string;
  body: string;
  href: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className={`relative p-5 ${cardSurfaceClass}`}>
      <h2 className="font-serif text-2xl font-semibold">
        <Link
          href={href}
          className="after:absolute after:inset-0 after:rounded-xl hover:text-accent"
        >
          {title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
      <ul className="mt-4 space-y-2">
        {filterPublicLinks(links).map((link) => (
          <li key={link.href} className="w-fit">
            <Link
              href={link.href}
              className="relative z-10 text-sm font-medium text-accent hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
