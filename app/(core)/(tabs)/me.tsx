import AvatarModal from "@/components/AvatarModal";
import ScreenLayout from "@/components/ScreenLayout";
import MePageSkeleton from "@/components/skeletons/MePageSkeleton";
import { useCurrentTheme } from "@/context/CentralTheme";
import Api from "@/lib/api";
import { User } from "@/lib/api/types";
import { HapticFeedback } from "@/lib/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  description,
}) => {
  const theme = useCurrentTheme();

  return (
    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.statHeader}>
        <View
          style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}
        >
          <MaterialIcons name={icon as any} size={20} color={color} />
        </View>
        <Text style={[styles.statValue, { color: theme.text }]}>
          {value.toLocaleString()}
        </Text>
      </View>
      <Text style={[styles.statTitle, { color: theme.text }]}>{title}</Text>
      {description && (
        <Text style={[styles.statDescription, { color: theme.subtleText }]}>
          {description}
        </Text>
      )}
    </View>
  );
};

interface SocialLinkProps {
  platform: string;
  username?: string;
  url?: string;
  iconName: string;
  color: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  username,
  url,
  iconName,
  color,
}) => {
  const theme = useCurrentTheme();

  if (!username && !url) return null;

  const handlePress = () => {
    Alert.alert(
      `Open ${platform}`,
      `Would you like to visit ${username || url}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open", style: "default" },
      ]
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.socialLink,
        {
          backgroundColor: theme.cardBackground,
          borderColor: `${color}20`,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      onPress={handlePress}
    >
      <View style={[styles.socialIcon, { backgroundColor: `${color}10` }]}>
        <Ionicons name={iconName as any} size={18} color={color} />
      </View>
      <View style={styles.socialContent}>
        <Text style={[styles.socialPlatform, { color: theme.text }]}>
          {platform}
        </Text>
        <Text style={[styles.socialText, { color: theme.subtleText }]}>
          {username || url}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={theme.mutedText} />
    </Pressable>
  );
};

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, iconColor }) => {
  const theme = useCurrentTheme();

  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <MaterialIcons
          name={icon as any}
          size={20}
          color={iconColor || theme.primary}
        />
        <Text style={[styles.infoLabel, { color: theme.subtleText }]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

export default function Profile() {
  const theme = useCurrentTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await Api.getCurrentUser();
      console.log("User data:", response);

      const userData = response.data || response;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      Alert.alert("Error", "Failed to load profile data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <MePageSkeleton />;
  }

  if (!user) {
    return (
      <ScreenLayout>
        <View style={[styles.centerContainer, ,]}>
          <View style={styles.errorContent}>
            <MaterialIcons
              name="error-outline"
              size={64}
              color={theme.mutedText}
            />
            <Text style={[styles.errorTitle, { color: theme.text }]}>
              Profile Unavailable
            </Text>
            <Text
              style={[styles.errorDescription, { color: theme.subtleText }]}
            >
              We couldn't load your profile information. Please check your
              connection and try again.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.retryButton,
                {
                  backgroundColor: theme.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={fetchUserData}
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView
        style={[
          styles.container,
          //
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Enhanced Profile Header */}
        <View
          style={[styles.header, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.avatarSection}>
            <Pressable
              style={({ pressed }) => [
                styles.avatarContainer,
                {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
              onPress={() => {
                HapticFeedback("light")
                setAvatarModalVisible(true);
              }}
            >
              <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
              <View
                style={[styles.statusIndicator, { backgroundColor: "#4CAF50" }]}
              />
            </Pressable>

            <View style={styles.userMainInfo}>
              <Text style={[styles.userName, { color: theme.text }]}>
                {user.display_name || user.name}
              </Text>
              {user.display_name && (
                <Text style={[styles.userHandle, { color: theme.subtleText }]}>
                  @{user.name.toLowerCase().replace(/\s+/g, "")}
                </Text>
              )}
              <Text style={[styles.userEmail, { color: theme.mutedText }]}>
                {user.email}
              </Text>

              {/* Enhanced Status Badge */}
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: user.is_active ? "#4CAF50" : "#F44336" },
                  ]}
                />
                <Text style={[styles.statusText, { color: theme.subtleText }]}>
                  {user.is_active ? "Online" : "Offline"} •{" "}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            {/* <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                {
                  backgroundColor: `${theme.primary}15`,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color={theme.primary}
              />
            </Pressable> */}
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                {
                  backgroundColor: `${theme.primary}15`,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => router.push("/(core)/profile/edit")}
            >
              <Ionicons name="create-outline" size={22} color={theme.primary} />
            </Pressable>
          </View>
        </View>

        {/* Enhanced Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Activity Overview
            </Text>
            <MaterialIcons name="analytics" size={20} color={theme.mutedText} />
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              title="Listens"
              value={user.metadata?.total_listens || 0}
              description="Total plays"
              icon="headset"
              color="#FF6B6B"
            />
            <StatCard
              title="Likes"
              value={user.metadata?.total_likes || 0}
              description="Given"
              icon="favorite"
              color="#4ECDC4"
            />
            <StatCard
              title="Uploads"
              value={user.metadata?.total_uploads || 0}
              description="Your content"
              icon="cloud-upload"
              color="#45B7D1"
            />
            <StatCard
              title="Listens"
              value={user.metadata?.total_listens || 0}
              description="Total"
              icon="headset"
              color="#96CEB4"
            />
          </View>
        </View>

        {/* Enhanced Account Information */}
        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Account Information
            </Text>
            <MaterialIcons
              name="verified-user"
              size={20}
              color={theme.mutedText}
            />
          </View>

          <View style={styles.infoContainer}>
            <InfoRow icon="person" label="Full Name" value={user.name} />
            <View
              style={[styles.separator, { backgroundColor: theme.border }]}
            />
            <InfoRow icon="email" label="Email Address" value={user.email} />
            <View
              style={[styles.separator, { backgroundColor: theme.border }]}
            />
            <InfoRow
              icon="calendar-today"
              label="Member Since"
              value={formatDate(user.created_at)}
            />
            {user.last_login && (
              <>
                <View
                  style={[styles.separator, { backgroundColor: theme.border }]}
                />
                <InfoRow
                  icon="access-time"
                  label="Last Active"
                  value={formatDate(user.last_login)}
                />
              </>
            )}
          </View>
        </View>

        {/* Enhanced Social Links */}
        {(user.metadata?.instagram ||
          user.metadata?.twitter ||
          user.metadata?.linkedin ||
          user.metadata?.website) && (
          <View
            style={[styles.section, { backgroundColor: theme.cardBackground }]}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Social Connections
              </Text>
              <Ionicons name="share-social" size={20} color={theme.mutedText} />
            </View>

            <View style={styles.socialContainer}>
              <SocialLink
                platform="Instagram"
                username={user.metadata?.instagram}
                iconName="logo-instagram"
                color="#E4405F"
              />
              <SocialLink
                platform="Twitter"
                username={user.metadata?.twitter}
                iconName="logo-twitter"
                color="#1DA1F2"
              />
              <SocialLink
                platform="LinkedIn"
                username={user.metadata?.linkedin}
                iconName="logo-linkedin"
                color="#0077B5"
              />
              <SocialLink
                platform="Website"
                url={user.metadata?.website}
                iconName="globe"
                color="#6C5CE7"
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Avatar Modal */}
      {user && (
        <AvatarModal
          visible={avatarModalVisible}
          onClose={() => setAvatarModalVisible(false)}
          user={user}
        />
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 8, // Reduced top padding to fix margin issues
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  errorContent: {
    alignItems: "center",
    padding: 32,
    maxWidth: 280,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    marginHorizontal: 16,
    marginTop: 8, // Reduced top margin
    marginBottom: 8,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  userMainInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "500",
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: (width - 56) / 2,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
  },
  infoContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
    marginLeft: 8,
  },
  separator: {
    height: 1,
  },
  socialContainer: {
    gap: 8,
  },
  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  socialContent: {
    flex: 1,
  },
  socialPlatform: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  socialText: {
    fontSize: 13,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summaryItem: {
    padding: 16,
    borderRadius: 12,
    minWidth: (width - 96) / 2,
    flex: 1,
    borderLeftWidth: 4,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
