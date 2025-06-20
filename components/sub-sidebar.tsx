"use client"
import { Calendar, Clock, FileText, Folder, Star } from "lucide-react"
import { Link, usePathname } from "expo-router"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const subMenuItems = [
  {
    title: "Overview",
    url: "/dashboard/sub-menu",
    icon: FileText,
  },
  {
    title: "Projects",
    url: "/dashboard/sub-menu/projects",
    icon: Folder,
  },
  {
    title: "Calendar",
    url: "/dashboard/sub-menu/calendar",
    icon: Calendar,
  },
  {
    title: "Recent",
    url: "/dashboard/sub-menu/recent",
    icon: Clock,
  },
  {
    title: "Favorites",
    url: "/dashboard/sub-menu/favorites",
    icon: Star,
  },
]

export function SubSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar side="left" variant="sidebar" collapsible="none" className="border-r border-sidebar-border">
      <SidebarHeader>
        <div className="px-2 py-1">
          <h2 className="text-lg font-semibold">Sub Menu</h2>
          <p className="text-sm text-muted-foreground">Manage your content</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
