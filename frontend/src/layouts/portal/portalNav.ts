import {
  ArrowLeftIcon,
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
  heading: string | "main";
  items: NavLinkItem[];
}

/**
 * A sidebar's full navigation config. Each area (member portal, admin) supplies
 * its own, so the shared layout/sidebar renders the right content.
 */
export interface SidebarNav {
  /** Which auth session this area belongs to. */
  scope: "member" | "admin";
  /** The fixed "home" link of this area, shown above the categorised list. */
  dashboardLink: NavLinkItem;
  categories: NavCategory[];
}

/** Member portal navigation. */
export const portalSidebarNav: SidebarNav = {
  scope: "member",
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
        },
        {
          label: "My surrenders",
          to: "/portal/releases",
          icon: InboxArrowDownIcon,
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

/** Admin navigation. */
export const adminSidebarNav: SidebarNav = {
  scope: "admin",
  dashboardLink: { label: "Overview", to: "/admin", icon: Squares2X2Icon },
  categories: [
    {
      heading: "main", // add to top main cat
      items: [
        {
          label: "Pet Portal",
          to: "/portal",
          icon: ArrowLeftIcon,
        },
      ],
    },
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
        { label: "Adoptions", to: "/admin/adoptions", icon: HeartIcon },
        { label: "Surrenders", to: "/admin/releases", icon: InboxArrowDownIcon },
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
