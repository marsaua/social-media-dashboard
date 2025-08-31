import "./reset.css";
import { Routes, Route } from "react-router-dom";
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
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { StartPage } from "./pages/StartPage";
import { LayoutStart } from "./components/Layout/LayoutStart";
import { PersistLogin } from "./pages/PersistLogin";
import { LayoutApp } from "./components/Layout/LayoutApp";
import { RequireAuth } from "./components/RequireAuth";
import { MissingPage } from "./pages/MissingPage";

export const AppRouters = () => {
  return (
    <>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<LayoutApp />}>
          <Route path="start" element={<LayoutStart />}>
            <Route index element={<StartPage />} />
            <Route path="signup" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* private pages */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Layout />}>
                <Route path="home" element={<HomePage />} />
                <Route path="instagram" element={<InstagramPage />} />
                <Route path="twitter" element={<TwitterPage />} />
                <Route path="facebook" element={<FacebookPage />} />
                <Route path="youtube" element={<YoutubePage />} />
                <Route path="statistic" element={<StatisticPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="log" element={<LogPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </>
  );
};
