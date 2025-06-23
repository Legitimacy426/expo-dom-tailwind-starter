import React from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams, Link } from "expo-router"
import { Button } from "@/components/ui/button"

export default function ClientProfilePage() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Client Profile</Text>
      <Text className="text-gray-600 mb-4">
        Client ID: {id}
      </Text>
      <Text className="text-gray-600 mb-6">
        This is the Client Profile page from the CARE HUB section.
        From here, you can add a new case to enter the full case management context.
      </Text>
      
      <Button asChild className="mb-4">
        <Link href={`/dashboard/client/${id}/case/new-case`}>
          Add New Case
        </Link>
      </Button>
      
      <Text className="text-sm text-gray-500">
        Click "Add New Case" to see the third sidebar level with full care planning tools.
      </Text>
    </View>
  )
}
