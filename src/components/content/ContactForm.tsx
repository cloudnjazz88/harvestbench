"use client";

import { useState } from "react";
import { analytics } from "@/data/site";

export function ContactForm() {
  const email = analytics.contactEmail.trim();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    return (
      <p className="rounded-xl border border-border bg-card p-5 text-sm leading-6 text-muted">
        A public contact email is not configured yet. Set{" "}
        <code className="text-foreground">NEXT_PUBLIC_CONTACT_EMAIL</code> to enable
        a mailto form. We do not list a physical address or phone number.
      </p>
    );
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !from.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!from.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Harvestbench contact from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\nFrom: ${name.trim()} <${from.trim()}>`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="space-y-4 rounded-xl border border-border bg-card p-5" onSubmit={onSubmit}>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium">Name</label>
        <input id="contact-name" className="mt-1 h-12 w-full rounded-md border border-border px-3 text-base" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium">Your email</label>
        <input id="contact-email" type="email" className="mt-1 h-12 w-full rounded-md border border-border px-3 text-base" value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium">Message</label>
        <textarea id="contact-message" rows={6} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-base" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {error ? <p className="text-sm text-cta" role="alert">{error}</p> : null}
      <button type="submit" className="inline-flex min-h-11 items-center rounded-md bg-cta px-4 font-semibold text-white hover:bg-cta-hover">
        Open email draft
      </button>
      <p className="text-sm text-muted">
        Submitting opens your email app addressed to {email}. Nothing is stored on this website.
      </p>
    </form>
  );
}
