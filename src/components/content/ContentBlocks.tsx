import Link from "next/link";
import { Callout } from "@/components/content/PageSections";
import { isPublicPath } from "@/data/routes";
import type { ContentBlock } from "@/data/types";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-7">
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-24 pt-4 font-serif text-2xl font-semibold"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-lg font-semibold">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 leading-7">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 leading-7">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full text-left text-sm">
            {block.caption ? <caption className="sr-only">{block.caption}</caption> : null}
            <thead className="bg-background">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="whitespace-nowrap px-3 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-border align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 leading-6">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <Callout title={block.title} tone={block.tone}>
          <RichText text={block.text} />
        </Callout>
      );
    case "example":
      return (
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-sm font-semibold">{block.title}</p>
          <p className="mt-1 font-mono text-sm leading-6 text-muted">
            <RichText text={block.text} />
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={index}>{part}</span>;
        const href = match[2];
        const label = match[1];
        const external = href.startsWith("http");
        if (external) {
          return (
            <a key={index} href={href} className="font-medium text-accent underline-offset-2 hover:underline">
              {label}
            </a>
          );
        }
        if (!isPublicPath(href.split("#")[0])) {
          return <span key={index}>{label}</span>;
        }
        return (
          <Link key={index} href={href} className="font-medium text-accent underline-offset-2 hover:underline">
            {label}
          </Link>
        );
      })}
    </>
  );
}
