import { LucideIcon } from "lucide-react"
import { NavigationItem } from "@/contexts/sidebar-context"
import { MainSidebarConfig } from "@/components/main-sidebar"
import { SubSidebarConfig } from "@/components/sub-sidebar"

/**
 * Utility functions for creating and managing sidebar configurations
 */

export interface SidebarRoute {
  title: string
  url: string
  icon: LucideIcon
  hasSubmenu?: boolean
  badge?: string | number
  description?: string
}

export interface SidebarTheme {
  title: string
  version?: string
  homeUrl: string
  icon: LucideIcon
  groupLabel?: string
}

/**
 * Create a main sidebar configuration
 */
export function createMainSidebarConfig(
  theme: SidebarTheme,
  routes: SidebarRoute[]
): MainSidebarConfig {
  return {
    title: theme.title,
    version: theme.version,
    homeUrl: theme.homeUrl,
    icon: theme.icon,
    groupLabel: theme.groupLabel || "Navigation",
    navigationItems: routes.map(route => ({
      title: route.title,
      url: route.url,
      icon: route.icon,
      hasSubmenu: route.hasSubmenu,
      badge: route.badge,
      description: route.description,
    }))
  }
}

/**
 * Create a sub sidebar configuration
 */
export function createSubSidebarConfig(
  title: string,
  description: string,
  routes: SidebarRoute[],
  groupLabel?: string,
  className?: string
): SubSidebarConfig {
  return {
    title,
    description,
    groupLabel: groupLabel || "Quick Access",
    className,
    navigationItems: routes.map(route => ({
      title: route.title,
      url: route.url,
      icon: route.icon,
      hasSubmenu: route.hasSubmenu,
      badge: route.badge,
      description: route.description,
    }))
  }
}

/**
 * Add a badge to a navigation item
 */
export function addBadgeToRoute(
  routes: NavigationItem[],
  routeUrl: string,
  badge: string | number
): NavigationItem[] {
  return routes.map(route => 
    route.url === routeUrl 
      ? { ...route, badge }
      : route
  )
}

/**
 * Remove a badge from a navigation item
 */
export function removeBadgeFromRoute(
  routes: NavigationItem[],
  routeUrl: string
): NavigationItem[] {
  return routes.map(route => 
    route.url === routeUrl 
      ? { ...route, badge: undefined }
      : route
  )
}

/**
 * Update a route's properties
 */
export function updateRoute(
  routes: NavigationItem[],
  routeUrl: string,
  updates: Partial<NavigationItem>
): NavigationItem[] {
  return routes.map(route => 
    route.url === routeUrl 
      ? { ...route, ...updates }
      : route
  )
}

/**
 * Add a new route to the navigation
 */
export function addRoute(
  routes: NavigationItem[],
  newRoute: NavigationItem,
  position?: number
): NavigationItem[] {
  if (position !== undefined) {
    const newRoutes = [...routes]
    newRoutes.splice(position, 0, newRoute)
    return newRoutes
  }
  return [...routes, newRoute]
}

/**
 * Remove a route from the navigation
 */
export function removeRoute(
  routes: NavigationItem[],
  routeUrl: string
): NavigationItem[] {
  return routes.filter(route => route.url !== routeUrl)
}

/**
 * Reorder routes
 */
export function reorderRoutes(
  routes: NavigationItem[],
  fromIndex: number,
  toIndex: number
): NavigationItem[] {
  const newRoutes = [...routes]
  const [removed] = newRoutes.splice(fromIndex, 1)
  newRoutes.splice(toIndex, 0, removed)
  return newRoutes
}

/**
 * Filter routes based on user permissions or conditions
 */
export function filterRoutes(
  routes: NavigationItem[],
  filterFn: (route: NavigationItem) => boolean
): NavigationItem[] {
  return routes.filter(filterFn)
}

/**
 * Group routes by a property
 */
export function groupRoutes(
  routes: NavigationItem[],
  groupBy: keyof NavigationItem
): Record<string, NavigationItem[]> {
  return routes.reduce((groups, route) => {
    const key = String(route[groupBy] || 'default')
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(route)
    return groups
  }, {} as Record<string, NavigationItem[]>)
}

/**
 * Create a route with common patterns
 */
export function createRoute(
  title: string,
  url: string,
  icon: LucideIcon,
  options?: {
    hasSubmenu?: boolean
    badge?: string | number
    description?: string
  }
): SidebarRoute {
  return {
    title,
    url,
    icon,
    hasSubmenu: options?.hasSubmenu,
    badge: options?.badge,
    description: options?.description,
  }
}

/**
 * Validate sidebar configuration
 */
export function validateSidebarConfig(config: MainSidebarConfig | SubSidebarConfig): boolean {
  if (!config.title || config.title.trim() === '') {
    console.error('Sidebar config must have a title')
    return false
  }

  if ('navigationItems' in config && config.navigationItems) {
    for (const item of config.navigationItems) {
      if (!item.title || !item.url || !item.icon) {
        console.error('Navigation item must have title, url, and icon', item)
        return false
      }
    }
  }

  return true
}

/**
 * Merge two sidebar configurations
 */
export function mergeSidebarConfigs(
  baseConfig: MainSidebarConfig,
  overrideConfig: Partial<MainSidebarConfig>
): MainSidebarConfig {
  return {
    ...baseConfig,
    ...overrideConfig,
    navigationItems: overrideConfig.navigationItems || baseConfig.navigationItems,
  }
}
