import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full bg-[#eef6f8]">
      <header className="border-b border-[#d7e8ee] bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="font-semibold text-[#12323f]">Clean Water</span>
          <Link
            href="/login"
            className="rounded-lg bg-[#1f6f8b] px-4 py-2 text-sm font-medium text-white hover:bg-[#185a71]"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-20">
        <p className="text-sm font-medium tracking-wide text-[#1f6f8b] uppercase">
          Bottled water, on a route
        </p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-[#12323f]">
          Clean Water delivery for offices, clinics, and homes.
        </h1>
        <p className="mt-4 max-w-lg text-[#5b7480]">
          A small practice SaaS: log in, see today’s drops. Username and
          password only — no OAuth, no email, no password reset.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-[#1f6f8b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#185a71]"
        >
          Open the board
        </Link>
      </main>
    </div>
  );
}
