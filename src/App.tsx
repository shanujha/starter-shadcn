import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routing } from "./routing";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

function EntryPoint() {
  return <RouterProvider router={routing} />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <EntryPoint />
      </TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
