"use client"

import React from "react"
import { Slot } from "expo-router"

import { MainSidebar } from "@/components/main-sidebar"
import { SubSidebar } from "@/components/sub-sidebar"
import { ClientSidebar } from "@/components/client-sidebar"
import { CaseSidebar } from "@/components/case-sidebar"
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

function DashboardContent() {
  const { shouldShowSubSidebar, state, setMainSidebarOpen } = useSidebar()
  const breadcrumbs = useBreadcrumbs()

  // Determine which sidebar to show based on mode
  const renderSubSidebar = () => {
    if (!shouldShowSubSidebar) return null

    switch (state.sidebarMode) {
      case 'client':
        return (
          <div className="w-64 border-r border-sidebar-border">
            <ClientSidebar />
          </div>
        )
      case 'case':
        return (
          <div className="w-64 border-r border-sidebar-border">
            <CaseSidebar />
          </div>
        )
      default:
        return (
          <div className="w-64 border-r border-sidebar-border">
            <SubSidebar />
          </div>
        )
    }
  }

  return (
    <UISidebarProvider
      defaultOpen={state.isMainSidebarOpen}
      open={state.isMainSidebarOpen}
      onOpenChange={setMainSidebarOpen}
    >
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        {renderSubSidebar()}
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
              <Slot />
          </main>
        </SidebarInset>
      </div>
    </UISidebarProvider>
  )
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
