import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// 🌿 Pages
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
import SectorListPage from "./pages/Career/SectorListPage/SectorListPage";
import SectorPage from "./pages/Career/SectorPage/SectorPage";
import FieldsPage from "./pages/Career/FieldsPage/FieldsPage";
import SubFieldDetailPage from "./pages/Career/SubFieldDetailPage/SubFieldDetailPage";
import CareerFormPage from "./pages/Career-Form/CareerFormPage";
import "./styles/index.css";
import NotFound from "./components/ui/NotFound";
import "./styles/output.css";

export default function App() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    let title = "SkillNext";

    // Static routes
    if (path === "/") title = "SkillNext";
    else if (path === "/about") title = "About | SkillNext";
    else if (path === "/sector-list") title = "Sectors | SkillNext";
    else if (path === "/career-form") title = "Career Form | SkillNext";
    // Dynamic routes
    else if (path.startsWith("/sector/")) title = "Fields | SkillNext";
    else if (path.startsWith("/field/")) title = "Subfields | SkillNext";
    else if (path.startsWith("/subfield/"))
      title = "Subfield Details | SkillNext";
    // Default / fallback page
    else title = "Page Not Found";
    document.title = title;
  }, [location]);
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* 🌍 Career flow */}
        <Route path="/sector-list" element={<SectorListPage />} />
        <Route path="/sector/:sectorId" element={<SectorPage />} />
        <Route path="/field/:fieldId" element={<FieldsPage />} />
        <Route path="/subfield/:subfieldId" element={<SubFieldDetailPage />} />
        <Route path="/career-form" element={<CareerFormPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
