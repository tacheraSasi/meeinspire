import { ThemedText, ThemedView } from "@/components/Themed";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useCurrentTheme } from "../../context/CentralTheme";
import { useAuth } from "../../context/ctx";

const { width, height } = Dimensions.get("window");

export default function Step2() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  // Use centralized theme system
  const theme = useCurrentTheme();

  const handleGetStarted = () => {
    completeOnboarding();
    router.replace("/(auth)/register");
  };

  const handleGoToLogin = () => {
    completeOnboarding();
    router.replace("/(auth)/login");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.featureList}>
            <ThemedView style={styles.featureItem}>
              <ThemedView
                style={[styles.featureDot, { backgroundColor: theme.primary }]}
              />
              <ThemedText style={[styles.featureText, { color: theme.text }]}>
                Share audio content
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.featureItem}>
              <ThemedView
                style={[styles.featureDot, { backgroundColor: theme.primary }]}
              />
              <ThemedText style={[styles.featureText, { color: theme.text }]}>
                Connect with creators
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.featureItem}>
              <ThemedView
                style={[styles.featureDot, { backgroundColor: theme.primary }]}
              />
              <ThemedText style={[styles.featureText, { color: theme.text }]}>
                Discover new sounds
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.textContainer}>
          <ThemedText style={[styles.title, { color: theme.text }]}>
            Ready to get started?
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.subtleText }]}>
            Join thousands of creators sharing their voice with the world.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.buttonBackground,
                shadowColor: theme.shadowColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: 4,
                elevation: 3,
              },
            ]}
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <ThemedText
              style={[styles.primaryButtonText, { color: theme.buttonText }]}
            >
              Get Started
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleGoToLogin}
            activeOpacity={0.9}
          >
            <ThemedText
              style={[styles.secondaryButtonText, { color: theme.subtleText }]}
            >
              I already have an account
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.indicators}>
            <ThemedView
              style={[styles.indicator, { backgroundColor: theme.divider }]}
            />
            <ThemedView
              style={[
                styles.indicator,
                styles.activeIndicator,
                { backgroundColor: theme.primary },
              ]}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  featureList: {
    alignItems: "flex-start",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "400",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});
