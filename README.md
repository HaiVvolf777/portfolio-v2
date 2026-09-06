# Haider’s Verse

A walkable 3D portfolio for Haider Ali, a full-stack JavaScript developer, AI developer, no-code automation developer, and system architect. The entrance leads into a landscaped campus with an avatar, six pavilions, proximity interactions, and designed story dialogs. Built with Next.js 16, React 19, TypeScript, and React Three Fiber.

## Explore

Click **Enter Haider’s Verse**, then use **WASD / arrow keys** to walk, **Shift** to move faster, and drag the world to turn the camera. Press **Enter** (or E) near a place to open its story. **Escape** closes the story, **V** switches first/third person, and **M** opens quick travel. On mobile, drag the circular left joystick to walk and the smaller eye joystick to look around. Both respond proportionally, support independent touches, and spring back to the center when released; releasing stops movement immediately. The map links six places: My Story, Project Pavilion, The AI Lab, Journey Hall, Builder’s Studio, and Connection Garden.

This is a single-visitor portfolio world. Multiplayer networking, voice chat, and headset WebXR sessions are not implemented.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Production and verification commands:

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

## Content and architecture

- `app/[locale]/page.tsx` renders the portfolio and localized search/social metadata.
- `components/world/Metaverse.tsx` owns entrance, HUD, input bindings, quick travel, and discovery state.
- `components/world/WorldCanvas.tsx` renders the procedural campus, character, camera, collision boundaries, proximity detection, and day/night lighting. No third-party 3D assets are fetched. Rendering pauses when the document is hidden or a story is open.
- `components/world/StoryPanel.tsx` presents the six accessible story dialogs. Native dialogs trap focus and close on Escape; the world receives focus again on return.
- `components/world/TouchJoystick.tsx` handles captured multi-touch pointers, proportional axes, cancellation, and animated return to center.
- `app/[locale]/profile/page.tsx` provides a shareable, server-rendered readable portfolio without loading WebGL.
- `lib/verse.ts` defines the world locations and English, Arabic, and Urdu interface copy.
- `lib/preferences.ts` centralizes system/saved appearance and reduced-motion preferences.
- `components/Portfolio.tsx` preserves a readable portfolio fallback with direct navigation for visitors who prefer text or cannot use WebGL.
- `lib/content.ts` contains the English, Arabic, and Urdu content dictionaries. Update content here to keep translations aligned.
- `lib/i18n.ts` contains locale validation, language detection, and text direction.
- `proxy.ts` redirects `/` to the saved language or the browser's preferred supported language. It sets the locale header used by the server-rendered `<html lang>` and `dir` attributes.
- `public/Haider_Ali_Resume.pdf` is the downloadable resume provided for this project.

English lives at `/en`, Arabic at `/ar`, and Urdu at `/ur`; Arabic and Urdu use right-to-left layout. The language selector saves `haider-locale` in a cookie. The theme selector saves `haider-theme` in local storage with light, dark, and system choices. A small script applies the saved theme before the first paint. Reduced-motion preferences and loading/fallback states keep the experience usable across devices. Mobile, touch, data-saving, and lower-memory devices use a smaller rendering resolution and shadow map. The world also supports phone landscape layouts.

Content sources are the supplied resume, the user's current professional description and delivered DubiCars AI ad-posting feature, and the [previous portfolio](https://haivvolf777.github.io/) for historical context. The newer resume and user-provided details take priority. The AI ad-posting flow is presented as a portfolio case study, not a live dealer listing product. No unprovided conversion or time-saving metrics are implied.

## Deploy

Deploy to a platform supporting the Next.js Node runtime, such as Vercel, or run `npm run build` followed by `npm start` on a Node server. Language detection and server-rendered locale attributes use request headers, so this project is not configured as a static GitHub Pages export.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin before building. Without it, metadata and sitemap URLs intentionally use `http://localhost:3000`; the previous portfolio's domain is not assumed to host this implementation.

Each locale has its own canonical URL and language alternates. `app/[locale]/opengraph-image.tsx` generates the share image locally without external font requests; `app/robots.ts` and `app/sitemap.ts` expose crawler metadata. The readable portfolio is available at `/en/profile`, `/ar/profile`, and `/ur/profile`, and each is included in the sitemap. Set the public site URL before publishing.
