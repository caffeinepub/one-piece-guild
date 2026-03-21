import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ChatPage from "./pages/ChatPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import TournamentPage from "./pages/TournamentPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5000, retry: 1 },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ background: "#0B0B0D", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <AIAssistant />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const joinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join",
  component: JoinPage,
});
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatPage,
});
const announcementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/announcements",
  component: AnnouncementsPage,
});
const tournamentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournament",
  component: TournamentPage,
});
const complaintsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complaints",
  component: ComplaintsPage,
});
const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: LeaderboardPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  joinRoute,
  chatRoute,
  announcementsRoute,
  tournamentRoute,
  complaintsRoute,
  leaderboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
