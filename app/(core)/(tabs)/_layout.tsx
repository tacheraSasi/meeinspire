import Colors from "@/constants/Colors";
import { ThemeStatusBar, useCurrentTheme } from "@/context/CentralTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  const color =
    props.color.split(",")[
      Math.floor(Math.random() * props.color.split(",").length)
    ];
  return (
    <FontAwesome
      size={26}
      style={{ marginBottom: -3 }}
      name={props.name}
      color={color}
    />
  );
}

export default function TabsLayout() {
  const theme = useCurrentTheme();

  return (
    <>
      <ThemeStatusBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabBarActive,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colorScheme === "dark" ? "#000" : "#fff",
            borderTopWidth: 0.5,
            borderTopColor: "rgba(0, 0, 0, 0.16)",
            paddingVertical: 20,
            height: 85,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="feed"
          options={{
            title: "Listen",
            // tabBarBadge: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="headphones" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="align-left" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="voice-memory"
          options={{
            title: "Memories",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="microphone" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "Me",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
