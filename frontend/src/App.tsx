import { BrowserRouter, HashRouter } from "react-router-dom";

import { AuthProvider } from "@/hooks";
import AppRoutes from "@/AppRoutes";
import { env } from "@/config/env";

const isGitHubActions = env.pagesBasePath !== '/';
const Router = isGitHubActions ? HashRouter : BrowserRouter;

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
