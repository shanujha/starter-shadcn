import { AuthProvider } from "@/hooks/useAuth";
import RootLayout from "@/layouts/Root.layout";
import EncryptionComponent from "@/pages/encryptutil";
import LoginPage from "@/pages/LoginPage";
import TestFileUpload from "@/pages/TestFileUpload";
import TestPage from "@/pages/TestPage";
import { createBrowserRouter } from "react-router-dom";

export const routing = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "test",
        element: <RootLayout />,
        children: [
          {
            path: '',
            element: <TestPage />
          },
        ]
      },
      {
        path: "/upload",
        element: <TestFileUpload />
      },

      {
        path: "/encrypt",
        element: <EncryptionComponent />
      },
    ]
  },
]);
