import "client/src/reset.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "client/src/pages/HomePage.tsx";
import { Layout } from "client/src/components/Layout/Layout.tsx";
import { InstagramPage } from "client/src/pages/InstagramPage.tsx";
import { TwitterPage } from "client/src/pages/TwitterPage.tsx";
import { FacebookPage } from "client/src/pages/FacebookPage.tsx";
import { YoutubePage } from "client/src/pages/YoutubePage.tsx";
import { StatisticPage } from "client/src/pages/StatisticPage.tsx";
import { DashboardPage } from "client/src/pages/Dashboard.tsx";
import { DocumentsPage } from "client/src/pages/Documents.tsx";
import { SettingsPage } from "client/src/pages/Settings.tsx";
import { LogPage } from "client/src/pages/Log.tsx";

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
