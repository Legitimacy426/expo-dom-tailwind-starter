import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function SupportNeedsPage() {
  const { id, caseId } = useLocalSearchParams()

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Support Needs</Text>
      <Text className="text-gray-600 mb-2">
        Client ID: {id}
      </Text>
      <Text className="text-gray-600 mb-4">
        Case ID: {caseId}
      </Text>
      <Text className="text-gray-600 mb-4">
        This page shows support needs from the CARE SUPPORT & PLANNING section.
        This demonstrates the full case management context with comprehensive care planning tools.
      </Text>
      
      <Text className="text-sm text-gray-500">
        This follows the flow from flows.txt where case managers can:
        - View existing support needs
        - Update existing needs with comments and stage updates
        - Create new support needs with categories and specific needs
      </Text>
    </View>
  )
}
