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
import { useSubSidebar, NavigationItem } from "@/contexts/sidebar-context"

export interface SubSidebarConfig {
  title: string
  description?: string
  groupLabel?: string
  navigationItems?: NavigationItem[]
  className?: string
}

interface SubSidebarProps {
  config?: SubSidebarConfig
}

export function SubSidebar({ config }: SubSidebarProps) {
  const pathname = usePathname()
  const { items: contextSubMenuItems, groups: contextGroups, context } = useSubSidebar()

  // Use provided config or fall back to context items
  const subMenuItems = config?.navigationItems || contextSubMenuItems
  const subSidebarGroups = contextGroups
  const sidebarConfig = {
    title: config?.title || context?.title || "Sub Menu",
    description: config?.description || context?.description || "Manage your content",
    groupLabel: config?.groupLabel || "Quick Access",
    className: config?.className || "",
  }

  // If we have groups from context, use those; otherwise fall back to simple items
  const hasGroups = subSidebarGroups && subSidebarGroups.length > 0

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="none"
      className={`border-r border-sidebar-border ${sidebarConfig.className}`}
    >
      <SidebarHeader>
        <div className="px-2 py-1">
          <h2 className="text-lg font-semibold">{sidebarConfig.title}</h2>
          {sidebarConfig.description && (
            <p className="text-sm text-muted-foreground">{sidebarConfig.description}</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {hasGroups ? (
          // Render grouped navigation
          subSidebarGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url as any}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
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
          // Render simple navigation (fallback)
          <SidebarGroup>
            <SidebarGroupLabel>{sidebarConfig.groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {subMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url as any}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
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
        )}
      </SidebarContent>
    </Sidebar>
  )
}
