"use client"

import React from "react"
import { MainSidebar, MainSidebarConfig } from "@/components/main-sidebar"
import { SubSidebar, SubSidebarConfig } from "@/components/sub-sidebar"
import { SidebarProvider as UISidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Folder,
  Star,
  Clock,
  Database,
  CreditCard
} from "lucide-react"
import { createMainSidebarConfig, createSubSidebarConfig, createRoute } from "@/lib/sidebar-utils"

// Example: E-commerce layout with custom sidebars
interface ReusableLayoutProps {
  children: React.ReactNode
  layoutType?: 'ecommerce' | 'admin' | 'dashboard' | 'custom'
  customMainConfig?: MainSidebarConfig
  customSubConfig?: SubSidebarConfig
  showSubSidebar?: boolean
  breadcrumbs?: Array<{ title: string; href: string; isActive?: boolean }>
}

export function ReusableLayout({ 
  children, 
  layoutType = 'dashboard',
  customMainConfig,
  customSubConfig,
  showSubSidebar = false,
  breadcrumbs = []
}: ReusableLayoutProps) {
  
  // Get configuration based on layout type
  const getMainConfig = (): MainSidebarConfig => {
    if (customMainConfig) return customMainConfig

    switch (layoutType) {
      case 'ecommerce':
        return createMainSidebarConfig(
          {
            title: "E-Commerce",
            version: "v2.1.0",
            homeUrl: "/ecommerce",
            icon: ShoppingCart,
            groupLabel: "Store Management"
          },
          [
            createRoute("Dashboard", "/ecommerce", Home),
            createRoute("Products", "/ecommerce/products", Package, { hasSubmenu: true, badge: "12" }),
            createRoute("Orders", "/ecommerce/orders", ShoppingCart, { badge: "New" }),
            createRoute("Customers", "/ecommerce/customers", Users),
            createRoute("Analytics", "/ecommerce/analytics", BarChart3),
            createRoute("Settings", "/ecommerce/settings", Settings),
          ]
        )

      case 'admin':
        return createMainSidebarConfig(
          {
            title: "Admin Panel",
            version: "v1.5.0",
            homeUrl: "/admin",
            icon: Settings,
            groupLabel: "Administration"
          },
          [
            createRoute("Dashboard", "/admin", Home),
            createRoute("Users", "/admin/users", Users, { hasSubmenu: true }),
            createRoute("Content", "/admin/content", Package),
            createRoute("Analytics", "/admin/analytics", BarChart3),
            createRoute("Settings", "/admin/settings", Settings),
          ]
        )

      default: // dashboard
        return createMainSidebarConfig(
          {
            title: "Dashboard",
            version: "v1.0.0",
            homeUrl: "/dashboard",
            icon: Home,
            groupLabel: "Navigation"
          },
          [
            createRoute("Dashboard", "/dashboard", Home),
            createRoute("Analytics", "/dashboard/analytics", BarChart3),
            createRoute("Projects", "/dashboard/projects", Folder, { hasSubmenu: true }),
            createRoute("Users", "/dashboard/users", Users),
            createRoute("Settings", "/dashboard/settings", Settings),
          ]
        )
    }
  }

  const getSubConfig = (): SubSidebarConfig => {
    if (customSubConfig) return customSubConfig

    switch (layoutType) {
      case 'ecommerce':
        return createSubSidebarConfig(
          "Product Management",
          "Manage your inventory and catalog",
          [
            createRoute("All Products", "/ecommerce/products", Package),
            createRoute("Categories", "/ecommerce/products/categories", Folder),
            createRoute("Inventory", "/ecommerce/products/inventory", Database, { badge: "Low" }),
            createRoute("Pricing", "/ecommerce/products/pricing", CreditCard),
            createRoute("Reviews", "/ecommerce/products/reviews", Star, { badge: "5" }),
          ],
          "Product Tools"
        )

      case 'admin':
        return createSubSidebarConfig(
          "User Management",
          "Manage users and permissions",
          [
            createRoute("All Users", "/admin/users", Users),
            createRoute("Roles", "/admin/users/roles", Settings),
            createRoute("Permissions", "/admin/users/permissions", Settings),
            createRoute("Activity", "/admin/users/activity", Clock),
          ],
          "User Tools"
        )

      default: // dashboard
        return createSubSidebarConfig(
          "Project Tools",
          "Manage your projects and tasks",
          [
            createRoute("Overview", "/dashboard/projects", Folder),
            createRoute("Active", "/dashboard/projects/active", Clock),
            createRoute("Completed", "/dashboard/projects/completed", Star),
            createRoute("Archive", "/dashboard/projects/archive", Package),
          ],
          "Quick Access"
        )
    }
  }

  const mainConfig = getMainConfig()
  const subConfig = getSubConfig()

  return (
    <UISidebarProvider>
      <div className="flex min-h-screen w-full">
        <MainSidebar config={mainConfig} />
        
        {showSubSidebar && (
          <div className="w-64 border-r border-sidebar-border">
            <SubSidebar config={subConfig} />
          </div>
        )}
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.href}>
                      <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                        {breadcrumb.isActive ? (
                          <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.title}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </header>
          
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </UISidebarProvider>
  )
}

// Example usage components
export function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReusableLayout 
      layoutType="ecommerce" 
      showSubSidebar={true}
      breadcrumbs={[
        { title: "E-commerce", href: "/ecommerce" },
        { title: "Products", href: "/ecommerce/products", isActive: true }
      ]}
    >
      {children}
    </ReusableLayout>
  )
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReusableLayout 
      layoutType="admin" 
      showSubSidebar={true}
      breadcrumbs={[
        { title: "Admin", href: "/admin" },
        { title: "Users", href: "/admin/users", isActive: true }
      ]}
    >
      {children}
    </ReusableLayout>
  )
}

export function CustomLayout({ 
  children,
  mainConfig,
  subConfig,
  showSub = false
}: { 
  children: React.ReactNode
  mainConfig: MainSidebarConfig
  subConfig?: SubSidebarConfig
  showSub?: boolean
}) {
  return (
    <ReusableLayout 
      layoutType="custom"
      customMainConfig={mainConfig}
      customSubConfig={subConfig}
      showSubSidebar={showSub}
    >
      {children}
    </ReusableLayout>
  )
}
