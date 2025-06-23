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
import { GitGraph } from "lucide-react-native"
import { GitGraphIcon } from "lucide-react"

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
      className={`border-r border-sidebar-border sidebar-sub ${sidebarConfig.className}`}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GitGraphIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">HerPlan</span>
                  <span className="text-xs">Case Manager</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarGroups && sidebarGroups.length > 0 ? (
          // Render grouped navigation
          sidebarGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
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
          // Fallback content
          <SidebarGroup>
            <SidebarGroupLabel>
              CLIENT NAVIGATION
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 text-muted-foreground text-sm">
                No navigation items available
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
