import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

function LogoutButton() {

    const {logout}: any = useAuth();

    return (
        <Button variant={"outline"} size={"sm"} onClick={() => {
            logout()
        }}>
            <LogOut className="h-[1rem] w-[1rem] " />
        </Button>
     );
}

export default LogoutButton;