import React from "react"
import { View, Text } from "react-native"

export default function MessagesPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Messages</Text>
      <Text className="text-gray-600">
        This page shows messages. Notice how there's no sub-sidebar here - 
        only the main sidebar is visible for this route.
      </Text>
    </View>
  )
}
