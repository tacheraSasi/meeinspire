import ScreenLayout from "@/components/ScreenLayout";
import { SkeletonItem } from "@/components/SkeletonLoader";
import { useCurrentTheme } from "@/context/CentralTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const PodcastsScreen: React.FC = () => {
  const theme = useCurrentTheme();

  return (
    <ScreenLayout>
      <ScrollView style={[styles.container]}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Ionicons
              name="radio-outline"
              size={32}
              color={theme.primary}
              style={styles.headerIcon}
            />
            <Text style={[styles.title, { color: theme.text }]}>Podcasts</Text>
            <Text style={[styles.subtitle, { color: theme.subtleText }]}>
              Loading your favorite shows...
            </Text>
          </View>
        </View>

        {/* Continue Listening */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Continue Listening
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.continueCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <SkeletonItem
                  width={120}
                  height={120}
                  borderRadius={8}
                  style={{ marginBottom: 12 }}
                />
                <SkeletonItem
                  width="90%"
                  height={16}
                  style={{ marginBottom: 6 }}
                />
                <SkeletonItem
                  width="70%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonItem width="100%" height={8} borderRadius={4} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Now */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Trending Now
          </Text>
          <View
            style={[
              styles.trendingCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <SkeletonItem
              width="100%"
              height={160}
              borderRadius={12}
              style={{ marginBottom: 16 }}
            />
            <SkeletonItem width="85%" height={22} style={{ marginBottom: 8 }} />
            <SkeletonItem
              width="65%"
              height={16}
              style={{ marginBottom: 16 }}
            />
            <View style={styles.podcastMetadata}>
              <SkeletonItem width={100} height={14} />
              <SkeletonItem width={80} height={14} />
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Browse Categories
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
                  width={50}
                  height={50}
                  borderRadius={25}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonItem width="80%" height={14} />
              </View>
            ))}
          </View>
        </View>

        {/* Popular Episodes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Popular Episodes
          </Text>
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.episodeItem,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <SkeletonItem
                width={80}
                height={80}
                borderRadius={8}
                style={{ marginRight: 16 }}
              />
              <View style={styles.episodeContent}>
                <SkeletonItem
                  width="90%"
                  height={16}
                  style={{ marginBottom: 4 }}
                />
                <SkeletonItem
                  width="75%"
                  height={18}
                  style={{ marginBottom: 6 }}
                />
                <SkeletonItem
                  width="60%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <View style={styles.episodeInfo}>
                  <SkeletonItem width={60} height={12} />
                  <SkeletonItem width={80} height={12} />
                </View>
              </View>
              <View style={styles.playButton}>
                <SkeletonItem width={40} height={40} borderRadius={20} />
              </View>
            </View>
          ))}
        </View>

        {/* Your Subscriptions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Your Subscriptions
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.subscriptionCard,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <SkeletonItem
                  width={100}
                  height={100}
                  borderRadius={8}
                  style={{ marginBottom: 12 }}
                />
                <SkeletonItem
                  width="85%"
                  height={16}
                  style={{ marginBottom: 6 }}
                />
                <SkeletonItem
                  width="70%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <SkeletonItem width={60} height={12} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recommended for You
          </Text>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.recommendationItem,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <SkeletonItem
                width={70}
                height={70}
                borderRadius={8}
                style={{ marginRight: 16 }}
              />
              <View style={styles.recommendationContent}>
                <SkeletonItem
                  width="85%"
                  height={18}
                  style={{ marginBottom: 6 }}
                />
                <SkeletonItem
                  width="70%"
                  height={14}
                  style={{ marginBottom: 8 }}
                />
                <View style={styles.recommendationInfo}>
                  <SkeletonItem width={80} height={12} />
                  <SkeletonItem width={60} height={12} />
                </View>
              </View>
              <SkeletonItem width={36} height={36} borderRadius={18} />
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
  continueCard: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  trendingCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  podcastMetadata: {
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
  episodeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  episodeContent: {
    flex: 1,
  },
  episodeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playButton: {
    marginLeft: 12,
  },
  subscriptionCard: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    alignItems: "center",
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PodcastsScreen;
