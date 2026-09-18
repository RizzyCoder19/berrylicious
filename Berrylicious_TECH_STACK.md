# Berrylicious --- Technical Stack & Engineering Specification

**Version:** 1.0\
**Project:** Berrylicious interactive dessert brand website\
**Purpose:** Engineering handoff for Antigravity / coding agent

------------------------------------------------------------------------

## 1. Engineering Goal

Build Berrylicious as a polished, fast, responsive Next.js website that
feels like a real dessert startup and works reliably during a live
school Shark Tank presentation.

The implementation must prioritize:

1.  Visual quality
2.  Interaction quality
3.  Performance
4.  Maintainability
5.  Accessibility
6.  Presentation reliability

Do not add technical complexity merely to create visual effects.

------------------------------------------------------------------------

# 2. Core Stack

  ------------------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- ------------------------------
  Framework               Next.js                 Application framework,
                                                  routing, rendering

  Language                TypeScript              Type-safe application code

  Styling                 Tailwind CSS            Utility-first styling and
                                                  responsive design

  UI primitives           shadcn/ui               Accessible reusable UI
                                                  primitives

  Animation               Motion                  Component/micro-interactions
                                                  and UI transitions

  Advanced animation      GSAP + ScrollTrigger    Scroll-driven storytelling
                                                  where Motion is insufficient

  Icons                   Lucide React            Consistent interface icons

  Smooth scrolling        Lenis                   Optional smooth-scroll layer

  Images                  Next.js Image           Responsive image optimization

  Deployment              Vercel                  Hosting/deployment
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

# 3. Framework Architecture

## Next.js

Use the modern App Router architecture.

Recommended:

``` text
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── favicon.ico
```

The site is primarily a single-page experience.

Do not create unnecessary routes.

Optional future routes can be added later if the business expands.

------------------------------------------------------------------------

# 4. Rendering Strategy

Use React Server Components by default.

Use Client Components only where state, browser APIs or interaction
require them.

### Server-first components

These should generally remain server components:

-   Hero shell
-   Brand Introduction
-   Menu static structure
-   Ingredient Story
-   Supply Chain static content
-   Brand Story
-   Founder
-   Business Dashboard shell
-   Investment section
-   Use of Funds
-   Footer

### Client components

Use `"use client"` only where required:

-   Mobile Navigation
-   Craving Selector
-   Dessert Builder
-   Animated Counter
-   Customer Help Widget
-   interactive menu filters
-   animation components that require browser APIs

Avoid making the entire homepage a Client Component.

------------------------------------------------------------------------

# 5. TypeScript Rules

Strict TypeScript.

Do not use:

``` ts
any
```

unless there is an exceptional, documented reason.

Prefer explicit interfaces/types.

Example:

``` ts
export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  subcategory?: string
  price?: number
  sizes?: MenuSize[]
  description?: string
  tags: string[]
  image?: string
  builderBase?: boolean
  builderFlavour?: boolean
  builderTopping?: boolean
}

export interface MenuSize {
  name: string
  price: number
}
```

Use discriminated unions where they make the data model safer.

------------------------------------------------------------------------

# 6. Data Layer

All business/menu content must be separated from UI.

Recommended:

``` text
data/
├── menu.ts
├── flavours.ts
├── business.ts
└── brand.ts
```

## `data/menu.ts`

Contains:

-   categories
-   products
-   variants
-   prices
-   sizes
-   tags
-   descriptions
-   builder eligibility

## `data/flavours.ts`

Contains:

-   builder bases
-   valid flavour relationships
-   toppings
-   compatibility rules

## `data/business.ts`

Contains:

-   initial capital
-   monthly income
-   annual revenue
-   gross margin
-   outlet count
-   investment ask
-   equity
-   use of funds

## `data/brand.ts`

Contains:

-   brand name
-   tagline
-   navigation labels
-   metadata
-   reusable copy

------------------------------------------------------------------------

# 7. Single Source of Truth

Never duplicate business/product values throughout JSX.

For example, do NOT write:

``` tsx
<p>₹190</p>
```

in multiple unrelated components.

Instead:

``` ts
menuData.gelato.basePrice
```

The following must consume the same data:

-   Menu
-   Craving Selector
-   Dessert Builder
-   Product Cards
-   pricing displays

This prevents inconsistent pricing.

------------------------------------------------------------------------

# 8. Dessert Builder Architecture

The Dessert Builder is the most important interactive component.

Recommended state:

``` ts
type BuilderState = {
  base?: string
  flavour?: string
  topping?: string
}
```

The builder must derive available options from the data layer.

### Required behavior

1.  Select base
2.  Filter valid flavours
3.  Select flavour
4.  Filter valid toppings
5.  Select topping
6.  Calculate price
7.  Display creation

### Critical rule

Only calculate prices from explicitly defined data.

Never infer or invent prices.

If a combination lacks pricing:

``` text
Price unavailable
```

or disable that combination.

Do not silently estimate.

------------------------------------------------------------------------

# 9. Craving Selector Architecture

The Craving Selector should use product tags/categories rather than
duplicated hardcoded arrays wherever practical.

Example:

``` ts
tags: ["fruity", "fresh"]
```

Then:

``` ts
getProductsByMood("fruity")
```

The selector should drive the same product data used by the menu.

------------------------------------------------------------------------

# 10. Component Architecture

Recommended:

``` text
components/
├── navigation/
│   ├── desktop-nav.tsx
│   └── mobile-nav.tsx
│
├── hero/
│   └── hero.tsx
│
├── section-heading/
│   └── section-heading.tsx
│
├── craving-selector/
│   └── craving-selector.tsx
│
├── menu/
│   ├── menu-section.tsx
│   ├── menu-category.tsx
│   └── menu-filter.tsx
│
├── product-card/
│   └── product-card.tsx
│
├── dessert-builder/
│   ├── dessert-builder.tsx
│   ├── builder-step.tsx
│   ├── builder-options.tsx
│   └── builder-result.tsx
│
├── ingredient-story/
├── supply-chain/
├── gap-section/
├── brand-story/
├── founder/
│
├── business-dashboard/
│   ├── business-dashboard.tsx
│   ├── metric-card.tsx
│   └── animated-counter.tsx
│
├── investment/
├── use-of-funds/
├── customer-support/
└── footer/
```

Use reusable primitives instead of repeating layout code.

------------------------------------------------------------------------

# 11. UI Component Strategy

Use shadcn/ui only where its primitives provide value.

Good candidates:

-   Button
-   Dialog
-   Sheet
-   Tabs
-   Badge
-   Tooltip
-   Card

Do not force every visual element into a shadcn component.

The brand's custom visual identity should be implemented through
Tailwind/CSS and custom components.

------------------------------------------------------------------------

# 12. Styling Architecture

Use Tailwind CSS with centralized design tokens.

Create CSS variables for:

``` text
--berry-pink
--deep-berry
--strawberry-cream
--mint
--vanilla
--soft-blue
--dark-cocoa
```

Map them into Tailwind theme utilities where practical.

Avoid scattering raw hex values throughout components.

------------------------------------------------------------------------

# 13. Responsive Design

Primary breakpoints:

``` text
Mobile: 375px+
Tablet: 768px+
Laptop: 1024px+
Desktop: 1440px+
```

Design mobile intentionally.

Do not simply scale desktop.

Important mobile-specific areas:

-   Hero
-   Navigation
-   Menu
-   Dessert Builder
-   Business Dashboard
-   Investment Ask

Avoid horizontal overflow.

------------------------------------------------------------------------

# 14. Animation Stack

## Motion

Use Motion for:

-   component entrances
-   tabs
-   product transitions
-   builder transitions
-   button interactions
-   modal/drawer transitions
-   small layout animations

## GSAP + ScrollTrigger

Use only for animations that genuinely benefit from timeline/scroll
control:

-   supply-chain movement
-   ingredient journey
-   complex scroll storytelling
-   number counters if necessary

Do not use GSAP just because it is available.

## Lenis

Optional.

Only retain Lenis if:

-   scrolling remains accessible
-   reduced motion works
-   touch behavior is natural
-   performance remains good

If Lenis introduces issues, remove it.

------------------------------------------------------------------------

# 15. Animation Performance

Avoid:

-   animating layout-heavy properties unnecessarily
-   huge blur effects
-   continuous expensive JavaScript loops
-   hundreds of DOM particles
-   full-screen canvas effects
-   cursor tracking across the entire page

Prefer:

``` text
transform
opacity
scale
```

where possible.

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

Interactive functionality must continue to work when animation is
disabled.

------------------------------------------------------------------------

# 16. Image Strategy

Use Next.js `<Image>` for raster images.

Recommended asset categories:

``` text
public/
├── brand/
├── products/
├── illustrations/
├── textures/
└── icons/
```

Optimize supplied/generated assets before production.

Avoid huge PNGs where WebP/AVIF is appropriate.

Do not use random stock food photography.

Until real product photos are supplied, use a consistent custom
illustration/product-art direction.

------------------------------------------------------------------------

# 17. Image Alt Text

Every meaningful image must have descriptive alt text.

Decorative images should use:

``` tsx
alt=""
```

Do not use alt text such as:

``` text
image
photo
berry image
dessert
```

when a more meaningful description is appropriate.

------------------------------------------------------------------------

# 18. Accessibility

Required:

-   semantic HTML
-   correct heading hierarchy
-   keyboard navigation
-   visible focus states
-   accessible buttons
-   accessible tabs
-   accessible dialogs/drawers
-   sufficient contrast
-   descriptive alt text
-   reduced-motion support

Mobile navigation:

-   focus trap
-   Escape to close
-   logical tab order
-   clear active state

No critical functionality may depend on hover.

------------------------------------------------------------------------

# 19. Navigation

Use anchor links:

``` text
#home
#menu
#story
#build
#business
```

Smooth scrolling may be used.

Ensure keyboard users can still navigate naturally.

Use `scroll-margin-top` so sticky navigation does not cover section
headings.

------------------------------------------------------------------------

# 20. Presentation Reliability

This site is going to be used live.

Therefore:

-   avoid external API dependencies
-   avoid live database requests
-   avoid authentication
-   avoid payment services
-   avoid third-party embeds
-   avoid unnecessary network requests
-   avoid fragile animation timing
-   avoid features that can fail because of network conditions

Once loaded, all core interactions should work locally in the browser.

------------------------------------------------------------------------

# 21. No Fake Ecommerce

The site may visually resemble a premium dessert ecommerce experience.

It must NOT pretend that a real order was placed.

Buttons such as:

``` text
Looks Berrylicious →
```

may trigger presentation/demo interactions.

Do not create fake payment confirmations.

Do not collect personal payment information.

------------------------------------------------------------------------

# 22. Customer Help Widget

Implement as local UI state.

Example:

``` ts
const [isOpen, setIsOpen] = useState(false)
```

Options:

-   Menu
-   Ingredients
-   Order
-   Feedback

Each can open a relevant local panel or navigate to the appropriate
section.

No backend required.

------------------------------------------------------------------------

# 23. Business Data

Store the supplied pitch figures in:

``` text
data/business.ts
```

Current supplied values:

``` text
initialCapital: ₹3L
averageMonthlyIncome: ₹4L
annualRevenue: ₹48L
grossMargin: 60%
pilotOutlets: 1
investmentAsk: ₹20L
equityOffered: 10%
```

The investment valuation should be derived:

``` text
₹20,00,000 / 0.10 = ₹2,00,00,000
```

Do not hardcode contradictory values.

Label pitch-derived figures appropriately in the UI.

------------------------------------------------------------------------

# 24. Content Integrity

The implementation must never fabricate:

-   reviews
-   testimonials
-   awards
-   press
-   certifications
-   market share
-   competitor statistics
-   health claims
-   organic claims
-   customer counts
-   social followers
-   guaranteed investment returns
-   unprovided prices
-   unprovided locations

Missing data should produce a deliberate placeholder/disabled state.

------------------------------------------------------------------------

# 25. SEO

Implement in `app/layout.tsx`:

``` text
title:
Berrylicious — Desserts, Coffee & Good Vibes

description:
Discover Berrylicious — playful desserts, fruit-forward flavours, gelato and indulgent treats made to turn ordinary moments into something sweeter.
```

Also implement:

-   favicon
-   theme color
-   Open Graph metadata
-   appropriate viewport metadata

------------------------------------------------------------------------

# 26. Error Handling

The site has no external data dependencies in the current version, so
avoid unnecessary error-state complexity.

For interactive components:

-   provide sensible initial state
-   never allow impossible builder states
-   gracefully handle missing price data
-   prevent invalid selections
-   keep UI usable after reset

Dessert Builder should have:

**Reset / Start Again**

functionality.

------------------------------------------------------------------------

# 27. State Management

Do not add Redux, Zustand or another global state library unless a real
requirement appears.

Local React state is sufficient for:

-   Craving Selector
-   Dessert Builder
-   Customer Help
-   Mobile navigation

Keep state as close as possible to the component that owns it.

------------------------------------------------------------------------

# 28. Dependency Philosophy

Every dependency must have a clear reason.

Do not install packages for functionality already provided by:

-   React
-   Next.js
-   Tailwind
-   shadcn/ui
-   Motion
-   GSAP
-   Lucide

Avoid dependency bloat.

------------------------------------------------------------------------

# 29. Testing / QA

Before completion:

### TypeScript

Run typecheck.

### Lint

Run lint.

### Build

Run production build.

### Browser checks

Test:

-   desktop
-   tablet
-   mobile

### Functional checks

Verify:

-   nav
-   mobile menu
-   anchor scrolling
-   Craving Selector
-   Menu
-   Dessert Builder
-   dynamic pricing
-   reset functionality
-   Customer Help
-   all CTA buttons

### Accessibility checks

Verify:

-   keyboard navigation
-   focus states
-   reduced motion
-   accessible labels
-   heading hierarchy

------------------------------------------------------------------------

# 30. Performance QA

Check:

-   image sizes
-   layout shift
-   animation smoothness
-   initial load
-   client JavaScript
-   unnecessary re-renders
-   off-screen animation behavior

Do not optimize blindly.

Measure obvious bottlenecks and simplify expensive features.

------------------------------------------------------------------------

# 31. Vercel Deployment

Deployment target:

**Vercel**

The application should build using the standard Next.js production
build.

Avoid requiring:

-   environment variables
-   external APIs
-   server secrets

for the current showcase version.

If environment variables are later introduced, document them in
`.env.example`.

Never commit secrets.

------------------------------------------------------------------------

# 32. Git / Repository Hygiene

Keep:

``` text
.env*
node_modules/
.next/
```

out of Git where appropriate.

Maintain:

-   clean commits
-   meaningful component names
-   no debug logs
-   no unused imports
-   no dead components
-   no commented-out abandoned implementations

------------------------------------------------------------------------

# 33. Build Order

Implement in this order:

1.  Inspect existing repository.
2.  Do not destroy working project configuration without reason.
3.  Establish tokens.
4.  Establish typography.
5.  Establish data models.
6.  Populate confirmed data.
7.  Build layout/navigation.
8.  Build Hero.
9.  Build Brand Intro.
10. Build Craving Selector.
11. Build Menu.
12. Build Dessert Builder.
13. Build story sections.
14. Build Business Dashboard.
15. Build Investment section.
16. Build Customer Help.
17. Build responsive layouts.
18. Add animations.
19. Add accessibility.
20. Run lint.
21. Run typecheck.
22. Run production build.
23. Perform visual QA.
24. Perform mobile QA.
25. Refine.

------------------------------------------------------------------------

# 34. Definition of Done

The project is not complete merely because the page renders.

It is complete only when:

-   The brand looks intentional.
-   The site does not resemble a generic AI restaurant template.
-   All confirmed menu prices are accurate.
-   Missing prices are never invented.
-   Dessert Builder calculations are correct.
-   Craving Selector works.
-   Navigation works.
-   Mobile layout is polished.
-   Keyboard navigation works.
-   Reduced motion works.
-   No obvious console errors exist.
-   TypeScript passes.
-   Lint passes.
-   Production build passes.
-   Major animations remain smooth.
-   Financial figures are clearly presented as supplied pitch
    information.
-   No unsupported claims have been introduced.

------------------------------------------------------------------------

# 35. Engineering North Star

Build the simplest technical system capable of delivering a **highly
polished visual experience**.

Do not over-engineer.

Do not add features merely because they are technically impressive.

The website should make the audience remember:

**Berrylicious**

---not the technology used to build it.
