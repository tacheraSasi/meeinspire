import { ThemedText } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon as any} size={24} color="#965997ff" />
      </View>
      <View style={styles.settingContent}>
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
        {subtitle && (
          <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
        )}
      </View>
    </View>
    {rightElement && <View style={styles.settingRight}>{rightElement}</View>}
  </Pressable>
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#11181C" + "15",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#965997ff" + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#11181C",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#11181C",
    opacity: 0.6,
    marginTop: 2,
  },
  settingRight: {
    alignItems: "center",
    justifyContent: "center",
  },
});
