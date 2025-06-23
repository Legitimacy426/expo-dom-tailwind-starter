"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "expo-router"
import { LucideIcon, Home, BarChart3, FileText, Users, Settings, Folder, Calendar, Clock, Star } from "lucide-react"

// Types
export interface NavigationItem {
  title: string
  url: string
  icon: LucideIcon
  hasSubmenu?: boolean
  badge?: string | number
  description?: string
}

export interface SidebarConfig {
  mainNavItems?: NavigationItem[]
  subNavItems?: NavigationItem[]
  activeRoutePattern?: string
}

export interface SidebarState {
  isMainSidebarOpen: boolean
  isSubSidebarVisible: boolean
  activeMainItem: string | null
  activeSubItem: string | null
}

export interface SidebarContextType {
  // State
  state: SidebarState

  // Navigation items
  mainNavItems: NavigationItem[]
  subNavItems: NavigationItem[]

  // Actions
  setMainSidebarOpen: (open: boolean) => void
  setSubSidebarVisible: (visible: boolean) => void
  setActiveMainItem: (item: string | null) => void
  setActiveSubItem: (item: string | null) => void
  updateMainNavItems: (items: NavigationItem[]) => void
  updateSubNavItems: (items: NavigationItem[]) => void
  configureSidebars: (config: SidebarConfig) => void

  // Computed values
  shouldShowSubSidebar: boolean
  getCurrentBreadcrumbs: () => BreadcrumbItem[]
}

export interface BreadcrumbItem {
  title: string
  href: string
  isActive?: boolean
}

// Default navigation items
const defaultMainNavItems: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Sub Menu",
    url: "/dashboard/sub-menu",
    icon: FileText,
    hasSubmenu: true,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

const defaultSubNavItems: NavigationItem[] = [
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

// Create context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Provider component
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // State
  const [state, setState] = useState<SidebarState>({
    isMainSidebarOpen: true,
    isSubSidebarVisible: false,
    activeMainItem: null,
    activeSubItem: null,
  })

  // Navigation items state
  const [mainNavItems, setMainNavItems] = useState<NavigationItem[]>(defaultMainNavItems)
  const [subNavItems, setSubNavItems] = useState<NavigationItem[]>(defaultSubNavItems)

  // Update active items and sub-sidebar visibility based on pathname
  useEffect(() => {
    const shouldShowSub = pathname.startsWith("/dashboard/sub-menu")

    // Find active main item
    const activeMain = mainNavItems.find(item =>
      pathname === item.url || (item.hasSubmenu && pathname.startsWith(item.url))
    )

    // Find active sub item
    const activeSub = subNavItems.find(item => pathname === item.url)

    setState(prev => ({
      ...prev,
      isSubSidebarVisible: shouldShowSub,
      activeMainItem: activeMain?.url || null,
      activeSubItem: activeSub?.url || null,
    }))
  }, [pathname, mainNavItems, subNavItems])

  // Actions
  const setMainSidebarOpen = (open: boolean) => {
    setState(prev => ({ ...prev, isMainSidebarOpen: open }))
  }

  const setSubSidebarVisible = (visible: boolean) => {
    setState(prev => ({ ...prev, isSubSidebarVisible: visible }))
  }

  const setActiveMainItem = (item: string | null) => {
    setState(prev => ({ ...prev, activeMainItem: item }))
  }

  const setActiveSubItem = (item: string | null) => {
    setState(prev => ({ ...prev, activeSubItem: item }))
  }

  const updateMainNavItems = (items: NavigationItem[]) => {
    setMainNavItems(items)
  }

  const updateSubNavItems = (items: NavigationItem[]) => {
    setSubNavItems(items)
  }

  const configureSidebars = (config: SidebarConfig) => {
    if (config.mainNavItems) {
      setMainNavItems(config.mainNavItems)
    }
    if (config.subNavItems) {
      setSubNavItems(config.subNavItems)
    }
  }

  // Computed values
  const shouldShowSubSidebar = state.isSubSidebarVisible

  const getCurrentBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    if (segments.length > 1) {
      breadcrumbs.push({ title: "Dashboard", href: "/dashboard" })

      if (segments[1] === "sub-menu") {
        breadcrumbs.push({ title: "Sub Menu", href: "/dashboard/sub-menu" })
        if (segments[2]) {
          const subItem = subNavItems.find(item => item.url === pathname)
          breadcrumbs.push({
            title: subItem?.title || segments[2].charAt(0).toUpperCase() + segments[2].slice(1),
            href: pathname,
            isActive: true,
          })
        }
      } else {
        const mainItem = mainNavItems.find(item => item.url === pathname)
        breadcrumbs.push({
          title: mainItem?.title || segments[1].charAt(0).toUpperCase() + segments[1].slice(1),
          href: pathname,
          isActive: true,
        })
      }
    }

    return breadcrumbs
  }

  const contextValue: SidebarContextType = {
    state,
    mainNavItems,
    subNavItems,
    setMainSidebarOpen,
    setSubSidebarVisible,
    setActiveMainItem,
    setActiveSubItem,
    updateMainNavItems,
    updateSubNavItems,
    configureSidebars,
    shouldShowSubSidebar,
    getCurrentBreadcrumbs,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

// Hook to use the context
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Helper hooks for specific functionality
export function useMainSidebar() {
  const { state, mainNavItems, setMainSidebarOpen, setActiveMainItem } = useSidebar()
  return {
    isOpen: state.isMainSidebarOpen,
    activeItem: state.activeMainItem,
    items: mainNavItems,
    setOpen: setMainSidebarOpen,
    setActiveItem: setActiveMainItem,
  }
}

export function useSubSidebar() {
  const { state, subNavItems, setSubSidebarVisible, setActiveSubItem, shouldShowSubSidebar } = useSidebar()
  return {
    isVisible: shouldShowSubSidebar,
    activeItem: state.activeSubItem,
    items: subNavItems,
    setVisible: setSubSidebarVisible,
    setActiveItem: setActiveSubItem,
  }
}

export function useBreadcrumbs() {
  const { getCurrentBreadcrumbs } = useSidebar()
  return getCurrentBreadcrumbs()
}
