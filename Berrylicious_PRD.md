# Berrylicious --- Website Product Requirements Document (PRD)

**Version:** 2.0 --- Production Handoff\
**Status:** Build-ready, with explicitly gated missing inputs\
**Project:** Interactive brand website + Shark Tank presentation
companion\
**Brand:** Berrylicious\
**Founder:** Tanvi Ojha\
**Context:** School Shark Tank competition

------------------------------------------------------------------------

## 0. Executive Direction

Build Berrylicious as a **real-feeling dessert startup website that
happens to be presented at a school Shark Tank**.

The website must not feel like a school assignment, a generic restaurant
template, or an AI-generated landing page.

The experience should move naturally through:

**Craving → Discovery → Product → Personalization → Brand Story →
Business → Investment Ask**

The website is primarily a polished, interactive presentation companion.
It is **not** a real ecommerce platform in this version.

### North-star principle

> Make the brand memorable without letting visual effects overpower the
> business story.

------------------------------------------------------------------------

# 1. Product Definition

## 1.1 What this is

A single-page, highly interactive brand website for Berrylicious
designed to:

-   Present Berrylicious as a plausible dessert startup.
-   Make the menu easy and enjoyable to explore.
-   Demonstrate a live interactive dessert-building experience.
-   Explain the brand story and product philosophy.
-   Present the business model and pitch figures clearly.
-   Support Tanvi during a live Shark Tank presentation.

## 1.2 Primary audiences

1.  School Shark Tank judges
2.  Teachers
3.  Students
4.  Potential customers
5.  Potential investors within the context of the pitch

## 1.3 Success criteria

Priority order:

1.  **Brand impression**
2.  **Product clarity**
3.  **Live presentation usability**
4.  **Interactivity**
5.  **Business credibility**
6.  **Performance**
7.  **Accessibility**

Never sacrifice usability for visual effects.

## 1.4 Explicit non-goals

Do not build:

-   Database
-   Authentication
-   CMS
-   Real checkout
-   Payment processing
-   Real customer accounts
-   Real delivery integration
-   Real customer support backend
-   Fake social proof
-   Fabricated testimonials
-   Fake awards
-   Guaranteed investment returns

------------------------------------------------------------------------

# 2. Brand Identity

## 2.1 Final brand

**Berrylicious**

The previous concept name was Frostbound. Do not display the previous
name anywhere in the live website.

Reference artwork contains the name "Dolce and Chaos --- Premium
Desserts". Treat that material strictly as visual inspiration. Never use
that name as the Berrylicious brand.

## 2.2 Brand personality

-   Cute
-   Playful
-   Warm
-   Fresh
-   Youthful
-   Premium-but-accessible
-   Slightly whimsical
-   Approachable
-   Modern
-   Indian dessert culture blended with contemporary dessert-café
    sensibility

## 2.3 Avoid

-   Corporate appearance
-   Generic restaurant-template styling
-   Excessive pink
-   Excessive childishness
-   Luxury-only positioning
-   School-project aesthetics
-   AI-generated visual clichés
-   Emoji spam

------------------------------------------------------------------------

# 3. Visual Design System

## 3.1 Core mood

**Berry café × cute stationery × modern dessert brand × playful
startup**

The reference artwork suggests:

-   Rounded forms
-   Hand-drawn illustrations
-   Pastel color
-   Doodles
-   Soft borders
-   Playful typography
-   Dessert illustrations
-   Friendly visual imperfections

Use those principles while creating a distinct Berrylicious identity.

## 3.2 Color tokens

  Token       Name               Hex
  ----------- ------------------ -----------
  primary     Berry Pink         `#E98FA8`
  secondary   Strawberry Cream   `#FFF1E8`
  berry       Deep Berry         `#9E4663`
  fresh       Mint               `#BFE9DE`
  cream       Vanilla            `#FFF9F0`
  accent      Soft Blue          `#B8DDF2`
  text        Dark Cocoa         `#382D32`

### Color rule

Vanilla and Strawberry Cream should dominate the overall page.

Berry Pink, Mint and Soft Blue are accents.

The site must **not** become an all-pink website.

## 3.3 Typography

Use:

-   A playful handwritten/script display face for selected headings and
    brand moments.
-   A highly readable rounded sans-serif for body copy, navigation,
    pricing and financial information.

Hard rule:

**Never use the script font for long paragraphs, pricing, financial
figures or important UI controls.**

## 3.4 Shape language

Use:

-   rounded cards
-   soft corners
-   organic blobs
-   hand-drawn borders
-   subtle dotted/dashed details
-   small doodles
-   light texture where appropriate

Avoid turning every element into a blob.

------------------------------------------------------------------------

# 4. Technical Stack

Use:

-   Next.js
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Motion
-   GSAP + ScrollTrigger only where useful
-   Lucide React
-   Lenis only if accessibility/performance remain strong
-   Next.js Image optimization
-   Vercel deployment

## 4.1 Architecture rules

Use React Server Components by default.

Use Client Components only for:

-   Craving Selector
-   Dessert Builder
-   Animated counters
-   Mobile navigation
-   Customer Helpline
-   other genuinely interactive components

No `any`.

Keep product/business content in data files.

## 4.2 Recommended structure

``` text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  navigation/
  hero/
  section-heading/
  craving-selector/
  menu/
  product-card/
  dessert-builder/
  ingredient-story/
  supply-chain/
  gap-section/
  brand-story/
  founder/
  business-dashboard/
  investment/
  use-of-funds/
  customer-support/
  footer/

data/
  menu.ts
  flavours.ts
  business.ts
  brand.ts

lib/
  utils.ts
```

------------------------------------------------------------------------

# 5. Data Architecture

Create a single source of truth.

## 5.1 Product model

Each product should support:

``` ts
{
  id: string
  name: string
  category: string
  subcategory?: string
  price?: number
  sizes?: {
    name: string
    price: number
  }[]
  description?: string
  tags: string[]
  image?: string
  builderBase?: boolean
  builderFlavour?: boolean
  builderTopping?: boolean
}
```

Do not duplicate product information across components.

## 5.2 Missing data rule

If a price, product image or business detail is not supplied:

**DO NOT INVENT IT.**

Use one of:

-   disabled UI state
-   "Coming soon"
-   tasteful placeholder
-   explicit data-needed comment

Do not silently fabricate values.

------------------------------------------------------------------------

# 6. Site Navigation

## Desktop

``` text
BERRYLICIOUS

Home
Menu
Our Story
Build Yours
The Business

Explore
```

Sticky navigation.

On scroll:

-   reduce height subtly
-   maintain readability
-   do not introduce distracting animation

## Mobile

Brand + hamburger.

Hamburger opens an accessible drawer.

Requirements:

-   keyboard accessible
-   focus trap
-   Escape closes
-   clear active state
-   navigation closes after anchor selection

------------------------------------------------------------------------

# 7. Page Experience

## Section order

1.  Hero
2.  Brand introduction
3.  Craving Selector
4.  Menu
5.  Dessert Builder
6.  The Gap
7.  Natural Ingredient Story
8.  Supply Chain
9.  Brand Story
10. Founder
11. Business Dashboard
12. Investment Ask
13. Use of Funds
14. Investor Value
15. Delivery / Convenience
16. Customer Help
17. Final CTA
18. Footer

The page should feel like one continuous story, not disconnected cards.

------------------------------------------------------------------------

# 8. Hero

## Content

Eyebrow:

**DESSERTS • COFFEE • GOOD VIBES**

Headline:

**A little sweet.\
A little chaotic.\
Completely Berrylicious.**

Supporting line:

**Desserts that turn ordinary moments into something sweeter.**

Buttons:

-   Explore the Menu
-   Build Your Dessert

## Visual

Create a floating illustrated composition using:

-   strawberries
-   blueberries
-   dessert cup
-   cream
-   stars
-   hearts
-   small hand-drawn doodles

Movement:

-   gentle floating
-   subtle parallax
-   slow decorative motion

Do not use:

-   rotating 3D fruit
-   aggressive particle effects
-   giant stock photos
-   autoplay video background

------------------------------------------------------------------------

# 9. Brand Introduction

## Heading

**Dessert, with a little more imagination.**

## Copy

Berrylicious is a home-grown dessert brand built around flavour,
creativity and accessible indulgence.

From fruit-forward desserts and gelato to waffles, pancakes, churros and
Indian-inspired combinations, Berrylicious brings together familiar
favourites with playful new twists.

## Three cards

### Fresh

Fruit-forward flavours and natural ingredients.

### Creative

Unexpected combinations inspired by Indian tastes.

### Accessible

Desserts designed to be enjoyable without making everyday indulgence
feel expensive.

------------------------------------------------------------------------

# 10. Craving Selector

## Signature interaction #1

Heading:

**What's your mood?**

Tabs:

-   Fruity
-   Creamy
-   Indulgent
-   Fluffy

## Mapping

### Fruity

-   Real Fruit Dessert
-   Acai Bowl
-   London Strawberry

### Creamy

-   Gelato
-   Real Fruit Dessert

### Indulgent

-   Churros
-   Waffles
-   Cakes
-   Mousse Cakes

### Fluffy

-   Mini Pancakes
-   Waffles

On selection:

-   animate product cards
-   preserve layout stability
-   avoid excessive movement
-   support keyboard interaction

------------------------------------------------------------------------

# 11. Menu

## Heading

**Meet the delicious chaos.**

Build the menu from `data/menu.ts`.

Do not manually duplicate the same product information in JSX.

### Real Fruit Dessert

Single flavours:

-   Strawberry --- ₹120
-   Mango --- ₹120
-   Falsa --- ₹130
-   Jamun --- ₹140
-   Chikoo --- ₹140
-   Mixed Berries --- ₹130
-   Sitaphal --- ₹140

Combinations:

-   Coconut + Mango + Pineapple --- ₹160
-   Mango + Pineapple --- ₹160
-   Coconut + Litchi --- ₹160
-   Strawberry + Custard Apple --- ₹170
-   Litchi + Raspberry --- ₹170
-   Mango + Mixed Berries --- ₹180
-   Pineapple + Mixed Berries --- ₹180
-   Litchi + Mango --- ₹180
-   Mango + Raspberry --- ₹180

### London Strawberry

-   Chocolate --- ₹150
-   Nutella --- ₹150
-   White Chocolate --- ₹150
-   Kunafa --- ₹170
-   Threeway --- ₹140
-   Overload --- ₹170

### Gelato

Base:

**₹190**

Extra topping:

**+₹50**

Toppings:

-   Hazelnut & Ferrero Rocher
-   Salted Butter Caramel
-   Mocha
-   Kunafa
-   Choco Fudge Brownie
-   Belgium Dark Chocolate
-   Tiramisu
-   Mix Berry Cheesecake
-   White Chocolate
-   Amarena Cherry
-   Peach Mango Strawberry
-   Pista

### Mini Pancakes

-   Chocolate --- ₹140
-   Nutella --- ₹160
-   Threeway --- ₹170

### Waffles

-   Chocolate
-   Nutella
-   Brownie
-   Biscoff
-   Blueberry

Each is available as:

-   Single
-   Half
-   Full

**Exact waffle prices are currently missing. Do not invent them.**

Until supplied, display a tasteful "Prices being finalized" state or
omit price from the live menu card.

### Churros

-   Chocolate --- ₹120
-   Nutella --- ₹140
-   Threeway --- ₹150

### Acai Bowl

-   Mango Yogurt --- ₹140
-   Strawberry Yogurt --- ₹140
-   Blueberry Yogurt --- ₹140

### Bakery

Signature Cakes --- 1 KG:

-   Kunafa Cake
-   Tiramisu Cheesecake
-   Blueberry Cheesecake
-   Hazelnut Nutella
-   Lotus Biscoff
-   One duplicate "Kunafa Cake" appears in the supplied source and must
    be confirmed before final publication.

Signature Cakes --- 500 G:

-   Kunafa Cake
-   Tiramisu Cake
-   Biscoff Cake

Mousse Cakes:

-   Chocolate Mousse
-   Tiramisu Mousse
-   Blueberry Mousse
-   Lotus Biscoff Mousse

**Bakery prices are currently missing. Do not invent them.**

------------------------------------------------------------------------

# 12. Product Card

Each card:

-   product visual
-   product name
-   short descriptors
-   price where confirmed
-   relevant action

Desktop hover:

-   `translateY(-4px)`
-   image scale to approximately `1.03`
-   subtle doodle reveal

Mobile:

-   no hover dependency
-   all interaction works through taps

------------------------------------------------------------------------

# 13. Dessert Builder

## Signature interaction #2

This should be the visual centerpiece of the site.

Heading:

**You bring the craving.\
We bring the chaos.**

## Builder flow

### Step 1 --- Pick your base

Available bases:

-   Gelato
-   Real Fruit Dessert
-   Mini Pancakes
-   Waffle

### Step 2 --- Choose your flavour

Only show valid options from the data layer.

### Step 3 --- Add a topping

Only show valid toppings from the data layer.

### Step 4 --- Creation card

Display:

``` text
YOUR CREATION

[Flavour]
+
[Base]
+
[Topping]

₹[calculated price]

Looks Berrylicious →
```

## Critical pricing rule

The builder must only calculate combinations whose pricing is explicitly
defined in the data.

Examples:

### Gelato

₹190 base + ₹50 topping = ₹240

### Real Fruit Dessert

Use the selected existing menu item price.

### Mini Pancakes

Use the selected menu variant price.

### Waffles

Do not enable price calculation until Single/Half/Full prices are
supplied.

### No invented prices.

The builder is a showcase interaction, not an ecommerce checkout.

------------------------------------------------------------------------

# 14. The Gap

## Heading

**We noticed a gap.**

Create a visual positioning spectrum:

### Basic

Cheap\
Limited variety\
Basic presentation

### Berrylicious

Great experience\
Creative variety\
Beautiful presentation\
Accessible pricing

### Premium

Expensive\
Luxury positioning

Use this as descriptive positioning only.

Do not make unsupported claims about named competitors, market share or
category leadership.

------------------------------------------------------------------------

# 15. Natural Ingredient Story

## Heading

**What's inside matters.**

Visual journey:

``` text
Fruits
↓
Milk
↓
Local flavours
↓
Berrylicious
```

Copy:

Berrylicious focuses on natural ingredients and fruit-based flavours
while sourcing fruits, milk and local flavours from nearby suppliers.

## Hard claims rule

Do not add:

-   100% organic
-   chemical-free
-   preservative-free
-   healthy
-   zero sugar
-   certified
-   guilt-free

unless the Berrylicious team later supplies evidence for those claims.

------------------------------------------------------------------------

# 16. Supply Chain

Interactive sequence:

``` text
Local Suppliers
      ↓
Berrylicious
      ↓
Fresher Ingredients
      ↓
Customer
```

Copy:

Berrylicious plans to source fruits, milk and local flavours from nearby
suppliers. Shorter supply chains can help reduce transportation costs
and support fresher ingredients.

Do not state guaranteed savings or guaranteed freshness.

------------------------------------------------------------------------

# 17. Brand Story

## Heading

**It started with a craving.**

Present this as an interactive visual story:

> Imagine it's midnight. You've worked all day, finished your chores,
> taken the dog out and finally sat down to scroll.
>
> Then you end up watching an Italian gelato reel.
>
> Suddenly, you need gelato.
>
> That's where Berrylicious comes in.

The copy should be broken into visual beats rather than shown as one
large paragraph.

------------------------------------------------------------------------

# 18. Founder

## Heading

**Meet Tanvi.**

**Tanvi Ojha**\
Founder --- Berrylicious

Copy:

Berrylicious was created with a simple idea: dessert should feel
exciting, beautiful and accessible enough to enjoy regularly.

Do not fabricate:

-   awards
-   press
-   qualifications
-   partnerships
-   achievements
-   testimonials
-   "youngest entrepreneur" claims

------------------------------------------------------------------------

# 19. Business Dashboard

## Heading

**Behind the Berrylicious**

Subtitle:

**The numbers behind the idea.**

Metrics:

### ₹3L

Initial capital

### ₹4L

Stated average monthly income

### ₹48L

Stated annual revenue

### 60%

Stated gross margin

### 1

Pilot outlet

Required footnote:

> Figures presented are based on the business information prepared for
> the Shark Tank presentation.

Do not label the figures as audited or independently verified.

Use subtle number animation when the section enters the viewport.

------------------------------------------------------------------------

# 20. Investment Ask

Create a visually distinct dark-berry section.

## Heading

**Ready to grow beyond one outlet.**

Primary:

# ₹20 LAKH

Secondary:

**for 10% equity**

Derived figure:

# ₹2 CRORE

Label:

**Implied valuation**

Calculation:

₹20,00,000 ÷ 0.10 = ₹2,00,00,000

This should be calculated from the data layer or utility rather than
duplicated incorrectly.

Do not imply guaranteed returns.

------------------------------------------------------------------------

# 21. Use of Funds

Three cards:

## 01 --- New Outlet

Opening another outlet in West Bengal.

## 02 --- Supply Chain

Strengthening supply chain and cold storage.

## 03 --- Student-Focused Marketing

-   College festivals
-   School tie-ups
-   Social media

------------------------------------------------------------------------

# 22. Investor Value

## Heading

**What an investor gets**

Present:

-   A chance to invest in a scalable branded dessert concept.
-   Early participation in a concept designed around accessible dessert
    experiences.
-   Potential for expansion beyond the initial West Bengal outlet.

Do not state that investment will definitely generate returns.

------------------------------------------------------------------------

# 23. Delivery / Convenience

## Heading

**Craving doesn't keep office hours.**

The pitch states:

**Available 24/7**

Present this carefully as the stated service concept.

Channels:

-   Website
-   Delivery Apps
-   Direct Orders

Mention the pitch's proposed special discount for direct website orders.

Do not create fake delivery integrations or pretend an order is actually
placed.

------------------------------------------------------------------------

# 24. Customer Help

Floating button:

**🍓 Need Berry Help?**

On click:

> Hey! Berrylicious here. 💕\
> How can we help?

Options:

-   Menu
-   Ingredients
-   Order
-   Feedback

These are demo interactions only.

No backend is required.

------------------------------------------------------------------------

# 25. Final CTA

Heading:

**Life gives you lemons.\
We'll turn them into something sweeter.**

Buttons:

-   Explore Berrylicious
-   Build My Dessert

Use a tasteful animated berry/dessert illustration.

------------------------------------------------------------------------

# 26. Footer

``` text
🍓 BERRYLICIOUS

Desserts • Coffee • Good Vibes

Menu
Our Story
Build Yours
The Business

Made with a little chaos & a lot of sweetness.
```

------------------------------------------------------------------------

# 27. Presentation Mode Requirements

The website will be demonstrated live during a school Shark Tank
presentation.

Therefore create a presentation-friendly experience.

## 27.1 Live-demo priorities

The following must be extremely easy to reach:

-   Menu
-   Dessert Builder
-   Business Dashboard
-   Investment Ask

## 27.2 Avoid fragile interactions

Do not require:

-   login
-   network API calls
-   external services
-   backend requests
-   slow animations
-   third-party widgets

The website should still function if internet connectivity is imperfect
after the page has loaded.

## 27.3 Suggested live sequence

Tanvi can demonstrate:

1.  Hero --- introduce Berrylicious.
2.  Craving Selector --- show the customer experience.
3.  Dessert Builder --- create one dessert live.
4.  Menu --- establish variety and pricing.
5.  Gap --- explain the positioning.
6.  Business Dashboard --- show the numbers.
7.  Investment Ask --- present ₹20 lakh for 10%.
8.  Use of Funds --- explain growth plan.

The site should make this sequence effortless through navigation and
anchors.

------------------------------------------------------------------------

# 28. Animation System

Animation must support storytelling.

## Entrance

Soft fade + slight upward movement.

## Scroll

Use Motion / GSAP for:

-   section reveals
-   number counters
-   ingredient journey
-   supply-chain movement
-   product transitions
-   builder transitions

## Micro-interactions

Buttons: - subtle lift - subtle scale

Cards: - approximately `translateY(-4px)`

Images: - approximately `scale(1.03)`

## Floating decorations

Very slow movement.

Never:

-   constant bouncing
-   excessive particles
-   full-site cursor-following
-   aggressive parallax
-   distracting 3D effects

------------------------------------------------------------------------

# 29. Accessibility

Implement:

-   semantic HTML
-   correct heading hierarchy
-   keyboard navigation
-   visible focus states
-   sufficient contrast
-   descriptive alt text
-   accessible buttons
-   accessible navigation
-   accessible mobile drawer
-   Escape-to-close
-   focus management
-   `prefers-reduced-motion`

No critical interaction may depend only on hover.

------------------------------------------------------------------------

# 30. Responsive Design

Support:

-   375px+
-   768px+
-   1024px+
-   1440px+

Mobile must be intentionally designed.

Pay particular attention to:

-   hero composition
-   menu cards
-   dessert builder
-   financial dashboard
-   investment section
-   navigation

Do not simply scale down desktop.

------------------------------------------------------------------------

# 31. Performance

Requirements:

-   Next.js image optimization
-   lazy loading below-the-fold imagery
-   minimal client components
-   Server Components by default
-   no unnecessary Three.js
-   no video backgrounds
-   no oversized assets
-   animations paused/reduced when off-screen where appropriate
-   avoid layout shift
-   avoid unnecessary dependencies

The site must be suitable for live presentation on a normal laptop and
potentially imperfect Wi-Fi.

------------------------------------------------------------------------

# 32. SEO

Title:

**Berrylicious --- Desserts, Coffee & Good Vibes**

Description:

**Discover Berrylicious --- playful desserts, fruit-forward flavours,
gelato and indulgent treats made to turn ordinary moments into something
sweeter.**

Also implement:

-   Open Graph metadata
-   favicon
-   theme color
-   semantic metadata where appropriate

------------------------------------------------------------------------

# 33. Content Integrity Rules

These are hard constraints.

Never invent:

-   reviews
-   testimonials
-   awards
-   press coverage
-   market share
-   competitor statistics
-   certifications
-   health claims
-   organic claims
-   additional outlets
-   audited financial claims
-   investment returns
-   fake delivery integrations
-   fake customer counts
-   fake social followers

If data is missing, preserve the structure and clearly indicate that the
input is pending.

------------------------------------------------------------------------

# 34. Asset Strategy

Product photography is not currently supplied.

Until real product imagery is supplied:

Prefer:

1.  custom vector/illustrated dessert visuals matching the brand
2.  tasteful generated/placeholder product artwork if available within
    the build environment
3.  carefully designed product silhouettes

Do not use random stock photography.

The illustration system should feel consistent across the entire site.

------------------------------------------------------------------------

# 35. Quality Gate Before Completion

The build agent must perform a final self-review.

## Functional

-   Navigation works.
-   Anchor links work.
-   Mobile menu works.
-   Craving Selector works.
-   Dessert Builder works.
-   Valid prices calculate correctly.
-   Invalid/missing-price combinations cannot produce fabricated prices.
-   Customer Help opens/closes.
-   All buttons have intentional behavior.
-   No broken links.

## Visual

-   Typography hierarchy is clear.
-   Brand colors are consistent.
-   Site does not look excessively pink.
-   Product visuals feel consistent.
-   Sections transition naturally.
-   Financial section feels more mature.
-   Animations are subtle.

## Responsive

Test:

-   375px
-   768px
-   1024px
-   1440px

Check for:

-   overflow
-   clipping
-   unreadable text
-   broken cards
-   overlapping illustrations
-   builder layout issues
-   navigation problems

## Accessibility

Check:

-   keyboard navigation
-   focus states
-   heading hierarchy
-   button semantics
-   contrast
-   reduced motion

## Technical

Run:

-   lint
-   typecheck
-   production build

Fix all errors before completion.

------------------------------------------------------------------------

# 36. Gated Inputs --- Do Not Guess

The following information is still missing and must not be fabricated:

### A. Waffle pricing

Need Single / Half / Full prices.

### B. Bakery pricing

Need prices for 1 KG, 500 G and Mousse Cakes.

### C. Duplicate Kunafa Cake

Confirm whether the duplicated 1 KG Kunafa Cake entry is intentional or
accidental.

### D. Product visuals

Real product images or approved illustration assets can be supplied
later.

Until these are supplied, the site should remain fully functional
everywhere else.

------------------------------------------------------------------------

# 37. Implementation Order

Build in this order:

1.  Inspect repository and existing project setup.
2.  Preserve working project configuration unless there is a clear
    reason to change it.
3.  Establish design tokens.
4.  Establish brand typography.
5.  Establish data models.
6.  Populate confirmed menu/business data.
7.  Build navigation.
8.  Build Hero.
9.  Build Brand Intro.
10. Build Craving Selector.
11. Build Menu.
12. Build Dessert Builder.
13. Build Gap.
14. Build Ingredient Story.
15. Build Supply Chain.
16. Build Story.
17. Build Founder.
18. Build Business Dashboard.
19. Build Investment Ask.
20. Build Use of Funds.
21. Build Investor Value.
22. Build Delivery section.
23. Build Customer Help.
24. Build Final CTA/Footer.
25. Implement responsive layouts.
26. Implement accessibility.
27. Implement animations.
28. Optimize performance.
29. Run lint/typecheck/build.
30. Perform visual QA.
31. Refine spacing, hierarchy and micro-interactions.
32. Only then declare the implementation complete.

------------------------------------------------------------------------

# 38. Final Instruction to the Build Agent

Do not interpret this PRD as permission to add random features.

When a design decision is unspecified:

**Prefer the simplest polished solution that preserves the Berrylicious
brand direction.**

When content is missing:

**Do not invent it.**

When an animation would compete with content:

**Remove the animation.**

When a visual effect makes the site slower:

**Remove or simplify it.**

When a component can be shared:

**Make it reusable.**

When the site looks like a generic AI-generated restaurant template:

**Stop and redesign the affected section.**

The final experience should make a judge think:

> "This feels like a real dessert startup."

not:

> "This is a school website with lots of animations."
