import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  value: number;
  unit: "KG" | "LB";
  onChange: (value: number) => void;
};

const MIN = 20;
const MAX = 300;

export default function WeightStepper({ value, unit, onChange }: Props) {
  const step = unit === "KG" ? 0.5 : 1;

  const change = (next: number) => {
    const clamped = Math.min(Math.max(next, MIN), MAX);
    onChange(Math.round(clamped * 10) / 10);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Weight</Text>

      <View style={styles.row}>
        <Pressable
          style={styles.stepBtn}
          onPress={() => change(value - step)}
          accessibilityLabel="Decrease weight"
        >
          <MaterialCommunityIcons name="minus" size={22} color="#F2F2EE" />
        </Pressable>

        <View style={styles.valueRow}>
          <TextInput
            style={styles.value}
            value={String(value)}
            onChangeText={(t) => {
              const n = Number(t.replace(",", "."));
              if (!Number.isNaN(n)) onChange(n);
            }}
            onEndEditing={() => change(value)}
            keyboardType="decimal-pad"
            selectTextOnFocus
          />
          <Text style={styles.unit}>{unit.toLowerCase()}</Text>
        </View>

        <Pressable
          style={styles.stepBtn}
          onPress={() => change(value + step)}
          accessibilityLabel="Increase weight"
        >
          <MaterialCommunityIcons name="plus" size={22} color="#F2F2EE" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1B1E21",
    borderRadius: 22,
    padding: 22,
    gap: 16,
    alignItems: "center",
  },
  label: { color: "#C9CDD1", fontSize: 14, fontWeight: "500" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  stepBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#111315",
    borderWidth: 1,
    borderColor: "#2C3034",
    alignItems: "center",
    justifyContent: "center",
  },
  valueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  value: {
    color: "#F2F2EE",
    fontSize: 56,
    fontWeight: "700",
    padding: 0,
    minWidth: 80,
    textAlign: "center",
  },
  unit: { color: "#9AA0A6", fontSize: 18, fontWeight: "600" },
});
