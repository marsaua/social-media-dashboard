import "./reset.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/HomePage.tsx";
import { Layout } from "@/components/Layout/Layout.tsx";
import { InstagramPage } from "@/pages/InstagramPage.tsx";
import { TwitterPage } from "@/pages/TwitterPage.tsx";
import { FacebookPage } from "@/pages/FacebookPage.tsx";
import { YoutubePage } from "@/pages/YoutubePage.tsx";
import { StatisticPage } from "@/pages/StatisticPage.tsx";
import { DashboardPage } from "@/pages/Dashboard.tsx";
import { DocumentsPage } from "@/pages/Documents.tsx";
import { SettingsPage } from "@/pages/Settings.tsx";
import { LogPage } from "@/pages/Log.tsx";

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
