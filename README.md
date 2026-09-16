# Clean Water

Practice SaaS for bottled-water delivery. Next.js + Drizzle (SQLite). Username/password login only.

## Setup

```bash
cp .env.example .env
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Test accounts

| Role | Username | Password |
| --- | --- | --- |
| Dispatcher | `dispatcher` | `water123` |
| Driver | `driver` | `water123` |
