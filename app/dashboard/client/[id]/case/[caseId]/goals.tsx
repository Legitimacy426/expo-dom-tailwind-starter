import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function GoalsPage() {
  const { id, caseId } = useLocalSearchParams()

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Care Plan Goals</Text>
      <Text className="text-gray-600 mb-2">
        Client ID: {id}
      </Text>
      <Text className="text-gray-600 mb-4">
        Case ID: {caseId}
      </Text>
      <Text className="text-gray-600 mb-4">
        This page shows care plan goals from the CARE SUPPORT & PLANNING section.
        This is part of the comprehensive case management workflow.
      </Text>
      
      <Text className="text-sm text-gray-500">
        This follows the onboarding flow where case managers can set up goals
        after completing the needs assessment and pregnancy/postpartum forms.
      </Text>
    </View>
  )
}
