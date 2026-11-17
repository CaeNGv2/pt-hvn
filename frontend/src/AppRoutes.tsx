import { Route, Routes } from "react-router-dom";

import { RequireAdmin } from "@/components/guards/RequireAdmin";
import { adminSidebarNav, HomeLayout, PortalLayout } from "@/layouts";
import AdminHome from "@/pages/admin/AdminHome";
import DemoStatePage from "@/pages/admin/DemoStatePage";
import AdminLoginPage from "@/pages/auth/AdminLoginPage";
import MemberLoginPage from "@/pages/auth/MemberLoginPage";
import MemberRegisterPage from "@/pages/auth/MemberRegisterPage";
import LandingPage from "@/pages/home/LandingPage";
import DashboardHome from "@/pages/portal/DashboardHome";
import PetDetailPage from "@/pages/portal/pets/PetDetailPage";
import PetListPage from "@/pages/portal/pets/PetListPage";

/**
 * Central route table.
 *
 * - "/"       → public landing (HomeLayout).
 * - "/portal" → member portal (open to guests for browsing).
 * - "/admin"  → admin area, gated by <RequireAdmin>.
 * - Auth pages (login/register) render standalone, outside the shells.
 */
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
      </Route>
    </Routes>
  );
}
