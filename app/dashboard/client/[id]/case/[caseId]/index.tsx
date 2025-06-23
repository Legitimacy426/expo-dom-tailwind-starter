import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function CasePage() {
  const { id, caseId } = useLocalSearchParams()

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Case Management</Text>
      <Text className="text-gray-600 mb-2">
        Client ID: {id}
      </Text>
      <Text className="text-gray-600 mb-4">
        Case ID: {caseId}
      </Text>
      <Text className="text-gray-600">
        This is the full Case Management view (light blue sidebar with more content). 
        You can see the expanded sidebar with CARE HUB, CARE SUPPORT & PLANNING, and OTHER sections.
        This represents the third and most comprehensive sidebar level in the three-sidebar system.
      </Text>
    </View>
  )
}
