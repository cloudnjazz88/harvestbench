import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { CardLink, SectionHeading, cardSurfaceClass } from "@/components/content/CardLink";
import {
  IconCircleArrow,
  IconFertilizer,
  IconLeaf,
  IconPlanting,
  IconProblem,
  IconRaisedBed,
  IconSoil,
  IconSpacing,
  IconVine,
} from "@/components/home/HomeIcons";
import { HeroWorkbench } from "@/components/home/HeroWorkbench";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCalculator, getPopularCalculators } from "@/data/calculators";
import { getCropImage } from "@/data/cropImages";
import { getGuide, getProductGuides, isGuidePublished } from "@/data/guides";
import { getFeaturedSeasonalGuideCards } from "@/data/seasonalGuides";
import { filterPublicLinks } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Grow More in Your Backyard Garden",
  description: siteConfig.description,
  path: "/",
});

const HOME_GUIDE_SLUGS = [
  "how-deep-should-a-raised-bed-be",
  "how-often-to-water-raised-beds",
  "how-far-apart-to-plant-tomatoes",
] as const;

const FEATURED_CALCULATOR_IDS = [
  "raised-bed-soil",
  "fertilizer",
  "plant-spacing",
] as const;

const GUIDE_THUMBS = {
  "how-deep-should-a-raised-bed-be": "lettuce",
  "how-often-to-water-raised-beds": "kale",
  "how-far-apart-to-plant-tomatoes": "tomatoes",
} as const;

const PLANNING = [
  {
    href: "/raised-beds",
    title: "Build a Raised Bed",
    description: "Size the frame, estimate soil, and choose a mix before you buy lumber.",
    icon: IconRaisedBed,
  },
  {
    href: "/vegetable-gardening",
    title: "Plant a Vegetable Garden",
    description: "Match crops to sun, spacing, and harvest timing for a backyard bed.",
    icon: IconPlanting,
  },
  {
    href: "/pest-problems",
    title: "Solve a Garden Problem",
    description: "Identify pests, watering issues, and common plant problems with photos.",
    icon: IconProblem,
  },
] as const;

export default function HomePage() {
  const popular = getPopularCalculators();
  const featuredCalculators = FEATURED_CALCULATOR_IDS.map((id) => getCalculator(id));
  const otherPopular = popular.filter(
    (item) => !FEATURED_CALCULATOR_IDS.includes(item.id as (typeof FEATURED_CALCULATOR_IDS)[number]),
  );
  const seasonalGuides = getFeaturedSeasonalGuideCards();
  const latestGuides = HOME_GUIDE_SLUGS.flatMap((slug) => {
    const guide = getGuide(slug);
    return guide && isGuidePublished(guide) ? [guide] : [];
  });
  const productGuides = getProductGuides();
  const calculatorIcons = [IconSoil, IconFertilizer, IconSpacing];

  return (
    <div className="hb-home">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: siteConfig.headline,
          description: siteConfig.subheadline,
        }}
      />

      <section className="relative">
        <div className="pointer-events-none absolute left-1 top-10 text-forest/10 lg:left-3" aria-hidden="true">
          <IconLeaf className="h-24 w-24" />
        </div>
        <div className="relative grid lg:h-[410px] lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]">
          <div className="flex flex-col justify-center px-4 py-7 sm:px-6 lg:py-5 lg:pl-6 lg:pr-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Raised beds, pots & harvestable vegetables
            </p>
            <h1 className="mt-2 max-w-md font-serif text-[2.15rem] font-semibold leading-[1.15] tracking-tight text-foreground lg:text-[2.55rem]">
              Good Gardens Start With a Clear Plan.
            </h1>
            <p className="mt-3 max-w-md text-[0.98rem] leading-6 text-foreground/80">
              Simple calculators and practical guides for every step—from filling the bed to harvesting dinner.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/calculators"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-cta px-5 font-semibold text-white hover:bg-cta-hover"
              >
                Calculate What You Need
              </Link>
              <Link
                href="/guides"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-5 font-semibold hover:border-accent"
              >
                Explore Growing Guides
              </Link>
            </div>
            <ul className="mt-5 grid gap-1.5 text-sm text-muted lg:grid-cols-3 lg:gap-3">
              <li className="flex items-center gap-2">
                <IconSoil className="h-4 w-4 shrink-0 text-accent" />
                Practical tools for real gardens
              </li>
              <li className="flex items-center gap-2">
                <IconPlanting className="h-4 w-4 shrink-0 text-accent" />
                Step-by-step growing guides
              </li>
              <li className="flex items-center gap-2">
                <IconLeaf className="h-4 w-4 shrink-0 text-accent" />
                Healthier harvests, happier days
              </li>
            </ul>
          </div>
          <HeroWorkbench className="h-44 w-full sm:h-48 lg:h-full" />
        </div>
      </section>

      <section className="relative bg-forest text-[#f6eedc]">
        <div className="pointer-events-none absolute bottom-2 left-3 text-[#f6eedc]/12" aria-hidden="true">
          <IconLeaf className="h-20 w-20" />
        </div>
        <div className="pointer-events-none absolute bottom-2 right-3 text-[#f6eedc]/12" aria-hidden="true">
          <IconLeaf className="h-20 w-20 -scale-x-100" />
        </div>
        <Container width="wide" className="relative py-5">
          <div className="flex items-center justify-center gap-3">
            <span
              className="pointer-events-none hidden min-w-0 max-w-[10.5rem] flex-1 justify-end lg:flex"
              aria-hidden="true"
            >
              <IconVine className="h-3.5 w-full max-w-[9.5rem] text-[#f6eedc]/40" />
            </span>
            <h2 className="text-center font-serif text-[1.75rem] font-semibold leading-tight text-[#f6eedc] sm:whitespace-nowrap lg:text-[2rem] lg:leading-none">
              What are you planning today?
            </h2>
            <span
              className="pointer-events-none hidden min-w-0 max-w-[10.5rem] flex-1 lg:flex"
              aria-hidden="true"
            >
              <IconVine className="h-3.5 w-full max-w-[9.5rem] -scale-x-100 text-[#f6eedc]/40" />
            </span>
          </div>
          <div className="mt-3.5 grid items-stretch gap-3 lg:grid-cols-3">
            {PLANNING.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex h-full min-h-[8.625rem] items-center gap-3 rounded-xl bg-[#f7f1e4] px-3 py-3 text-foreground transition-colors hover:bg-white lg:min-h-[7.75rem] lg:gap-3.5 lg:px-3.5"
                >
                  <span className="flex h-[5.75rem] w-[5.75rem] shrink-0 items-center justify-center text-accent lg:h-[6.25rem] lg:w-[6.25rem]">
                    <Icon className="h-16 w-16 lg:h-[4.25rem] lg:w-[4.25rem]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-lg font-semibold leading-snug">{item.title}</span>
                    <span className="mt-1 line-clamp-3 block text-sm leading-5 text-muted">{item.description}</span>
                  </span>
                  <span className="shrink-0 self-center text-accent">
                    <IconCircleArrow className="h-8 w-8" />
                    <span className="sr-only">Start here</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <Container width="wide" className="py-7">
        <AdSlot position="top" className="mb-6" />

        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-end lg:gap-5">
              <h2 className="font-serif text-2xl font-semibold">Popular garden calculators</h2>
              <p className="max-w-xl text-sm text-muted">
                Get cubic yards, bag counts, and plant counts without a spreadsheet.
              </p>
            </div>
            <Link href="/calculators" className="shrink-0 text-sm font-medium text-accent hover:underline">
              Browse all calculators
            </Link>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {featuredCalculators.map((item, index) => {
              const Icon = calculatorIcons[index] ?? IconSoil;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-[#b7c4ae] bg-[#f7f1e4] px-3 py-3 transition-colors hover:bg-white"
                >
                  <span className="shrink-0 text-accent">
                    <Icon className="h-12 w-12" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-accent">Tool</span>
                    <span className="mt-0.5 block font-serif text-lg font-semibold leading-tight">{item.shortTitle}</span>
                    <span className="mt-1 block text-xs leading-4 text-muted">{item.description}</span>
                  </span>
                  <span className="shrink-0 text-accent">
                    <IconCircleArrow className="h-8 w-8" />
                    <span className="sr-only">Open calculator</span>
                  </span>
                </Link>
              );
            })}
          </div>
          {otherPopular.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {otherPopular.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="font-medium text-accent hover:underline">
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-7 border-t border-border pt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-end lg:gap-5">
              <h2 className="font-serif text-2xl font-semibold">Latest gardening guides</h2>
              <p className="max-w-xl text-sm text-muted">
                Short answers with measurements and worked examples — not a blog feed.
              </p>
            </div>
            <Link href="/guides" className="shrink-0 text-sm font-medium text-accent hover:underline">
              Browse all guides
            </Link>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {latestGuides.map((guide) => {
              const thumbSlug = GUIDE_THUMBS[guide.slug as keyof typeof GUIDE_THUMBS];
              const thumb = thumbSlug ? getCropImage(thumbSlug) : undefined;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-[#b7c4ae] bg-[#f7f1e4] p-2.5 transition-colors hover:bg-white"
                >
                  {thumb ? (
                    <span className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-md bg-[#d7c49a]">
                      <Image
                        src={thumb.src}
                        alt={thumb.alt}
                        width={96}
                        height={96}
                        sizes="72px"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-accent">Guide</span>
                    <span className="mt-0.5 block font-serif text-base font-semibold leading-snug">{guide.title}</span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-4 text-muted">{guide.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {seasonalGuides.length ? (
          <section className="mt-10">
            <SectionHeading
              title="Fall garden projects"
              description="Clear finished beds, handle seasonal pruning, and move leaves, compost, and soil before the next planting."
            />
            <div className="grid gap-4 lg:grid-cols-2">
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

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
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

        {productGuides.length ? (
          <section className="mt-10">
            <SectionHeading
              title="Buying guides"
              description="How to choose soil, frames, watering gear, and tools — specs and trade-offs, not ranked brand lists."
            />
            <div className="grid gap-4 lg:grid-cols-3">
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

        <section className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8">
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
    </div>
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
