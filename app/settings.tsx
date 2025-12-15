import ScreenLayout from "@/components/ScreenLayout";
import { SectionHeader } from "@/components/settings/sectionHeader";
import { SettingItem } from "@/components/settings/settingsItem";
import { useCurrentTheme } from "@/context/CentralTheme";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet } from "react-native";
import { clearQuotesCache } from "@/lib/quotesApi";
import { clearFavorites } from "@/lib/favoritesStorage";

const { width } = Dimensions.get("window");

const SettingsScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const [clearing, setClearing] = useState(false);

  const handleClearCache = async () => {
    Alert.alert(
      "Clear Cache",
      "This will clear all cached quotes and you'll need to download them again. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              setClearing(true);
              await clearQuotesCache();
              Alert.alert("Success", "Cache cleared successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to clear cache");
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  };

  const handleClearFavorites = async () => {
    Alert.alert(
      "Clear Favorites",
      "This will remove all your favorite quotes. This action cannot be undone. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearFavorites();
              Alert.alert("Success", "Favorites cleared successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to clear favorites");
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenLayout>
      <ScrollView style={[styles.container]}>
        <SectionHeader title="Data Management" />

        <SettingItem
          icon="cached"
          title="Clear Cache"
          subtitle="Remove cached quotes to free up space"
          onPress={handleClearCache}
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
          icon="favorite-border"
          title="Clear Favorites"
          subtitle="Remove all favorite quotes"
          onPress={handleClearFavorites}
          rightElement={
            <Entypo
              name="chevron-right"
              size={20}
              color="#11181C"
              opacity={0.5}
            />
          }
        />

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
    paddingHorizontal:20,
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
