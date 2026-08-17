import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav, GradientBlobs, SocialBar, RouteSweep } from "../components/Layout";
import { ParticlesRoot } from "../components/ParticlesBackground";
import { AntigravityField } from "../components/AntigravityField";
import { CursorGlow } from "../components/CursorGlow";
import { ScrollProgress } from "../components/Effects";
import { AuroraBackground } from "../components/AuroraBackground";
import { SmoothScroll } from "../components/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted off into the void.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Harish Portfolio — Animated Developer Portfolio" },
      { name: "description", content: "An immersive, animated developer portfolio with 3D scenes, particles, and cinematic transitions." },
      { property: "og:title", content: "Harish Portfolio — Animated Developer Portfolio" },
      { property: "og:description", content: "An immersive, animated developer portfolio with 3D scenes, particles, and cinematic transitions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Harish Portfolio — Animated Developer Portfolio" },
      { name: "twitter:description", content: "An immersive, animated developer portfolio with 3D scenes, particles, and cinematic transitions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/088e58ee-0145-4993-ae15-d3eccc9a3780/id-preview-5fad8a7e--6e86c9f0-a91e-4dab-a950-558083185313.lovable.app-1782744761921.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/088e58ee-0145-4993-ae15-d3eccc9a3780/id-preview-5fad8a7e--6e86c9f0-a91e-4dab-a950-558083185313.lovable.app-1782744761921.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AnimatedOutlet() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <RouteSweep pathname={pathname} />
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <ParticlesRoot>
        <AuroraBackground />
        <GradientBlobs />
        <div className="fixed inset-0 -z-10">
          <ParticlesBackground />
        </div>
        <CursorGlow />
        <ScrollProgress />
        <Nav />
        <AnimatedOutlet />
        <SocialBar />
      </ParticlesRoot>
    </QueryClientProvider>
  );
}
