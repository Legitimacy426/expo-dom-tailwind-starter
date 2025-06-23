"use client"
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
import { useSubSidebar, NavigationItem, SubSidebarGroup } from "@/contexts/sidebar-context"

export interface ClientSidebarConfig {
  title: string
  description?: string
  groups?: SubSidebarGroup[]
  className?: string
}

interface ClientSidebarProps {
  config?: ClientSidebarConfig
}

export function ClientSidebar({ config }: ClientSidebarProps) {
  const pathname = usePathname()
  const { groups: contextGroups, context } = useSubSidebar()

  // Use provided config or fall back to context
  const sidebarGroups = config?.groups || contextGroups
  const sidebarConfig = {
    title: config?.title || context?.title || "Client Management",
    description: config?.description || context?.description || "Manage client information",
    className: config?.className || "",
  }

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="none"
      className={`border-r border-sidebar-border bg-blue-50 ${sidebarConfig.className}`}
    >
      <SidebarHeader className="bg-blue-100 border-b border-blue-200">
        <div className="px-2 py-1">
          <h2 className="text-lg font-semibold text-blue-900">{sidebarConfig.title}</h2>
          {sidebarConfig.description && (
            <p className="text-sm text-blue-700">{sidebarConfig.description}</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-blue-50">
        {sidebarGroups && sidebarGroups.length > 0 ? (
          // Render grouped navigation
          sidebarGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-blue-800 font-semibold text-xs uppercase tracking-wider">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === item.url}
                        className="text-blue-900 hover:bg-blue-100 data-[state=open]:bg-blue-100"
                      >
                        <Link href={item.url as any}>
                          <item.icon className="text-blue-600" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        ) : (
          // Fallback content
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-800 font-semibold text-xs uppercase tracking-wider">
              CLIENT NAVIGATION
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 text-blue-700 text-sm">
                No navigation items available
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
