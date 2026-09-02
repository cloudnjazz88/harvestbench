export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type SourceCitation = {
  title: string;
  organization: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id?: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "callout";
      tone?: "info" | "warning" | "tip";
      title?: string;
      text: string;
    }
  | { type: "example"; title: string; text: string };

export type CalculatorId =
  | "raised-bed-soil"
  | "soil-volume"
  | "mulch"
  | "compost"
  | "fertilizer"
  | "plant-spacing"
  | "garden-area"
  | "potting-mix";
