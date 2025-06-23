import React from "react"
import { View, Text } from "react-native"

export default function CarePage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Care Planning</Text>
      <Text className="text-gray-600">
        This page shows the care planning overview. Notice how the sub-sidebar shows 
        different sections: CARE HUB, CARE SUPPORT & PLANNING, and OTHER.
      </Text>
    </View>
  )
}
