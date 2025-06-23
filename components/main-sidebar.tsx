"use client"
import { BarChart3, ChevronRight, LucideIcon, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Link, usePathname } from "expo-router"
import { useMainSidebar, NavigationItem } from "@/contexts/sidebar-context"

export interface MainSidebarConfig {
  title: string
  version?: string
  homeUrl: string
  icon: LucideIcon
  groupLabel?: string
  navigationItems?: NavigationItem[]
}

interface MainSidebarProps {
  config?: MainSidebarConfig
}

export function MainSidebar({ config }: MainSidebarProps) {
  const pathname = usePathname()
  const { items: contextNavItems } = useMainSidebar()

  // Use provided config or fall back to context items
  const navItems = config?.navigationItems || contextNavItems
  const sidebarConfig = {
    title: config?.title || "HerPlan",
    version: config?.version || "Case Manager",
    homeUrl: config?.homeUrl || "/dashboard",
    icon: config?.icon || BarChart3,
    groupLabel: config?.groupLabel || "Navigation",
  }

  // Group navigation items by section
  const navigationSection = navItems.slice(0, 3) // Home, Messages, Appointments
  const clientsSection = navItems.slice(3, 5) // Clients, Children
  const insightsSection = navItems.slice(5) // Reporting, Goals, Referrals

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <sidebarConfig.icon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{sidebarConfig.title}</span>
                  {sidebarConfig.version && (
                    <span className="text-xs">{sidebarConfig.version}</span>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel>NAVIGATION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url as any}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.hasSubmenu && <ChevronRight className="ml-auto size-4" />}
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

        {/* Clients Section */}
        <SidebarGroup>
          <SidebarGroupLabel>CLIENTS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientsSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url as any}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.hasSubmenu && <ChevronRight className="ml-auto size-4" />}
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

        {/* Insights & Actions Section */}
        <SidebarGroup>
          <SidebarGroupLabel>INSIGHTS & ACTIONS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {insightsSection.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url as any}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.hasSubmenu && <ChevronRight className="ml-auto size-4" />}
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
      </SidebarContent>

      {/* Footer with Add New Mother button */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              className="w-full justify-start gap-2 bg-white text-sidebar-foreground hover:bg-sidebar-accent"
              variant="outline"
              asChild
            >
              <Link href="/dashboard">
                <Plus className="size-4" />
                <span>Add New Mother</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
