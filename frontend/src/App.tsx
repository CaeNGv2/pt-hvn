import { BrowserRouter, HashRouter } from "react-router-dom";

import { ToastProvider } from "@/components/toast";
import { AuthProvider, ThemeProvider } from "@/hooks";
import AppRoutes from "@/AppRoutes";
import { env } from "@/config/env";

const isGitHubActions = env.pagesBasePath !== "/";
const Router = isGitHubActions ? HashRouter : BrowserRouter;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
