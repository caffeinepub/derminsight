import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LegalPage from "./pages/LegalPage";
import ServicesPage from "./pages/ServicesPage";
import SkinConcernsPage from "./pages/SkinConcernsPage";
import StartAnalysisPage from "./pages/StartAnalysisPage";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-it-works",
  component: HowItWorksPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const skinConcernsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skin-concerns",
  component: SkinConcernsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const startRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/start",
  component: StartAnalysisPage,
});

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legal",
  component: LegalPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  howItWorksRoute,
  servicesRoute,
  skinConcernsRoute,
  aboutRoute,
  startRoute,
  legalRoute,
]);
