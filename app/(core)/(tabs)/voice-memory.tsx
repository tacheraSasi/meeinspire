import ScreenLayout from "@/components/ScreenLayout";
import { SkeletonItem } from "@/components/SkeletonLoader";
import { useCurrentTheme } from "@/context/CentralTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const VoiceMemoryCapsulesScreen: React.FC = () => {
  const theme = useCurrentTheme();

  return (
    <ScreenLayout>
      <ScrollView style={[styles.container]}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Ionicons
              name="mic-outline"
              size={32}
              color={theme.primary}
              style={styles.headerIcon}
            />
            <Text style={[styles.title, { color: theme.text }]}>
              Voice Memory Capsules
            </Text>
            <Text style={[styles.subtitle, { color: theme.subtleText }]}>
              Loading your audio memories...
            </Text>
          </View>
        </View>
        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Memory Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.categoryCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <SkeletonItem
                  width={40}
                  height={40}
                  borderRadius={20}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonItem width="80%" height={14} />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Capsules Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Capsules
          </Text>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.capsuleItem,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <SkeletonItem
                width={60}
                height={60}
                borderRadius={30}
                style={{ marginRight: 12 }}
              />
              <View style={styles.capsuleContent}>
                <SkeletonItem
                  width="80%"
                  height={18}
                  style={{ marginBottom: 6 }}
                />
                <SkeletonItem
                  width="60%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <View style={styles.capsuleInfo}>
                  <SkeletonItem width={80} height={12} />
                  <SkeletonItem width={50} height={12} />
                </View>
              </View>
              <SkeletonItem width={40} height={40} borderRadius={20} />
            </View>
          ))}
        </View>
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
  featuredCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  capsuleMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  capsuleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  capsuleContent: {
    flex: 1,
  },
  capsuleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 12,
  },
});

export default VoiceMemoryCapsulesScreen;
