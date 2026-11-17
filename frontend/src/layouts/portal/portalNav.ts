import {
  ArrowPathIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  HomeModernIcon,
  InboxArrowDownIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavLinkItem {
  label: string;
  to: string;
  icon: IconType;
  /** No-op/placeholder links are disabled until their page exists. */
  disabled?: boolean;
}

export interface NavCategory {
  heading: string;
  items: NavLinkItem[];
}

/**
 * A sidebar's full navigation config. Each area (member portal, admin) supplies
 * its own, so the shared layout/sidebar renders the right content.
 */
export interface SidebarNav {
  /** The fixed "home" link of this area, shown above the categorised list. */
  dashboardLink: NavLinkItem;
  categories: NavCategory[];
}

/** Member portal navigation. */
export const portalSidebarNav: SidebarNav = {
  dashboardLink: { label: "Dashboard", to: "/portal", icon: HomeModernIcon },
  categories: [
    {
      heading: "Adoption",
      items: [
        { label: "Browse pets", to: "/portal/pets", icon: MagnifyingGlassIcon },
        {
          label: "My applications",
          to: "/portal/adoptions",
          icon: HeartIcon,
          disabled: true,
        },
      ],
    },
    {
      heading: "Release",
      items: [
        {
          label: "Surrender a pet",
          to: "/portal/releases/new",
          icon: PaperAirplaneIcon,
          disabled: true,
        },
        {
          label: "My surrenders",
          to: "/portal/releases",
          icon: InboxArrowDownIcon,
          disabled: true,
        },
      ],
    },
    {
      heading: "Account",
      items: [
        {
          label: "My profile",
          to: "/portal/profile",
          icon: UserIcon,
          disabled: true,
        },
        {
          label: "Activity",
          to: "/portal/activity",
          icon: ClipboardDocumentListIcon,
          disabled: true,
        },
      ],
    },
  ],
};

/** Admin navigation (placeholder destinations until those pages are built). */
export const adminSidebarNav: SidebarNav = {
  dashboardLink: { label: "Overview", to: "/admin", icon: Squares2X2Icon },
  categories: [
    {
      heading: "Manage",
      items: [
        {
          label: "Pets",
          to: "/admin/pets",
          icon: MagnifyingGlassIcon,
          disabled: true,
        },
        {
          label: "Members",
          to: "/admin/members",
          icon: UsersIcon,
          disabled: true,
        },
      ],
    },
    {
      heading: "Requests",
      items: [
        {
          label: "Adoptions",
          to: "/admin/adoptions",
          icon: HeartIcon,
          disabled: true,
        },
        {
          label: "Surrenders",
          to: "/admin/releases",
          icon: InboxArrowDownIcon,
          disabled: true,
        },
      ],
    },
    {
      heading: "Tools",
      items: [
        { label: "Demo state", to: "/admin/demo-state", icon: ArrowPathIcon },
      ],
    },
  ],
};
