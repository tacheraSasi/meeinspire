import { ThemedText, ThemedView } from "@/components/Themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useCurrentTheme } from "../../context/CentralTheme";
import { useAuth } from "../../context/ctx";
import { useToast } from "../../context/ToastProvider";

export default function Login() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const theme = useCurrentTheme();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Missing fields", "Please fill in all fields");
      return;
    }

    try {
      await signIn({ email: email.trim(), password });
      toast.success("Welcome back!", "Login successful");
    } catch (error) {
      // Error alert handled in API class, but we can add additional handling here
      toast.error(
        "Login failed",
        "Please check your credentials and try again"
      );
      console.error("Login failed:", error);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    toast.info(
      "Coming soon",
      "Forgot password feature will be available soon!"
    );
  };

  const handleSignUp = () => {
    router.push("/(auth)/register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedView
              style={[styles.logoCircle, { backgroundColor: theme.primary }]}
            />
            <ThemedText style={[styles.title, { color: theme.text }]}>
              Welcome Back
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: theme.subtleText }]}>
              Sign in to your account
            </ThemedText>
          </ThemedView>

          {/* Form */}
          <ThemedView style={styles.form}>
            {/* Email Input */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText style={[styles.label, { color: theme.text }]}>
                Email
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                    color: theme.inputText,
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.inputPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </ThemedView>

            {/* Password Input */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText style={[styles.label, { color: theme.text }]}>
                Password
              </ThemedText>
              <ThemedView style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.inputBorder,
                      color: theme.inputText,
                    },
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <ThemedText
                    style={[styles.eyeButtonText, { color: theme.subtleText }]}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <ThemedText
                style={[styles.forgotPasswordText, { color: theme.accent }]}
              >
                Forgot your password?
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Actions */}
          <ThemedView style={styles.actions}>
            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: theme.buttonBackground,
                  shadowColor: theme.shadowColor,
                  shadowOpacity: theme.shadowOpacity,
                },
                isLoading && styles.disabledButton,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <ThemedText
                style={[styles.primaryButtonText, { color: theme.buttonText }]}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </ThemedText>
            </TouchableOpacity>

            {/* Divider */}
            <ThemedView style={styles.dividerContainer}>
              <ThemedView
                style={[styles.divider, { backgroundColor: theme.divider }]}
              />
              <ThemedText
                style={[styles.dividerText, { color: theme.subtleText }]}
              >
                or
              </ThemedText>
              <ThemedView
                style={[styles.divider, { backgroundColor: theme.divider }]}
              />
            </ThemedView>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSignUp}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <ThemedText
                style={[styles.secondaryButtonText, { color: theme.text }]}
              >
                Don't have an account?{" "}
                <ThemedText style={[styles.linkText, { color: theme.accent }]}>
                  Sign Up
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 14,
    padding: 4,
  },
  eyeButtonText: {
    fontSize: 18,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
  },
  linkText: {
    fontWeight: "600",
  },
});
