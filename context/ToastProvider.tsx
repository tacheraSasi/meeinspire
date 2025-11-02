import * as Haptics from "expo-haptics";
import React, { createContext, useContext } from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";

// Helper function to safely trigger haptic feedback
const triggerHaptic = async (hapticFunction: () => Promise<void>) => {
  try {
    await hapticFunction();
  } catch (error) {
    // Silently fail if haptics are not supported or permission denied
    console.debug("Haptic feedback not available:", error);
  }
};

type ToastContextType = {
  show: (options: ToastShowParams) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  hide: () => void;
  showWithHaptic: (
    options: ToastShowParams,
    hapticType?: "light" | "medium" | "heavy" | "success" | "warning" | "error"
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const show = (options: ToastShowParams) => {
    switch (options.type) {
      case "success":
        triggerHaptic(() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        );
        break;
      case "error":
        triggerHaptic(() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        );
        break;
      case "info":
        triggerHaptic(() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        );
        break;
      default:
        triggerHaptic(() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        );
        break;
    }

    Toast.show(options);
  };

  const success = (message: string, description?: string) => {
    triggerHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    );

    show({
      type: "success",
      text1: message,
      text2: description,
    });
  };

  const error = (message: string, description?: string) => {
    // Strong haptic feedback for errors
    triggerHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    );

    show({
      type: "error",
      text1: message,
      text2: description,
    });
  };

  const info = (message: string, description?: string) => {
    // Light haptic feedback for info
    triggerHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));

    show({
      type: "info",
      text1: message,
      text2: description,
    });
  };

  const warning = (message: string, description?: string) => {
    triggerHaptic(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    );

    show({
      type: "error", 
      text1: message,
      text2: description,
    });
  };

  const hide = () => {
    Toast.hide();
  };

  const showWithHaptic = (
    options: ToastShowParams,
    hapticType:
      | "light"
      | "medium"
      | "heavy"
      | "success"
      | "warning"
      | "error" = "light"
  ) => {
    // Provide custom haptic feedback
    switch (hapticType) {
      case "light":
        triggerHaptic(() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        );
        break;
      case "medium":
        triggerHaptic(() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        );
        break;
      case "heavy":
        triggerHaptic(() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        );
        break;
      case "success":
        triggerHaptic(() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        );
        break;
      case "warning":
        triggerHaptic(() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
        );
        break;
      case "error":
        triggerHaptic(() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        );
        break;
    }

    Toast.show(options);
  };

  return (
    <ToastContext.Provider
      value={{
        show,
        success,
        error,
        info,
        warning,
        hide,
        showWithHaptic,
      }}
    >
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
