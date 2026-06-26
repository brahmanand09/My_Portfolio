# Brahmanand Mourya — Portfolio

A modern, professional portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and the **App Router**.

Live: [brahmanand09.github.io/My_Portfolio](https://brahmanand09.github.io/My_Portfolio/)

## Features

- Next.js App Router with server and client components
- TypeScript for type-safe development
- Tailwind CSS v4 with a custom design system
- Responsive layout with mobile navigation
- SEO metadata and Open Graph tags
- Contact form via secure API route (Google Apps Script)
- Optimized images with `next/image`
- Data-driven content in `src/data/portfolio.ts`

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and set your Google Apps Script URL:

```bash
cp .env.example .env.local
```

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Contact form API route
│   ├── globals.css      # Global styles & theme
│   ├── layout.tsx       # Root layout & metadata
│   └── page.tsx         # Home page
├── components/
│   ├── layout/          # Navbar, Footer
│   └── sections/        # About, Services, Projects, Contact
├── data/
│   └── portfolio.ts     # Site content & configuration
└── types/
    └── index.ts         # TypeScript interfaces
public/
└── images/              # Static assets
```

## Deployment

Deploy easily on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any platform that supports Next.js.

Set the `GOOGLE_SCRIPT_URL` environment variable in your hosting dashboard for the contact form to work.

## License

Personal portfolio — feel free to fork and customize with attribution.
