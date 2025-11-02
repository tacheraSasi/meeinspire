import { useCurrentTheme } from "@/context/CentralTheme";
import { Post } from "@/lib/api/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

interface PostItemProps {
  post: Post;
  onPress?: () => void;
  showStats?: boolean;
}

export default function PostItem({
  post,
  onPress,
  showStats = true,
}: PostItemProps) {
  const theme = useCurrentTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const likeAnimation = new Animated.Value(0);
  const scaleAnimation = new Animated.Value(1);
  const glowAnimation = new Animated.Value(0);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      );

      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    } catch {
      return "Recently";
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "👤";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getUserDisplayName = () => {
    return post.user?.display_name || post.user?.name || "Anonymous Creator";
  };

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLiked(!isLiked);

    // Heart animation
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPlaying(!isPlaying);

    // Glow animation
    Animated.sequence([
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const heartScale = likeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  const getTypeColor = () => {
    return post.type === "audio" ? "#FF6B6B" : "#4ECDC4";
  };

  const getTypeGradient = () => {
    if (post.type === "audio") {
      return ["#FF6B6B", "#FF8E53"];
    }
    return ["#4ECDC4", "#45B7D1"];
  };

  const generateWaveform = () => {
    const bars = 15;
    return Array.from({ length: bars }, () => Math.random() * 30 + 10);
  };

  const waveform = generateWaveform();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: theme.cardBackground,
            borderColor: theme.divider,
            shadowColor: getTypeColor(),
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          },
        ]}
        onPress={handlePress}
      >
        {/* Background Glow Effect */}
        <Animated.View
          style={[
            styles.glowEffect,
            {
              backgroundColor: getTypeColor(),
              opacity: glowOpacity,
            },
          ]}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View
              style={[styles.avatarContainer, { shadowColor: getTypeColor() }]}
            >
              <View
                style={[styles.avatar, { backgroundColor: getTypeColor() }]}
              >
                <Text style={styles.avatarText}>
                  {getUserInitials(post.user?.name)}
                </Text>
              </View>
              <View
                style={[styles.onlineIndicator, { backgroundColor: "#4CD964" }]}
              />
            </View>

            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: theme.text }]}>
                {getUserDisplayName()}
              </Text>
              <View style={styles.metaContainer}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: `${getTypeColor()}20` },
                  ]}
                >
                  <Ionicons
                    name={post.type === "audio" ? "musical-notes" : "text"}
                    size={10}
                    color={getTypeColor()}
                  />
                  <Text style={[styles.typeText, { color: getTypeColor() }]}>
                    {post.type === "audio" ? "AUDIO" : "TEXT"}
                  </Text>
                </View>
                <Text style={[styles.date, { color: theme.mutedText }]}>
                  {formatDate(post.created_at)}
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={handleLike}
            style={styles.likeButton}
            hitSlop={10}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color={isLiked ? "#FF4757" : theme.mutedText}
              />
            </Animated.View>
          </Pressable>
        </View>

        {/* Content */}
        {post.text && (
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, { color: theme.text }]}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {post.text}
            </Text>
            <View
              style={[
                styles.textGradient,
                {
                  backgroundColor: theme.cardBackground,
                  shadowColor: theme.cardBackground,
                },
              ]}
            />
          </View>
        )}

        {/* Audio Player */}
        {post.type === "audio" && (
          <View style={styles.audioContainer}>
            <Pressable
              style={[styles.playButton, { backgroundColor: getTypeColor() }]}
              onPress={handlePlayPause}
              hitSlop={10}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={16}
                color="white"
              />
            </Pressable>

            <View style={styles.waveformContainer}>
              {waveform.map((height, index) => (
                <View
                  key={index}
                  style={[
                    styles.waveBar,
                    {
                      height,
                      backgroundColor:
                        index < waveform.length * 0.6
                          ? getTypeColor()
                          : `${getTypeColor()}40`,
                    },
                  ]}
                />
              ))}
            </View>

            <Text style={[styles.duration, { color: theme.mutedText }]}>
              {formatDuration(post.duration)}
            </Text>
          </View>
        )}

        {/* Stats & Actions */}
        <View style={styles.footer}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="play" size={14} color={theme.mutedText} />
              <Text style={[styles.statText, { color: theme.mutedText }]}>
                {post.play_count || 0}
              </Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="heart" size={14} color={theme.mutedText} />
              <Text style={[styles.statText, { color: theme.mutedText }]}>
                {post.like_count || 0}
              </Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="chatbubble" size={14} color={theme.mutedText} />
              <Text style={[styles.statText, { color: theme.mutedText }]}>
                {post.comment_count || 0}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.actionButton}>
              <Ionicons
                name="share-outline"
                size={16}
                color={theme.mutedText}
              />
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Ionicons
                name="bookmark-outline"
                size={16}
                color={theme.mutedText}
              />
            </Pressable>
          </View>
        </View>

        {/* Progress Bar for Audio */}
        {post.type === "audio" && (
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBackground,
                { backgroundColor: `${getTypeColor()}20` },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: getTypeColor(),
                    width: `${isPlaying ? "60%" : "0%"}`,
                  },
                ]}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    position: "relative",
    overflow: "hidden",
  },
  glowEffect: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    height: 60,
    borderRadius: 30,
    opacity: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 12,
    fontWeight: "500",
  },
  likeButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  textContainer: {
    position: "relative",
    marginBottom: 16,
    maxHeight: 100,
    overflow: "hidden",
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    letterSpacing: -0.2,
  },
  textGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  waveformContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
    gap: 2,
  },
  waveBar: {
    width: 3,
    borderRadius: 1.5,
    minHeight: 4,
  },
  duration: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBackground: {
    height: 3,
    borderRadius: 1.5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 1.5,
  },
});
