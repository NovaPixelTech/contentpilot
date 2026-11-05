import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Content<span className="text-indigo-600">Pilot</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4 overflow-x-auto md:gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            How it works
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/generate"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 transition-colors hover:bg-indigo-700 md:block"
          >
            Jetzt Artikel generieren
          </Link>
          <Link
            href="/generate"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 md:hidden"
          >
            Starten
          </Link>
        </div>
      </div>
    </header>
  );
}
