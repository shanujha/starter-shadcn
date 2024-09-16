import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CircleCheckBig } from "lucide-react";
import LogoutButton from "@/components/blocks/logout-button";

const RootLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => navigate("")}
          title="Go Home"
        >
          <div style={{ marginTop: 1 }}>
            <CircleCheckBig className="h-5 w-5" ></CircleCheckBig>
          </div>
          <h1 className="scroll-m-20 text-3xl tracking-tight lg:text-xl">
            Starter
          </h1>
        </div>
        <div className="flex row-auto justify-center items-center gap-3">
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default RootLayout;
