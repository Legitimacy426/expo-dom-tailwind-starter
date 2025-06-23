"use client"

import React from "react"

import { MainSidebar } from "@/components/main-sidebar"
import { SubSidebar } from "@/components/sub-sidebar"
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
import { SidebarProvider, useSidebar, useBreadcrumbs } from "@/contexts/sidebar-context"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { shouldShowSubSidebar } = useSidebar()
  const breadcrumbs = useBreadcrumbs()

  console.log("🔍 DashboardContent rendering", { shouldShowSubSidebar, breadcrumbs }) // Debug log

  return (
    <UISidebarProvider>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        {shouldShowSubSidebar && (
          <div className="w-64 border-r border-sidebar-border">
            <SubSidebar />
          </div>
        )}
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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
          </header>
          <main className="flex-1 p-6">
            {/* Debug: Test if main content area is visible */}
            <div className="mb-4 p-2 bg-green-100 border border-green-300 rounded">
              <p className="text-green-800">✅ Layout: Main content area is rendering</p>
            </div>
            {children}
          </main>
        </SidebarInset>
      </div>
    </UISidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
