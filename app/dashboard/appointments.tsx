import React from "react"
import { View, Text } from "react-native"

export default function AppointmentsPage() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Appointments</Text>
      <Text className="text-gray-600">
        This page shows appointments. Like the messages page, this only shows 
        the main sidebar without any sub-sidebar.
      </Text>
    </View>
  )
}
