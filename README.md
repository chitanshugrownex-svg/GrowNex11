# GrowNex

A modern, high-performance digital agency landing page built with React, Vite, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first architecture that scales perfectly to desktop.
- **Modern Animations**: Smooth scrolling, staggering appearances, and hover interactions powered by Framer Motion.
- **Fast Performance**: Compiled via Vite for ultra-fast hot reloading and optimized production builds.
- **Instant Email Delivery**: Form submission handled via Web3Forms.

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env
   ```
   Add your Web3Forms access key to `VITE_WEB3FORMS_ACCESS_KEY` to enable the contact form.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

- `src/` - React application source code.
  - `components/` - Reusable UI components.
  - `HomePage.tsx` - Main landing page.
- `public/` - Static assets (images, logos).

## License

MIT
