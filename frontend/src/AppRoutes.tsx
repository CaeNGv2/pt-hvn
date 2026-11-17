import { Route, Routes } from "react-router-dom";

import { RequireAdmin } from "@/components/guards/RequireAdmin";
import { adminSidebarNav, HomeLayout, PortalLayout } from "@/layouts";
import AdminHome from "@/pages/admin/AdminHome";
import DemoStatePage from "@/pages/admin/DemoStatePage";
import AdminAdoptionReviewPage from "@/pages/admin/review/AdminAdoptionReviewPage";
import AdminAdoptionsPage from "@/pages/admin/review/AdminAdoptionsPage";
import AdminReleaseReviewPage from "@/pages/admin/review/AdminReleaseReviewPage";
import AdminReleasesPage from "@/pages/admin/review/AdminReleasesPage";
import AdminLoginPage from "@/pages/auth/AdminLoginPage";
import MemberLoginPage from "@/pages/auth/MemberLoginPage";
import MemberRegisterPage from "@/pages/auth/MemberRegisterPage";
import LandingPage from "@/pages/home/LandingPage";
import DashboardHome from "@/pages/portal/DashboardHome";
import MyApplicationsPage from "@/pages/portal/adoptions/MyApplicationsPage";
import PetDetailPage from "@/pages/portal/pets/PetDetailPage";
import PetListPage from "@/pages/portal/pets/PetListPage";
import MySurrendersPage from "@/pages/portal/releases/MySurrendersPage";
import SurrenderPage from "@/pages/portal/releases/SurrenderPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public home */}
      <Route element={<HomeLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Auth (standalone, no shell) */}
      <Route path="portal/login" element={<MemberLoginPage />} />
      <Route path="portal/register" element={<MemberRegisterPage />} />
      <Route path="admin/login" element={<AdminLoginPage />} />

      {/* Member portal */}
      <Route path="portal" element={<PortalLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="pets" element={<PetListPage />} />
        <Route path="pets/:id" element={<PetDetailPage />} />
        <Route path="adoptions" element={<MyApplicationsPage />} />
        <Route path="releases" element={<MySurrendersPage />} />
        <Route path="releases/new" element={<SurrenderPage />} />
      </Route>

      {/* Admin dashboard — guarded; admin-specific sidebar nav */}
      <Route
        path="admin"
        element={
          <RequireAdmin>
            <PortalLayout nav={adminSidebarNav} />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="demo-state" element={<DemoStatePage />} />
        <Route path="adoptions" element={<AdminAdoptionsPage />} />
        <Route path="adoptions/:id" element={<AdminAdoptionReviewPage />} />
        <Route path="releases" element={<AdminReleasesPage />} />
        <Route path="releases/:id" element={<AdminReleaseReviewPage />} />
      </Route>
    </Routes>
  );
}
