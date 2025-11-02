import { Stack } from "expo-router";

import { ThemeStatusBar } from "../context/CentralTheme";
import { SessionProvider, useSession } from "../context/ctx";
import { ThemeProvider } from "../context/ThemeProvider";
import { ToastProvider } from "../context/ToastProvider";
import { SplashScreenController } from "../components/splash";

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
