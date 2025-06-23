import React from "react"
import { View, Text } from "react-native"

export default function ClientDocumentsPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Client Documents</Text>
      <Text className="text-gray-600">
        This page shows client documents from the DOCUMENTATION section.
        Notice how this is part of the client management context.
      </Text>
    </View>
  )
}
