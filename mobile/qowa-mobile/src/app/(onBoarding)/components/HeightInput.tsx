import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function HeightInput({ value, onChange }: Props) {
  const n = Number(value);
  const invalid = value !== "" && (n < 50 || n > 272);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Height</Text>

      <View style={[styles.field, invalid && styles.fieldError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(t) => onChange(t.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          maxLength={3}
          placeholder="178"
          placeholderTextColor="#80868C"
          accessibilityLabel="Height in centimeters"
        />
        <Text style={styles.suffix}>cm</Text>
      </View>

      {invalid && <Text style={styles.error}>Height must be between 50 and 272 cm</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  label: { color: "#C9CDD1", fontSize: 14, fontWeight: "500" },
  field: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2C3034",
    backgroundColor: "#1B1E21",
  },
  fieldError: { borderColor: "#F2766B" },
  input: { flex: 1, color: "#F2F2EE", fontSize: 18, fontWeight: "600", padding: 0 },
  suffix: { color: "#9AA0A6", fontSize: 15, marginLeft: 8 },
  error: { color: "#F2766B", fontSize: 13 },
});
