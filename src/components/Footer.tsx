import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="text-sm text-zinc-500">
          © ContentPilot. Alle Rechte vorbehalten.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/#pricing" className="text-zinc-500 transition-colors hover:text-zinc-900">
            Preise
          </Link>
          <Link href="/generate" className="text-zinc-500 transition-colors hover:text-zinc-900">
            Generator
          </Link>
          <a href="mailto:hallo@contentpilot.example" className="text-zinc-500 transition-colors hover:text-zinc-900">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
