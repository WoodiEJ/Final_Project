import { dadosUsuario } from "@/actions/usuario"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { GiRingBox } from "react-icons/gi"

const navAdmin = [
  { title: "Dashboard", url: "/admin/dashboard", icon: "dashboard" },
  { title: "Usuários", url: "/admin/usuarios", icon: "usuarios" },
  { title: "Convidados", url: "/admin/convidados", icon: "convidados" },
]

const navRecep = [
  { title: "Dashboard", url: "/recepcionista/dashboard", icon: "dashboard" },
  { title: "Convidados", url: "/admin/convidados", icon: "convidados" },
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const usuario = await dadosUsuario()
  const navMain = usuario?.role === "admin" ? navAdmin : navRecep

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <GiRingBox className="size-5!" />
                <span className="text-base font-semibold">Weeding Pass</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}