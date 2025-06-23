import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function ClientPage() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Client Overview</Text>
      <Text className="text-gray-600 mb-4">
        Client ID: {id}
      </Text>
      <Text className="text-gray-600">
        This is the Client Management view (light blue sidebar). 
        You can see the CARE HUB and DOCUMENTATION sections in the sidebar.
        This represents the second sidebar level in the three-sidebar system.
      </Text>
    </View>
  )
}
