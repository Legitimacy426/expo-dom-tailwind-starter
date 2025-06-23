import React from "react"
import { View, Text } from "react-native"

export default function ClientsProfilePage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Clients Profile</Text>
      <Text className="text-gray-600">
        This is the Clients Profile page from the CARE HUB section of the sub-sidebar.
        You can see how the sub-sidebar context changes based on the route.
      </Text>
    </View>
  )
}
