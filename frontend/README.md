# pt-hvn frontend

## Dev notes

### Environment

Only `VITE_`-prefixed variables reach the client.

| Variable            | Purpose                        | Default                 |
| ------------------- | ------------------------------ | ----------------------- |
| `VITE_API_BASE_URL` | Base URL of the backend REST API | `http://localhost:3000` |

Read env values only through `src/config/env.ts` (avoid `import.meta.env` across the app)

### Alias

The `@/*` import alias maps to `src/*` (configured in `vite.config.ts` & `tsconfig.app.json`).

### Using the API client

```ts
import { api, setAuthToken, type Pet } from "@/api";

// Public call
const { data: pets } = await api.pets.petsControllerFindAll();

// After login, persist the JWT
setAuthToken(jwt);
const { data: me } = await api.members.membersControllerGetMine();
```

Or inside a component with the reusable hook:

```tsx
import { api } from "@/api";
import { useApi } from "@/hooks";

const { data, loading, error } = useApi(() => api.pets.petsControllerFindAll());
```
