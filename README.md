# ComplicatedAuth Next.js example

Copy `.env.example` to `.env.local`, provide a Project UID and API key, then run `npm install && npm run dev`.

The API key is loaded lazily only when the dynamic route receives a request, so
static rendering and `next build` do not require production secrets. Browser
code talks to `/api/auth` through `@complicatedauth/browser`; the server route
uses `@complicatedauth/server` to exchange browser-safe tokens for backend
references.

The example uses sibling `file:` dependencies while the SDK packages are under
active development. Its CI checks out those repositories side-by-side. Replace
the file references with published package versions in a standalone consumer.
