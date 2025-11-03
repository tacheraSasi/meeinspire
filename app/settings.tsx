import ScreenLayout from "@/components/ScreenLayout";
import { SectionHeader } from "@/components/settings/sectionHeader";
import { SettingItem } from "@/components/settings/settingsItem";
import { useCurrentTheme } from "@/context/CentralTheme";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const SettingsScreen: React.FC = () => {
  const theme = useCurrentTheme();

  return (
    <ScreenLayout>
      <ScrollView style={[styles.container]}>
        <SectionHeader title="About" />

        <SettingItem
          icon="info"
          title="App Version"
          subtitle="1.0.0 (Build 1)"
          onPress={() => {}}
        />

        <SettingItem
          icon="help"
          title="Help & Support"
          subtitle="Get help with the app"
          onPress={() => {}}
          rightElement={
            <Entypo
              name="chevron-right"
              size={20}
              color="#11181C"
              opacity={0.5}
            />
          }
        />

        <SettingItem
          icon="privacy-tip"
          title="Privacy Policy"
          subtitle="Learn about your privacy"
          onPress={() => {}}
          rightElement={
            <Entypo
              name="chevron-right"
              size={20}
              color="#11181C"
              opacity={0.5}
            />
          }
        />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  featuredMix: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  mixMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodCard: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    alignItems: "center",
  },
  mixItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  mixContent: {
    flex: 1,
  },
  mixInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playButton: {
    marginLeft: 12,
  },
  genresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  genreCard: {
    width: (width - 60) / 2,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 12,
  },
});

export default SettingsScreen;
