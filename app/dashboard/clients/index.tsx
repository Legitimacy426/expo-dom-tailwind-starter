import React from "react"
import { View, Text } from "react-native"
import { Link } from "expo-router"
import { Button } from "@/components/ui/button"

export default function ClientsListPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Clients List</Text>
      <Text className="text-gray-600 mb-6">
        This is the main clients list page. From here you can select a client to enter
        the client management context (second sidebar level).
      </Text>

      <View className="space-y-4">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/client/demo-client">
            <Text>Demo Client - Jane Doe</Text>
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/client/client-2">
            <Text>Client 2 - Mary Smith</Text>
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/client/client-3">
            <Text>Client 3 - Sarah Johnson</Text>
          </Link>
        </Button>
      </View>

      <Text className="text-sm text-gray-500 mt-6">
        Click on any client to see the Client Management sidebar (light blue) with CARE HUB and DOCUMENTATION sections.
      </Text>
    </View>
  )
}
