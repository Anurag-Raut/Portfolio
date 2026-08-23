# Reference-Derived Astro Portfolio Structure

## Objective
Adapt the verified reference design natively to Astro: a compact Catppuccin Mocha site with Inter and JetBrains Mono, a 768px shared column, three image-led project cards, plain experience/about sections, a Writing preview and index, readable articles, and a contact footer. Preserve all six project routes, factual portfolio data, Astro content collections, SEO, RSS, sitemap, CMS, and trailing-slash behavior without Next.js or React runtime dependencies.

## Acceptance Criteria
- [ ] The home page renders in this order: concise hero, projects, experience, about/highlights, and contact; projects are visible before experience or long biographical copy.
- [ ] The hero states the candidate's name, role/value proposition, location/availability context, and provides direct Projects, GitHub, LinkedIn, and email actions without a long paragraph.
- [ ] The fixed desktop sidebar, numbered navigation, mobile hamburger, scroll-spy logic, full-viewport section heights, background glow, and JavaScript-dependent reveal animations are removed.
- [ ] The replacement header is a compact, responsive, keyboard-accessible top navigation with working links to Projects, Experience, About, Writing, and Contact.
- [ ] The home page presents exactly three verified image-led cards: ANDB, Interfiles, and SMTP Server and Client, followed by one `View all projects` button; StreamVault, GOJS, and React Native Time Picker remain route-only on home while staying published routes.
- [ ] Project treatments prioritize project name, one-sentence outcome/description, muted technology metadata, one primary write-up link, and a quieter repository link; descriptive bullet lists are not shown on the home page.
- [ ] All six projects have published pages at `/projects/andb/`, `/projects/interfiles/`, `/projects/smtp-server-client/`, `/projects/streamvault/`, `/projects/gojs/`, and `/projects/react-native-time-picker/`.
- [ ] Each project page has unique metadata, a repository link, technology labels, an accessible back link, and short placeholder sections that can be replaced with the author's final Problem, Approach, Technical Decisions, Challenges, and Lessons content.
- [ ] Project metadata has one source of truth in the `projects` Astro content collection; the home-page cards and project routes are generated from that collection and exclude drafts.
- [ ] Decap CMS can create, edit, draft, and delete project write-ups in `src/content/projects` in addition to ordinary blog posts.
- [ ] `/blog/` is labeled Writing and includes the three published MDX articles, with existing `/blog/<slug>/`, RSS, metadata, and trailing-slash behavior preserved.
- [ ] Text and interactive controls meet readable contrast, visible focus, sensible line length, and responsive behavior at mobile and desktop widths.
- [ ] The shared content column is 768px wide, project cards use responsive 16 / 7 crops, and supporting sections use plain editorial or divider-based treatments rather than repeated cards.
- [ ] `npm run build` completes successfully and emits all six project routes.

## Steps
### Step 1: Establish project content as the source of truth
**Files to create:** `src/content/projects/andb.mdx`, `src/content/projects/interfiles.mdx`, `src/content/projects/smtp-server-client.mdx`, `src/content/projects/streamvault.mdx`, `src/content/projects/gojs.mdx`, `src/content/projects/react-native-time-picker.mdx`
**Files to modify:** `src/content/config.ts` (add the validated `projects` collection), `src/data/site.ts` (remove duplicated project records and tighten recruiter-facing copy), `public/admin/config.yml` (add project write-up editing)
**Action:**
1. In `src/content/config.ts`, define and export a `projects` content collection with required `title`, `summary`, `date`, `tech` string array, `repository` URL, integer `order`, and `draft` fields. Keep the existing `blog` schema unchanged, and ensure `draft` defaults to `false`.
2. Create one MDX file for each of the six current projects, preserving the existing names, dates, GitHub URLs, technologies, and core descriptions from `src/data/site.ts`; assign deterministic `order` values `1` through `6` in the current project order and set `draft: false` so all placeholder pages are visible.
3. Give each MDX body brief placeholder prose under `Problem`, `Approach`, `Technical Decisions`, `Challenges`, and `Lessons` headings. Clearly mark the copy as a draft/project-note placeholder without using lorem ipsum, unsupported metrics, or invented claims.
4. Remove the `projects` export from `src/data/site.ts` after its metadata has been migrated. Shorten `siteConfig.description`, the experience bullets, and the achievements copy to factual, scannable statements; preserve contact details, social URLs, education, skills, and all substantiated accomplishments.
5. Add a `projects` collection to `public/admin/config.yml` pointing to `src/content/projects`, using the same GitHub backend and MDX/frontmatter conventions as `blog`. Add widgets for every schema field, use a number widget for `order`, a list widget for `tech`, a boolean widget for `draft`, and a Markdown body widget.

### Step 2: Build project cards and dedicated write-ups
**Files to create:** `src/pages/projects/[...slug].astro`
**Files to modify:** `src/components/Projects.astro` (render the project collection as concise recruiter-facing cards)
**Action:**
1. In `src/components/Projects.astro`, load non-draft entries with `getCollection('projects')`, sort by ascending `data.order`, and render a compact section headed `Selected projects`.
2. For each project, show only its title, one-sentence summary, technology labels, a primary internal link to `/projects/${project.slug}/`, and a secondary external repository link with `target="_blank"` and `rel="noopener noreferrer"`. Make the article/link semantics and visible focus states work without hover or JavaScript.
3. Remove the achievements section currently appended to `Projects.astro`; recruiter proof points will be shown once, compactly, in the About section instead of being mixed into project content.
4. Implement `src/pages/projects/[...slug].astro` with `getStaticPaths()` over non-draft `projects` entries, `CollectionEntry<'projects'>` typing, and `post.render()` following the established blog route pattern.
5. Render a concise project masthead containing the title, summary, date, technology labels, repository link, and `← Back to projects` link to `/#projects`, followed by the MDX content in a narrow readable prose column. Pass unique title/description and article dates to `BaseLayout`, and retain trailing slashes in every internal URL.

### Step 3: Reorder and compress the recruiter journey
**Files to create:** None
**Files to modify:** `src/pages/index.astro` (put projects directly after the hero and remove recent-blog empty state), `src/components/Hero.astro` (replace long intro with a compact recruiter summary and actions), `src/components/Header.astro` (replace sidebar/menu/scroll-spy with a simple top nav), `src/components/Experience.astro` (reduce job content to high-signal results), `src/components/About.astro` (condense biography, skills, education, and selected achievements), `src/components/Contact.astro` (reduce to one invitation and direct contact links), `src/components/Footer.astro` (remove sidebar offset and duplicate low-value social links), `src/layouts/BaseLayout.astro` (use the centered top-nav layout and remove reveal behavior)
**Files to delete:** `src/components/ScrollReveal.astro`, `src/components/RecentBlogs.astro`, `src/components/Achievements.astro`
**Action:**
1. Change `src/pages/index.astro` to render `Hero`, `Projects`, `Experience`, `About`, and `Contact` in that exact order. Remove the `RecentBlogs` import/render so an empty writing section cannot delay projects or add noise.
2. Rewrite `Hero.astro` as a compact introduction rather than a full-screen splash: name, `Software Engineer`, one short factual specialization sentence, location, and direct links to `/#projects`, GitHub, LinkedIn, and the configured email. Do not duplicate every competitive-programming/social profile in the hero.
3. Replace all of `Header.astro`'s sidebar, numbered items, hamburger menu, and script with a sticky top header inside the same centered width as the page. Use a home/name link plus plain links to `/#projects`, `/#experience`, `/#about`, `/blog/`, and `/#contact`; allow the links to wrap or horizontally scroll safely on narrow screens rather than hiding them behind JavaScript.
4. In `Experience.astro`, retain employer/role, period, location, and at most three strongest factual outcome bullets. In `About.astro`, use no more than two short paragraphs, one compact skills line/group, education, and at most three strongest achievement proof points from `src/data/site.ts`.
5. In `Contact.astro`, use one sentence, a prominent email link, and only GitHub and LinkedIn as secondary actions. In `Footer.astro`, remove `lg:ml-64`, retain the copyright/name, and avoid repeating the full social-link list already available elsewhere.
6. In `BaseLayout.astro`, remove the `ScrollReveal` import/render and all left-sidebar/top-padding offsets. Keep `BaseHead`, `Header`, `Footer`, and the global stylesheet, with a normal document flow and skip-link-friendly main-content target.
7. Delete the three now-unused components only after all imports and references have been removed.

### Step 4: Apply one minimal, readable Catppuccin Mocha visual system everywhere
**Files to create:** None
**Files to modify:** `tailwind.config.mjs` (define semantic Catppuccin Mocha canvas, text, surface, border, and mauve/lavender accent tokens), `src/styles/global.css` (define compact layout, typography, focus, links, buttons, tags, elevated cards, and Mocha prose), `src/components/BlogCard.astro` (simplify article summary presentation), `src/pages/blog/index.astro` (use compact listing/empty state), `src/pages/blog/[...slug].astro` (align article layout and readable Mocha prose), `src/pages/404.astro` (remove reveal dependency and align spacing)
**Action:**
1. Replace the many decorative color and animation tokens in `tailwind.config.mjs` with a restrained high-contrast Catppuccin Mocha canvas/text/muted/border palette, elevated surface tokens, and mauve/lavender accents. Keep the typography plugin and existing font setup; remove unused glow, slide, and fade keyframes.
2. Rewrite `src/styles/global.css` so `body` has a plain background with no radial gradient or fixed attachment, sections use natural content height, the main content width stays roughly `720–800px`, body copy stays near `65–75` characters per line, and vertical spacing is compact enough that the first project is discoverable near the initial viewport.
3. Replace numbered `.section-header` chrome with a consistent plain heading style. Define reusable understated Mocha border/card, text-link, button, tag, prose, and `:focus-visible` styles; keep smooth scrolling only when `prefers-reduced-motion` permits it and remove all `.reveal`, `.revealed`, nav-indicator, glow, and full-screen section rules.
4. Update `BlogCard.astro`, `src/pages/blog/index.astro`, and `src/pages/blog/[...slug].astro` to use the new Mocha classes, compact spacing, readable prose width, and visible back links. Remove every `reveal` and `prose-invert` dependency while preserving dates, tags, dynamic routing, and article metadata.
5. Update `src/pages/404.astro` to remove the deleted reveal class and use the same centered layout, plain typography, and obvious home link.
6. Check the complete site for stale light-theme, sidebar-offset, numbered-section, and reveal classes; remove those usages only from the exact files listed in this plan and leave deployment/OAuth infrastructure unchanged.

## Verification
- Run `npm run build`; expect Astro to complete with no content-schema, TypeScript, or route-generation errors and to report six generated `/projects/.../` pages.
- Run `test -f dist/projects/andb/index.html && test -f dist/projects/interfiles/index.html && test -f dist/projects/smtp-server-client/index.html && test -f dist/projects/streamvault/index.html && test -f dist/projects/gojs/index.html && test -f dist/projects/react-native-time-picker/index.html`; expect exit status `0` and no output.
- Run `npm run astro -- dev --background`; expect the Astro development server to start in background mode, then run `npm run astro -- dev status` and confirm it is running.
- In the browser, inspect `/` at approximately `375px`, `768px`, and `1440px`: expect no horizontal overflow, projects immediately after the compact hero, readable line lengths, working anchor navigation, and no content hidden pending JavaScript.
- Open every `/projects/<slug>/` route and verify its unique title/description, repository link, technology labels, placeholder headings, back link, and trailing-slash URL; verify `/blog/`, `/404`, external links, mail link, keyboard focus, and reduced-motion behavior remain usable.
- Open `/admin/` and confirm both `Blog Posts` and `Project Write-ups` are present and that the project editor exposes fields matching the Astro schema; do not save CMS content during verification.
- Run `npm run astro -- dev stop`; expect the background development server to stop cleanly.

## Durable design notes

- The home page intentionally highlights three visual projects followed by one `View all projects` button, while `/projects/` presents every published project in configured order as a responsive two-column card grid.
- All six complete-grid cards use supplied project-specific visuals; the home page still shows only the three featured cards and CTA.
- Project actions use a clear hierarchy: mauve inline write-up links are primary, and repository/profile links are quieter inline text. Home and all-project cards use a semantic stretched primary link so card-area clicks open the write-up while repository links remain independent.
- Complete-grid cards use a clipped flex-column container with a non-shrinking image and flexible body so equal-height rows contain their bottom-aligned actions.
- Writing index and article mastheads use 30–32px titles. Article mastheads place date/reading time, title, description, tags, and a divider before prose.
- About Highlights renders the complete configured achievement list.
- MDX code blocks use Shiki's bundled `catppuccin-mocha` theme while retaining the site's border, spacing, and readable code presentation.
