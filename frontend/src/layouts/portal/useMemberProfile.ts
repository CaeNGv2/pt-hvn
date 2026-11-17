import { useEffect, useState } from "react";

import { api } from "@/api";
import { useAuth } from "@/hooks";

/** Minimal shape we read off GET /members/me (endpoint returns a loose object). */
export interface MemberProfile {
  id?: number;
  fullName?: string;
  email?: string;
}

/**
 * Fetches the current member's profile when authenticated. Returns null while
 * loading or for guests.
 */
export function useMemberProfile() {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setProfile(null);
      return;
    }
    let active = true;
    setLoading(true);
    api.members
      .membersControllerGetMine()
      .then((res) => {
        if (active) setProfile(res.data as MemberProfile);
      })
      .catch(() => {
        if (active) setProfile(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  return { profile, loading };
}
