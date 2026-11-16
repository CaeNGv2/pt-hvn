import { Route, Routes } from "react-router-dom";

import { DashboardLayout, HomeLayout, type DashboardNavItem } from "@/layouts";
import AdminHome from "@/pages/admin/AdminHome";
import DashboardHome from "@/pages/portal/DashboardHome";
import LandingPage from "@/pages/home/LandingPage";

const portalNav: DashboardNavItem[] = [
  { label: "Overview", to: "/portal" },
  { label: "My adoptions", to: "/portal/adoptions" },
  { label: "My surrenders", to: "/portal/surrenders" },
];

const adminNav: DashboardNavItem[] = [
  { label: "Overview", to: "/admin" },
  { label: "Pets", to: "/admin/pets" },
  { label: "Adoptions", to: "/admin/adoptions" },
  { label: "Surrenders", to: "/admin/surrenders" },
  { label: "Members", to: "/admin/members" },
];

// TBC: user dashboard can be view by guests (i.e. list pet , view pet), other functions require auth.
// can we check use route guards (requiring auth / admin role)

/**
 * Central route table.
 *
 * -  HomeLayout.
 * - Member + admin areas share DashboardLayout w different nav sets.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public home */}
      <Route element={<HomeLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/*  portal */}
      <Route path="portal" element={<DashboardLayout title="Pet Portal" nav={portalNav} />}>
        <Route index element={<DashboardHome />} />
      </Route>

      {/* Admin dashboard */}
      <Route path="admin" element={<DashboardLayout title="Admin" nav={adminNav} />}>
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  );
}
