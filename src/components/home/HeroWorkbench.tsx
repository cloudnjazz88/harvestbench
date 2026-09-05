import Image from "next/image";

/**
 * Homepage hero visual.
 * asset: /images/harvestbench-editorial-workbench.webp
 * type: AI-generated original visual for HarvestBench
 * purpose: homepage hero
 * external source URL: none
 * external license claim: none
 */
export const HERO_IMAGE = {
  src: "/images/harvestbench-editorial-workbench.webp",
  width: 1024,
  height: 512,
  alt: "Garden planning notebook with raised-bed sketches, seed packets, and a vegetable garden photo on a wooden workbench",
} as const;

export function HeroWorkbench({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#3d2a18] ${className}`}>
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        sizes="(max-width: 1023px) 100vw, 58vw"
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[center_48%] lg:object-[center_50%]"
      />
    </div>
  );
}
