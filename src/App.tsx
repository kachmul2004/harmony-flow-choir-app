
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { ThemeProvider } from "@/context/ThemeContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MusicLibrary from "./pages/MusicLibrary";
import MusicDetails from "./pages/MusicDetails";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import NotFound from "./pages/NotFound";
import Memberships from "./pages/Memberships";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/music" element={<MusicLibrary />} />
                <Route path="/music/:id" element={<MusicDetails />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetails />} />
                <Route path="/memberships" element={<Memberships />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
