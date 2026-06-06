import { logout } from "@/actions/login";
import { SidebarMenuButton } from "./ui/sidebar";

export function LogoutButton() {
    return (
        <SidebarMenuButton
            onClick={async () => {
                await logout()
            }}
        >
            Deslogar
        </SidebarMenuButton>
    )
}