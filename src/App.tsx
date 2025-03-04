import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";
import "@refinedev/antd/dist/reset.css";
import {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { RefineKbar } from "@refinedev/kbar";
import { App as AntdApp } from "antd";
import { RefineProvider } from "./providers";
import { AppRouter } from "./routes/router";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <RefineProvider>
                <AppRouter />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </RefineProvider>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </RefineKbarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
