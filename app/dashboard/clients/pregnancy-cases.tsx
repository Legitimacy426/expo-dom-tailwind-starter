import React from "react"
import { View, Text } from "react-native"

export default function PregnancyCasesPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Pregnancy Cases</Text>
      <Text className="text-gray-600">
        This page shows pregnancy cases from the CARE HUB section.
        The sub-sidebar provides contextual navigation for client management.
      </Text>
    </View>
  )
}
