# Spotlight — Samsung SmartPlaza (Consumer Electronics demo)

A Vite + React + TypeScript demo of the Spotlight hyperlocal-marketing platform
(Spotlight Admin / Brand / Partner / Creative AI), themed for Samsung consumer
electronics — Galaxy phones, Neo QLED TVs, Bespoke appliances, etc.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Sign in with the pre-filled `admin@spotlight.com`
(any password — it's a mock login).

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework is auto-detected as **Vite** (build `vite build`, output `dist`).
   `vercel.json` already adds the SPA rewrite so client-side routes work on refresh.
4. Deploy — you'll get a `https://<repo>.vercel.app` URL.

## Tech

React 18 · React Router · Recharts · Framer Motion · Tailwind CSS · Vite 5.
