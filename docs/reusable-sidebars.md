# Reusable Sidebar Components

This documentation explains how to use the reusable MainSidebar and SubSidebar components with customizable routes and configurations.

## Overview

The sidebar system consists of:
- **MainSidebar**: Primary navigation sidebar
- **SubSidebar**: Secondary navigation sidebar for sub-sections
- **SidebarContext**: Context for managing sidebar state
- **Utility functions**: Helper functions for creating configurations

## Basic Usage

### 1. Using Default Sidebars (Context-based)

```tsx
import { MainSidebar } from "@/components/main-sidebar"
import { SubSidebar } from "@/components/sub-sidebar"

// Uses navigation items from SidebarContext
function MyLayout() {
  return (
    <div className="flex">
      <MainSidebar />
      <SubSidebar />
      <main>{/* Your content */}</main>
    </div>
  )
}
```

### 2. Using Custom Configurations

```tsx
import { MainSidebar, MainSidebarConfig } from "@/components/main-sidebar"
import { SubSidebar, SubSidebarConfig } from "@/components/sub-sidebar"
import { Home, Users, Settings } from "lucide-react"

const customMainConfig: MainSidebarConfig = {
  title: "My App",
  version: "v1.0.0",
  homeUrl: "/dashboard",
  icon: Home,
  groupLabel: "Navigation",
  navigationItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
      badge: "5",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
}

function CustomLayout() {
  return (
    <div className="flex">
      <MainSidebar config={customMainConfig} />
      <main>{/* Your content */}</main>
    </div>
  )
}
```

## Configuration Options

### MainSidebarConfig

```tsx
interface MainSidebarConfig {
  title: string              // Sidebar title
  version?: string           // Version display (optional)
  homeUrl: string           // Home/logo link URL
  icon: LucideIcon          // Header icon
  groupLabel?: string       // Navigation group label
  navigationItems?: NavigationItem[]  // Navigation items
}
```

### SubSidebarConfig

```tsx
interface SubSidebarConfig {
  title: string             // Sidebar title
  description?: string      // Subtitle/description
  groupLabel?: string       // Navigation group label
  navigationItems?: NavigationItem[]  // Navigation items
  className?: string        // Additional CSS classes
}
```

### NavigationItem

```tsx
interface NavigationItem {
  title: string             // Display name
  url: string              // Route URL
  icon: LucideIcon         // Icon component
  hasSubmenu?: boolean     // Shows chevron indicator
  badge?: string | number  // Badge text/number
  description?: string     // Item description
}
```

## Utility Functions

### Creating Configurations

```tsx
import { createMainSidebarConfig, createSubSidebarConfig, createRoute } from "@/lib/sidebar-utils"
import { Home, Users, Settings } from "lucide-react"

// Create routes
const routes = [
  createRoute("Dashboard", "/dashboard", Home),
  createRoute("Users", "/users", Users, { badge: "New" }),
  createRoute("Settings", "/settings", Settings, { hasSubmenu: true }),
]

// Create main sidebar config
const mainConfig = createMainSidebarConfig(
  {
    title: "My App",
    version: "v1.0.0",
    homeUrl: "/dashboard",
    icon: Home,
    groupLabel: "Navigation"
  },
  routes
)

// Create sub sidebar config
const subConfig = createSubSidebarConfig(
  "User Management",
  "Manage users and permissions",
  [
    createRoute("All Users", "/users", Users),
    createRoute("Roles", "/users/roles", Settings),
  ],
  "User Tools"
)
```

### Dynamic Route Management

```tsx
import { addRoute, removeRoute, updateRoute, addBadgeToRoute } from "@/lib/sidebar-utils"

// Add a new route
const newRoutes = addRoute(existingRoutes, {
  title: "Reports",
  url: "/reports",
  icon: BarChart,
  badge: "New"
})

// Update a route
const updatedRoutes = updateRoute(existingRoutes, "/users", { badge: "5" })

// Add badge to existing route
const routesWithBadge = addBadgeToRoute(existingRoutes, "/notifications", "3")

// Remove a route
const filteredRoutes = removeRoute(existingRoutes, "/old-feature")
```

## Pre-built Examples

### E-commerce Layout

```tsx
import { EcommerceSidebars } from "@/components/sidebar-examples"

function EcommercePage() {
  return (
    <div className="flex">
      <EcommerceSidebars />
      <main>{/* E-commerce content */}</main>
    </div>
  )
}
```

### Admin Panel Layout

```tsx
import { AdminSidebars } from "@/components/sidebar-examples"

function AdminPage() {
  return (
    <div className="flex">
      <AdminSidebars />
      <main>{/* Admin content */}</main>
    </div>
  )
}
```

## Complete Layout Example

```tsx
import { ReusableLayout } from "@/components/reusable-layout-example"

function MyPage() {
  return (
    <ReusableLayout 
      layoutType="ecommerce"
      showSubSidebar={true}
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Products", href: "/products", isActive: true }
      ]}
    >
      <div>
        <h1>My Page Content</h1>
        <p>This content is wrapped in a reusable layout with sidebars.</p>
      </div>
    </ReusableLayout>
  )
}
```

## Context Integration

### Using the Sidebar Context

```tsx
import { useSidebar } from "@/contexts/sidebar-context"

function MyComponent() {
  const { configureSidebars, updateMainNavItems } = useSidebar()

  // Configure both sidebars at once
  const handleConfigureSidebars = () => {
    configureSidebars({
      mainNavItems: [/* your main nav items */],
      subNavItems: [/* your sub nav items */],
    })
  }

  // Update just main navigation
  const handleUpdateMain = () => {
    updateMainNavItems([/* new main nav items */])
  }

  return (
    <div>
      <button onClick={handleConfigureSidebars}>Configure Sidebars</button>
      <button onClick={handleUpdateMain}>Update Main Nav</button>
    </div>
  )
}
```

## Best Practices

1. **Consistent Icons**: Use icons from the same icon library (lucide-react)
2. **Meaningful URLs**: Use descriptive, RESTful URL patterns
3. **Badge Usage**: Use badges sparingly for important notifications
4. **Submenu Indication**: Set `hasSubmenu: true` for items with sub-navigation
5. **Validation**: Use `validateSidebarConfig()` to check configurations
6. **Performance**: Memoize large navigation configurations

## TypeScript Support

All components and utilities are fully typed with TypeScript for better development experience and type safety.
