"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEMO = [
  { label: "Dispatcher", username: "dispatcher", password: "water123" },
  { label: "Driver", username: "driver", password: "water123" },
];

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to log in.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-5">
      <Link href="/" className="text-sm text-[#1f6f8b] hover:underline">
        ← Back
      </Link>

      <div className="rounded-2xl border border-[#d7e8ee] bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-medium tracking-wide text-[#1f6f8b] uppercase">
            Clean Water
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#12323f]">
            Log in
          </h1>
          <p className="mt-1 text-sm text-[#5b7480]">
            Username and password. Demo accounts below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-[#12323f]">Username</span>
            <input
              className="mt-1 w-full rounded-lg border border-[#c9dde4] bg-[#f7fbfc] px-3 py-2 outline-none focus:border-[#1f6f8b]"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-[#12323f]">Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-[#c9dde4] bg-[#f7fbfc] px-3 py-2 outline-none focus:border-[#1f6f8b]"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1f6f8b] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#185a71] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-[#d7e8ee] bg-white p-4 text-sm">
        <p className="mb-2 font-medium text-[#12323f]">Test accounts</p>
        <div className="space-y-2">
          {DEMO.map((account) => (
            <button
              key={account.username}
              type="button"
              onClick={() => {
                setUsername(account.username);
                setPassword(account.password);
                setError(null);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[#d7e8ee] px-3 py-2 text-left hover:bg-[#f3fafc]"
            >
              <span>{account.label}</span>
              <span className="font-mono text-xs text-[#5b7480]">
                {account.username} / {account.password}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
