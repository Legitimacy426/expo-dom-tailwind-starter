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

export type SidebarMode = 'main' | 'client' | 'case'

export interface SidebarState {
  isMainSidebarOpen: boolean
  isSubSidebarVisible: boolean
  activeMainItem: string | null
  activeSubItem: string | null
  currentContext: string | null
  sidebarMode: SidebarMode
  currentClientId: string | null
  currentCaseId: string | null
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
  setSidebarMode: (mode: SidebarMode) => void
  setCurrentClient: (clientId: string | null) => void
  setCurrentCase: (caseId: string | null) => void

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

// Route-specific sidebar configurations for three-sidebar system
const routeConfigs: RouteConfig[] = [
  // Main Dashboard Context (Dark Blue) - No sub-sidebar
  {
    pattern: /^\/dashboard\/?$/,
    showSubSidebar: false,
    contextTitle: "Case Manager Dashboard",
    contextDescription: "Main dashboard overview",
  },

  // Client/Mother Context (Light Blue) - Basic client management
  {
    pattern: /^\/dashboard\/client\/[^\/]+\/?$/,
    showSubSidebar: true,
    contextTitle: "Client Management",
    contextDescription: "Manage client information",
    subSidebarGroups: [
      {
        title: "CARE HUB",
        items: [
          { title: "Clients Profile", url: "/dashboard/client/:id/profile", icon: Users },
          { title: "Pregnancy Cases", url: "/dashboard/client/:id/pregnancy-cases", icon: Heart },
          { title: "Children", url: "/dashboard/client/:id/children", icon: Baby },
        ]
      },
      {
        title: "DOCUMENTATION",
        items: [
          { title: "Client Documents", url: "/dashboard/client/:id/documents", icon: FileText },
          { title: "Form Library", url: "/dashboard/client/:id/forms", icon: BookOpen },
        ]
      }
    ]
  },

  // Case Context (Light Blue with more content) - Full case management
  {
    pattern: /^\/dashboard\/client\/[^\/]+\/case\/[^\/]+/,
    showSubSidebar: true,
    contextTitle: "Case Management",
    contextDescription: "Active case management and care planning",
    subSidebarGroups: [
      {
        title: "CARE HUB",
        items: [
          { title: "Clients Profile", url: "/dashboard/client/:clientId/case/:caseId/profile", icon: Users },
          { title: "Pregnancy Cases", url: "/dashboard/client/:clientId/case/:caseId/pregnancy-cases", icon: Heart },
          { title: "Children", url: "/dashboard/client/:clientId/case/:caseId/children", icon: Baby },
        ]
      },
      {
        title: "CARE SUPPORT & PLANNING",
        items: [
          { title: "Support Needs", url: "/dashboard/client/:clientId/case/:caseId/support-needs", icon: Heart },
          { title: "Care Plan Goals", url: "/dashboard/client/:clientId/case/:caseId/goals", icon: Target },
          { title: "Visit History", url: "/dashboard/client/:clientId/case/:caseId/visit-history", icon: History },
          { title: "Pregnancy Data", url: "/dashboard/client/:clientId/case/:caseId/pregnancy-data", icon: TrendingUp },
          { title: "Postpartum Data", url: "/dashboard/client/:clientId/case/:caseId/postpartum-data", icon: FileHeart },
          { title: "Notes", url: "/dashboard/client/:clientId/case/:caseId/notes", icon: StickyNote },
          { title: "Referrals", url: "/dashboard/client/:clientId/case/:caseId/referrals", icon: UserCheck },
        ]
      },
      {
        title: "OTHER",
        items: [
          { title: "Client Documents", url: "/dashboard/client/:clientId/case/:caseId/documents", icon: FileText },
        ]
      }
    ]
  },

  // Fallback for other client routes (use client context)
  {
    pattern: /^\/dashboard\/client\/[^\/]+/,
    showSubSidebar: true,
    contextTitle: "Client Management",
    contextDescription: "Manage client information",
    subSidebarGroups: [
      {
        title: "CARE HUB",
        items: [
          { title: "Clients Profile", url: "/dashboard/client/:id/profile", icon: Users },
          { title: "Pregnancy Cases", url: "/dashboard/client/:id/pregnancy-cases", icon: Heart },
          { title: "Children", url: "/dashboard/client/:id/children", icon: Baby },
        ]
      },
      {
        title: "DOCUMENTATION",
        items: [
          { title: "Client Documents", url: "/dashboard/client/:id/documents", icon: FileText },
          { title: "Form Library", url: "/dashboard/client/:id/forms", icon: BookOpen },
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
    sidebarMode: 'main',
    currentClientId: null,
    currentCaseId: null,
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

  // Helper function to determine sidebar mode from pathname
  const determineSidebarMode = (pathname: string): SidebarMode => {
    if (pathname.match(/^\/dashboard\/client\/[^\/]+\/case\/[^\/]+/)) {
      return 'case'
    } else if (pathname.match(/^\/dashboard\/client\/[^\/]+/)) {
      return 'client'
    } else {
      return 'main'
    }
  }

  // Helper function to extract IDs from pathname
  const extractIdsFromPath = (pathname: string) => {
    const clientMatch = pathname.match(/^\/dashboard\/client\/([^\/]+)/)
    const caseMatch = pathname.match(/^\/dashboard\/client\/[^\/]+\/case\/([^\/]+)/)

    return {
      clientId: clientMatch ? clientMatch[1] : null,
      caseId: caseMatch ? caseMatch[1] : null,
    }
  }

  // Update active items and sub-sidebar visibility based on pathname
  useEffect(() => {
    const routeConfig = findRouteConfig(pathname)
    const shouldShowSub = routeConfig?.showSubSidebar || pathname.startsWith("/dashboard/sub-menu")
    const sidebarMode = determineSidebarMode(pathname)
    const { clientId, caseId } = extractIdsFromPath(pathname)

    // Find active main item
    const activeMain = mainNavItems.find(item =>
      pathname === item.url || (item.hasSubmenu && pathname.startsWith(item.url))
    )

    // Find active sub item (from current sub-sidebar groups or default sub nav)
    let activeSub = null
    if (routeConfig?.subSidebarGroups) {
      for (const group of routeConfig.subSidebarGroups) {
        // Replace :id, :clientId, :caseId placeholders with actual values
        const processedItems = group.items.map(item => ({
          ...item,
          url: item.url
            .replace(':id', clientId || '')
            .replace(':clientId', clientId || '')
            .replace(':caseId', caseId || '')
        }))
        activeSub = processedItems.find(item => pathname === item.url)
        if (activeSub) break
      }
    } else {
      activeSub = subNavItems.find(item => pathname === item.url)
    }

    // Update sub-sidebar groups based on route config
    if (routeConfig?.subSidebarGroups) {
      // Process groups to replace placeholders with actual IDs
      const processedGroups = routeConfigs.find(config => config.pattern.test && config.pattern.test(pathname))?.subSidebarGroups?.map(group => ({
        ...group,
        items: group.items.map(item => ({
          ...item,
          url: item.url
            .replace(':id', clientId || '')
            .replace(':clientId', clientId || '')
            .replace(':caseId', caseId || '')
        }))
      })) || routeConfig.subSidebarGroups

      setCurrentSubSidebarGroups(processedGroups)
    } else {
      setCurrentSubSidebarGroups([])
    }

    setState(prev => ({
      ...prev,
      isSubSidebarVisible: shouldShowSub,
      activeMainItem: activeMain?.url || null,
      activeSubItem: activeSub?.url || null,
      currentContext: routeConfig?.contextTitle || null,
      sidebarMode,
      currentClientId: clientId,
      currentCaseId: caseId,
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

  const setSidebarMode = (mode: SidebarMode) => {
    setState(prev => ({ ...prev, sidebarMode: mode }))
  }

  const setCurrentClient = (clientId: string | null) => {
    setState(prev => ({ ...prev, currentClientId: clientId }))
  }

  const setCurrentCase = (caseId: string | null) => {
    setState(prev => ({ ...prev, currentCaseId: caseId }))
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
    setSidebarMode,
    setCurrentClient,
    setCurrentCase,
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
