import React from "react"
import { View, Text } from "react-native"

export default function ClientsPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Clients</Text>
      <Text className="text-gray-600">
        This page shows the main clients view. Notice how the sub-sidebar appears with 
        CARE HUB and DOCUMENTATION sections when you navigate to this route.
      </Text>
    </View>
  )
}
