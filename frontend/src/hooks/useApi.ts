import { useCallback, useEffect, useRef, useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: unknown;
  loading: boolean;
}

/**
 * Generic async-request hook for the generated API client.
 * Usage:
 *   import { api } from "@/api";
 *   const { data: pets, loading } = useApi(() => api.pets.petsControllerFindAll());
 *
 * The `request` factory is called on mount and whenever `deps` change.
 */
export function useApi<T>(
  request: () => Promise<{ data: T }>,
  deps: unknown[] = []
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  // Bump a counter to force a refetch on demand.
  const [tick, setTick] = useState(0);
  const refetch = useCallback(() => setTick((n) => n + 1), []);

  const requestRef = useRef(request);
  requestRef.current = request;

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    requestRef
      .current()
      .then((res) => {
        if (active) setState({ data: res.data, error: null, loading: false });
      })
      .catch((error) => {
        if (active) setState({ data: null, error, loading: false });
      });

    return () => {
      active = false;
    };
  }, [tick, ...deps]);

  return { ...state, refetch };
}
