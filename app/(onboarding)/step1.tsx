import { ThemedText, ThemedView } from "@/components/Themed";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useAdaptiveColors } from "../../constants/Colors";
import { useContextualAdaptiveColors } from "../../context/ThemeProvider";
import { useCurrentTheme } from "@/context/CentralTheme";

const { width, height } = Dimensions.get("window");

export default function Step1() {
  const router = useRouter();

  const colors = useCurrentTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.headerContainer}>
          <ThemedView style={styles.logoContainer}>
            <ThemedView
              style={[styles.logoCircle, { backgroundColor: colors.primary }]}
            />
            <ThemedText style={[styles.logoText, { color: colors.text }]}>
              Listen
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.textContainer}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Welcome to the future of audio sharing
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.subtleText }]}>
            Share your voice, discover new sounds, and connect with creators
            worldwide.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.buttonBackground,
                shadowColor: colors.shadowColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: colors.shadowOpacity,
                shadowRadius: 4,
                elevation: 3,
              },
            ]}
            onPress={() => router.push("./step2")}
            activeOpacity={0.9}
          >
            <ThemedText
              style={[styles.buttonText, { color: colors.buttonText }]}
            >
              Continue
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.indicators}>
            <ThemedView
              style={[
                styles.indicator,
                styles.activeIndicator,
                { backgroundColor: colors.primary },
              ]}
            />
            <ThemedView
              style={[
                styles.indicator,
                { backgroundColor: colors.divider },
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "300",
    letterSpacing: 8,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 100,
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
  button: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
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
