import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
type Props = {
  label: string;
  icon: "gender-male" | "gender-female";
  selected: boolean;
  onPress: () => void;
};
const GenderOption = ({ label, icon, selected, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityState={{ selected }}
    >
      <MaterialCommunityIcons name={icon} size={32} color={selected ? "#C6F432" : "#9AA0A6"} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default GenderOption;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2C3034",
    backgroundColor: "#1B1E21",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#C6F432",
    backgroundColor: "#1E2412",
  },
  label: { color: "#F2F2EE", fontSize: 16, fontWeight: "600" },
});
