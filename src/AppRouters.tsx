import "./reset.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout/Layout";
import { InstagramPage } from "./pages/InstagramPage";
import { TwitterPage } from "./pages/TwitterPage";
import { FacebookPage } from "./pages/FacebookPage";
import { YoutubePage } from "./pages/YoutubePage";
import { StatisticPage } from "./pages/StatisticPage";
import { DashboardPage } from "./pages/Dashboard";
import { DocumentsPage } from "./pages/Documents";
import { SettingsPage } from "./pages/Settings";
import { LogPage } from "./pages/Log";

export const AppRouters = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/instagram" element={<InstagramPage />} />
            <Route path="/twitter" element={<TwitterPage />} />
            <Route path="/facebook" element={<FacebookPage />} />
            <Route path="/youtube" element={<YoutubePage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/log" element={<LogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
