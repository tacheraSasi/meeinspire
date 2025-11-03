import { Text } from "react-native";

export const SectionHeader = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 18,
      fontWeight: "600",
      marginTop: 30,
      marginBottom: 15,
      color: "#11181C",
      opacity: 0.8,
    }}
  >
    {title}
  </Text>
);
