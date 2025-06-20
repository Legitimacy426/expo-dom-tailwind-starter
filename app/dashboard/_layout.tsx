"use client"

import React from "react"

import { MainSidebar } from "@/components/main-sidebar"
import { SubSidebar } from "@/components/sub-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "expo-router"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showSubSidebar = pathname.startsWith("/dashboard/sub-menu")

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    if (segments.length > 1) {
      breadcrumbs.push({ title: "Dashboard", href: "/dashboard" })

      if (segments[1] === "sub-menu") {
        breadcrumbs.push({ title: "Sub Menu", href: "/dashboard/sub-menu" })
        if (segments[2]) {
          breadcrumbs.push({
            title: segments[2].charAt(0).toUpperCase() + segments[2].slice(1),
            href: pathname,
            isActive: true,
          })
        }
      } else {
        breadcrumbs.push({
          title: segments[1].charAt(0).toUpperCase() + segments[1].slice(1),
          href: pathname,
          isActive: true,
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        {showSubSidebar && (
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
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
