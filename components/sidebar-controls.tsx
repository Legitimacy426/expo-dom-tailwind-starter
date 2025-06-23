"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSidebar, useMainSidebar, useSubSidebar } from "@/contexts/sidebar-context"
import { Plus, Settings, Bell } from "lucide-react"

/**
 * Example component demonstrating how to use the sidebar context
 * This shows how to:
 * - Access sidebar state
 * - Update navigation items dynamically
 * - Add badges to menu items
 * - Control sidebar visibility
 */
export function SidebarControls() {
  const { state, updateMainNavItems, updateSubNavItems } = useSidebar()
  const { items: mainItems } = useMainSidebar()
  const { items: subItems } = useSubSidebar()

  const addBadgeToAnalytics = () => {
    const updatedItems = mainItems.map(item => 
      item.title === "Analytics" 
        ? { ...item, badge: "3" }
        : item
    )
    updateMainNavItems(updatedItems)
  }

  const addBadgeToProjects = () => {
    const updatedItems = subItems.map(item => 
      item.title === "Projects" 
        ? { ...item, badge: "12" }
        : item
    )
    updateSubNavItems(updatedItems)
  }

  const addNewMainNavItem = () => {
    const newItem = {
      title: "Reports",
      url: "/dashboard/reports",
      icon: Bell,
      badge: "New"
    }
    updateMainNavItems([...mainItems, newItem])
  }

  const addNewSubNavItem = () => {
    const newItem = {
      title: "Templates",
      url: "/dashboard/sub-menu/templates",
      icon: Plus,
      description: "Manage templates"
    }
    updateSubNavItems([...subItems, newItem])
  }

  const clearBadges = () => {
    const clearedMainItems = mainItems.map(item => ({ ...item, badge: undefined }))
    const clearedSubItems = subItems.map(item => ({ ...item, badge: undefined }))
    updateMainNavItems(clearedMainItems)
    updateSubNavItems(clearedSubItems)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Sidebar Controls
        </CardTitle>
        <CardDescription>
          Demonstrate dynamic sidebar management using the context
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current State Display */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Current State</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              Main Sidebar: {state.isMainSidebarOpen ? "Open" : "Closed"}
            </Badge>
            <Badge variant="outline">
              Sub Sidebar: {state.isSubSidebarVisible ? "Visible" : "Hidden"}
            </Badge>
            <Badge variant="outline">
              Active Main: {state.activeMainItem || "None"}
            </Badge>
            <Badge variant="outline">
              Active Sub: {state.activeSubItem || "None"}
            </Badge>
          </div>
        </div>

        {/* Badge Controls */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Add Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={addBadgeToAnalytics}>
              Add Badge to Analytics
            </Button>
            <Button size="sm" variant="outline" onClick={addBadgeToProjects}>
              Add Badge to Projects
            </Button>
            <Button size="sm" variant="outline" onClick={clearBadges}>
              Clear All Badges
            </Button>
          </div>
        </div>

        {/* Add New Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Add New Items</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={addNewMainNavItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Reports to Main
            </Button>
            <Button size="sm" variant="outline" onClick={addNewSubNavItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Templates to Sub
            </Button>
          </div>
        </div>

        {/* Current Items Count */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Navigation Items</h3>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Main Items: {mainItems.length}</span>
            <span>Sub Items: {subItems.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
