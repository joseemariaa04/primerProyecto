// app/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#020617",
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: "#6366f1",
          tabBarInactiveTintColor: "#64748b",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ListaTareas"
          options={{
            title: "Tareas",
            tabBarIcon: ({ color }) => (
              <Ionicons name="checkmark-done" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ChatBot"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ElegirImagen"
          options={{
            title: "Fotos",
            tabBarIcon: ({ color }) => (
              <Ionicons name="image" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ListaPeliculas"
          options={{
            title: "Pelis",
            tabBarIcon: ({ color }) => (
              <Ionicons name="videocam-outline" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
