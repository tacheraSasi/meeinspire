import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAdaptiveColors } from "../constants/Colors";
import {
  useContextualAdaptiveColors,
  useTheme,
} from "../context/ThemeProvider";

/**
 * Theme Demo Component
 * This demonstrates how to use the comprehensive theme system throughout your app
 */
export default function ThemeDemo() {
  // Hook 1: Basic adaptive colors (works without context)
  const basicColors = useAdaptiveColors();

  // Hook 2: Enhanced contextual colors (requires ThemeProvider)
  const contextColors = useContextualAdaptiveColors();

  // Hook 3: Full theme context
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: basicColors.background }]}
    >
      <Text style={[styles.title, { color: basicColors.text }]}>
        Theme System Demo
      </Text>

      <Text style={[styles.subtitle, { color: basicColors.subtleText }]}>
        Current theme: {theme.colorScheme} ({theme.isDark ? "Dark" : "Light"}{" "}
        mode)
      </Text>

      {/* Basic Colors Section */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          Basic Colors
        </Text>

        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: basicColors.primary }]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Primary
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: basicColors.secondary },
            ]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Secondary
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: basicColors.accent }]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Accent
          </Text>
        </View>
      </View>

      {/* Status Colors Section */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          Status Colors
        </Text>

        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: basicColors.success }]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Success
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: basicColors.warning }]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Warning
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: basicColors.error }]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Error
          </Text>
        </View>
      </View>

      {/* Enhanced Context Colors Section */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          Enhanced Context Colors
        </Text>

        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: contextColors.highlight },
            ]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Highlight
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: contextColors.divider },
            ]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Divider
          </Text>
        </View>

        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: contextColors.overlayBackground },
            ]}
          />
          <Text style={[styles.colorLabel, { color: basicColors.text }]}>
            Overlay
          </Text>
        </View>
      </View>

      {/* Typography Examples */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          Typography Colors
        </Text>

        <Text style={[styles.textExample, { color: basicColors.text }]}>
          Primary Text (Main content)
        </Text>

        <Text style={[styles.textExample, { color: basicColors.subtleText }]}>
          Subtle Text (Secondary content)
        </Text>

        <Text style={[styles.textExample, { color: basicColors.mutedText }]}>
          Muted Text (Placeholders, captions)
        </Text>

        <Text
          style={[styles.textExample, { color: basicColors.inversePrimary }]}
        >
          Inverse Primary (Contrasting text)
        </Text>
      </View>

      {/* Interactive Elements */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          Interactive Elements
        </Text>

        <View
          style={[
            styles.button,
            {
              backgroundColor: basicColors.buttonBackground,
              shadowColor: contextColors.shadowColor,
              shadowOpacity: contextColors.shadowOpacity,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: basicColors.buttonText }]}>
            Primary Button
          </Text>
        </View>

        <View
          style={[
            styles.input,
            {
              backgroundColor: basicColors.inputBackground,
              borderColor: basicColors.inputBorder,
            },
          ]}
        >
          <Text
            style={[styles.inputText, { color: basicColors.inputPlaceholder }]}
          >
            Input placeholder text
          </Text>
        </View>
      </View>

      {/* Usage Examples */}
      <View
        style={[
          styles.section,
          { backgroundColor: contextColors.cardBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: basicColors.text }]}>
          How to Use
        </Text>

        <Text style={[styles.codeExample, { color: basicColors.subtleText }]}>
          // Basic usage:{"\n"}
          const colors = useAdaptiveColors();{"\n"}
          {"\n"}
          // With context (requires ThemeProvider):{"\n"}
          const contextColors = useContextualAdaptiveColors();{"\n"}
          {"\n"}
          // Full theme access:{"\n"}
          const theme = useTheme();{"\n"}
          const isDark = theme.isDark;
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  textExample: {
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  inputText: {
    fontSize: 14,
  },
  codeExample: {
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 18,
  },
});
