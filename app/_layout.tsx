import { Stack } from "expo-router";

import { ThemeStatusBar } from "../context/CentralTheme";
import { SessionProvider, useSession } from "../context/ctx";
import { ThemeProvider } from "../context/ThemeProvider";
import { ToastProvider } from "../context/ToastProvider";
import { SplashScreenController } from "./splash";

export default function Root() {
  return (
    <ThemeProvider>
      <ThemeStatusBar />
      <ToastProvider>
        <SessionProvider>
          <SplashScreenController />
          <RootNavigator />
        </SessionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { session, isOnboarded, isOnboardingLoading } = useSession();

  if (isOnboardingLoading) {
    return null; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(core)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Protected guard={!isOnboarded}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
