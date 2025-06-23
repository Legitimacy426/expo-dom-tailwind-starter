"use client"

import { 
  Home, 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  ShoppingCart, 
  Package, 
  Truck, 
  CreditCard,
  Calendar,
  Clock,
  Star,
  Folder,
  Database,
  Shield,
  Bell,
  Mail,
  MessageSquare,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus
} from "lucide-react"
import { MainSidebar, MainSidebarConfig } from "./main-sidebar"
import { SubSidebar, SubSidebarConfig } from "./sub-sidebar"
import { NavigationItem } from "@/contexts/sidebar-context"

// Example 1: E-commerce Dashboard Configuration
export const ecommerceMainConfig: MainSidebarConfig = {
  title: "E-Commerce",
  version: "v2.1.0",
  homeUrl: "/ecommerce",
  icon: ShoppingCart,
  groupLabel: "Store Management",
  navigationItems: [
    {
      title: "Dashboard",
      url: "/ecommerce",
      icon: Home,
    },
    {
      title: "Products",
      url: "/ecommerce/products",
      icon: Package,
      hasSubmenu: true,
      badge: "12",
    },
    {
      title: "Orders",
      url: "/ecommerce/orders",
      icon: ShoppingCart,
      badge: "New",
    },
    {
      title: "Shipping",
      url: "/ecommerce/shipping",
      icon: Truck,
    },
    {
      title: "Payments",
      url: "/ecommerce/payments",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      url: "/ecommerce/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "/ecommerce/settings",
      icon: Settings,
    },
  ]
}

export const ecommerceSubConfig: SubSidebarConfig = {
  title: "Product Management",
  description: "Manage your inventory and catalog",
  groupLabel: "Product Tools",
  navigationItems: [
    {
      title: "All Products",
      url: "/ecommerce/products",
      icon: Package,
    },
    {
      title: "Categories",
      url: "/ecommerce/products/categories",
      icon: Folder,
    },
    {
      title: "Inventory",
      url: "/ecommerce/products/inventory",
      icon: Database,
      badge: "Low",
    },
    {
      title: "Pricing",
      url: "/ecommerce/products/pricing",
      icon: CreditCard,
    },
    {
      title: "Reviews",
      url: "/ecommerce/products/reviews",
      icon: Star,
      badge: "5",
    },
  ]
}

// Example 2: Admin Panel Configuration
export const adminMainConfig: MainSidebarConfig = {
  title: "Admin Panel",
  version: "v1.5.2",
  homeUrl: "/admin",
  icon: Shield,
  groupLabel: "Administration",
  navigationItems: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      hasSubmenu: true,
    },
    {
      title: "Content",
      url: "/admin/content",
      icon: FileText,
      hasSubmenu: true,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Notifications",
      url: "/admin/notifications",
      icon: Bell,
      badge: "3",
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ]
}

export const adminSubConfig: SubSidebarConfig = {
  title: "User Management",
  description: "Manage users and permissions",
  groupLabel: "User Tools",
  navigationItems: [
    {
      title: "All Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Roles",
      url: "/admin/users/roles",
      icon: Shield,
    },
    {
      title: "Permissions",
      url: "/admin/users/permissions",
      icon: Settings,
    },
    {
      title: "Activity Log",
      url: "/admin/users/activity",
      icon: Clock,
    },
    {
      title: "Invitations",
      url: "/admin/users/invitations",
      icon: Mail,
      badge: "2",
    },
  ]
}

// Example 3: Communication App Configuration
export const communicationMainConfig: MainSidebarConfig = {
  title: "ChatApp",
  version: "v3.0.0",
  homeUrl: "/chat",
  icon: MessageSquare,
  groupLabel: "Communication",
  navigationItems: [
    {
      title: "Messages",
      url: "/chat/messages",
      icon: MessageSquare,
      badge: "12",
    },
    {
      title: "Channels",
      url: "/chat/channels",
      icon: Folder,
      hasSubmenu: true,
    },
    {
      title: "Contacts",
      url: "/chat/contacts",
      icon: Users,
    },
    {
      title: "Calendar",
      url: "/chat/calendar",
      icon: Calendar,
    },
    {
      title: "Files",
      url: "/chat/files",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/chat/settings",
      icon: Settings,
    },
  ]
}

export const communicationSubConfig: SubSidebarConfig = {
  title: "Channel Management",
  description: "Organize your conversations",
  groupLabel: "Channels",
  navigationItems: [
    {
      title: "General",
      url: "/chat/channels/general",
      icon: MessageSquare,
    },
    {
      title: "Projects",
      url: "/chat/channels/projects",
      icon: Folder,
    },
    {
      title: "Random",
      url: "/chat/channels/random",
      icon: Star,
    },
    {
      title: "Announcements",
      url: "/chat/channels/announcements",
      icon: Bell,
      badge: "New",
    },
    {
      title: "Archive",
      url: "/chat/channels/archive",
      icon: Clock,
    },
  ]
}

// Example Components using the configurations
export function EcommerceSidebars() {
  return (
    <>
      <MainSidebar config={ecommerceMainConfig} />
      <SubSidebar config={ecommerceSubConfig} />
    </>
  )
}

export function AdminSidebars() {
  return (
    <>
      <MainSidebar config={adminMainConfig} />
      <SubSidebar config={adminSubConfig} />
    </>
  )
}

export function CommunicationSidebars() {
  return (
    <>
      <MainSidebar config={communicationMainConfig} />
      <SubSidebar config={communicationSubConfig} />
    </>
  )
}

// Default sidebars (using context)
export function DefaultSidebars() {
  return (
    <>
      <MainSidebar />
      <SubSidebar />
    </>
  )
}
