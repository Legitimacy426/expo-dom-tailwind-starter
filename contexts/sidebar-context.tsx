"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "expo-router"
import {
  LucideIcon,
  Home,
  BarChart3,
  FileText,
  Users,
  Settings,
  Folder,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  CalendarDays,
  Baby,
  Target,
  UserCheck,
  Heart,
  ClipboardList,
  BookOpen,
  TrendingUp,
  FileHeart,
  Stethoscope,
  History,
  StickyNote,
  UserPlus
} from "lucide-react"

// Types
export interface NavigationItem {
  title: string
  url: string
  icon: LucideIcon
  hasSubmenu?: boolean
  badge?: string | number
  description?: string
}

export interface SubSidebarGroup {
  title: string
  items: NavigationItem[]
}

export interface RouteConfig {
  pattern: string | RegExp
  showSubSidebar: boolean
  subSidebarGroups?: SubSidebarGroup[]
  contextTitle?: string
  contextDescription?: string
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
  currentContext: string | null
}

export interface SidebarContextType {
  // State
  state: SidebarState

  // Navigation items
  mainNavItems: NavigationItem[]
  subNavItems: NavigationItem[]
  currentSubSidebarGroups: SubSidebarGroup[]

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
  getCurrentContext: () => { title: string; description?: string } | null
}

export interface BreadcrumbItem {
  title: string
  href: string
  isActive?: boolean
}

// Default navigation items for HerPlan Case Manager
const defaultMainNavItems: NavigationItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Users,
    hasSubmenu: true,
  },
  {
    title: "Children",
    url: "/dashboard/children",
    icon: Baby,
  },
  {
    title: "Reporting",
    url: "/dashboard/reporting",
    icon: BarChart3,
  },
  {
    title: "Goals",
    url: "/dashboard/goals",
    icon: Target,
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: UserCheck,
  },
]

// Route-specific sidebar configurations
const routeConfigs: RouteConfig[] = [
  // Client Management Context
  {
    pattern: /^\/dashboard\/clients/,
    showSubSidebar: true,
    contextTitle: "Client Management",
    contextDescription: "Manage client information and care",
    subSidebarGroups: [
      {
        title: "CARE HUB",
        items: [
          { title: "Clients Profile", url: "/dashboard/clients/profile", icon: Users },
          { title: "Pregnancy Cases", url: "/dashboard/clients/pregnancy-cases", icon: Heart },
          { title: "Children", url: "/dashboard/clients/children", icon: Baby },
        ]
      },
      {
        title: "DOCUMENTATION",
        items: [
          { title: "Client Documents", url: "/dashboard/clients/documents", icon: FileText },
          { title: "Form Library", url: "/dashboard/clients/forms", icon: BookOpen },
        ]
      }
    ]
  },
  // Care Planning Context
  {
    pattern: /^\/dashboard\/care/,
    showSubSidebar: true,
    contextTitle: "Care Planning",
    contextDescription: "Plan and track care activities",
    subSidebarGroups: [
      {
        title: "CARE HUB",
        items: [
          { title: "Clients Profile", url: "/dashboard/care/clients-profile", icon: Users },
          { title: "Pregnancy Cases", url: "/dashboard/care/pregnancy-cases", icon: Heart },
          { title: "Children", url: "/dashboard/care/children", icon: Baby },
        ]
      },
      {
        title: "CARE SUPPORT & PLANNING",
        items: [
          { title: "Support Needs", url: "/dashboard/care/support-needs", icon: Heart },
          { title: "Care Plan Goals", url: "/dashboard/care/goals", icon: Target },
          { title: "Visit History", url: "/dashboard/care/visit-history", icon: History },
          { title: "Pregnancy Data", url: "/dashboard/care/pregnancy-data", icon: TrendingUp },
          { title: "Postpartum Data", url: "/dashboard/care/postpartum-data", icon: FileHeart },
          { title: "Notes", url: "/dashboard/care/notes", icon: StickyNote },
          { title: "Referrals", url: "/dashboard/care/referrals", icon: UserCheck },
        ]
      },
      {
        title: "OTHER",
        items: [
          { title: "Client Documents", url: "/dashboard/care/documents", icon: FileText },
        ]
      }
    ]
  },
  // Documentation Context
  {
    pattern: /^\/dashboard\/documents/,
    showSubSidebar: true,
    contextTitle: "Documentation",
    contextDescription: "Manage documents and forms",
    subSidebarGroups: [
      {
        title: "DOCUMENTATION",
        items: [
          { title: "Client Documents", url: "/dashboard/documents/client", icon: FileText },
          { title: "Form Library", url: "/dashboard/documents/forms", icon: BookOpen },
          { title: "Templates", url: "/dashboard/documents/templates", icon: ClipboardList },
        ]
      }
    ]
  }
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
    currentContext: null,
  })

  // Navigation items state
  const [mainNavItems, setMainNavItems] = useState<NavigationItem[]>(defaultMainNavItems)
  const [subNavItems, setSubNavItems] = useState<NavigationItem[]>(defaultSubNavItems)
  const [currentSubSidebarGroups, setCurrentSubSidebarGroups] = useState<SubSidebarGroup[]>([])

  // Helper function to find matching route config
  const findRouteConfig = (pathname: string): RouteConfig | null => {
    return routeConfigs.find(config => {
      if (typeof config.pattern === 'string') {
        return pathname.startsWith(config.pattern)
      } else {
        return config.pattern.test(pathname)
      }
    }) || null
  }

  // Update active items and sub-sidebar visibility based on pathname
  useEffect(() => {
    const routeConfig = findRouteConfig(pathname)
    const shouldShowSub = routeConfig?.showSubSidebar || pathname.startsWith("/dashboard/sub-menu")

    // Find active main item
    const activeMain = mainNavItems.find(item =>
      pathname === item.url || (item.hasSubmenu && pathname.startsWith(item.url))
    )

    // Find active sub item (from current sub-sidebar groups or default sub nav)
    let activeSub = null
    if (routeConfig?.subSidebarGroups) {
      for (const group of routeConfig.subSidebarGroups) {
        activeSub = group.items.find(item => pathname === item.url)
        if (activeSub) break
      }
    } else {
      activeSub = subNavItems.find(item => pathname === item.url)
    }

    // Update sub-sidebar groups based on route config
    if (routeConfig?.subSidebarGroups) {
      setCurrentSubSidebarGroups(routeConfig.subSidebarGroups)
    } else {
      setCurrentSubSidebarGroups([])
    }

    setState(prev => ({
      ...prev,
      isSubSidebarVisible: shouldShowSub,
      activeMainItem: activeMain?.url || null,
      activeSubItem: activeSub?.url || null,
      currentContext: routeConfig?.contextTitle || null,
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

  const getCurrentContext = (): { title: string; description?: string } | null => {
    const routeConfig = findRouteConfig(pathname)
    if (routeConfig) {
      return {
        title: routeConfig.contextTitle || "Context",
        description: routeConfig.contextDescription,
      }
    }
    return null
  }

  const contextValue: SidebarContextType = {
    state,
    mainNavItems,
    subNavItems,
    currentSubSidebarGroups,
    setMainSidebarOpen,
    setSubSidebarVisible,
    setActiveMainItem,
    setActiveSubItem,
    updateMainNavItems,
    updateSubNavItems,
    configureSidebars,
    shouldShowSubSidebar,
    getCurrentBreadcrumbs,
    getCurrentContext,
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
  const {
    state,
    subNavItems,
    currentSubSidebarGroups,
    setSubSidebarVisible,
    setActiveSubItem,
    shouldShowSubSidebar,
    getCurrentContext
  } = useSidebar()

  return {
    isVisible: shouldShowSubSidebar,
    activeItem: state.activeSubItem,
    items: subNavItems,
    groups: currentSubSidebarGroups,
    context: getCurrentContext(),
    setVisible: setSubSidebarVisible,
    setActiveItem: setActiveSubItem,
  }
}

export function useBreadcrumbs() {
  const { getCurrentBreadcrumbs } = useSidebar()
  return getCurrentBreadcrumbs()
}
