import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import WeightStepper from "./components/WeightStepper";
import HeightInput from "./components/HeightInput";
import { OnboardingForm } from ".";

const UNITS = [
  { value: "KG", label: "Kg" },
  { value: "LB", label: "Pound" },
] as const;

const BodyStep = ({
  form,
  update,
}: {
  form: OnboardingForm;
  update: (fields: Partial<OnboardingForm>) => void;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your measurements</Text>
        <Text style={styles.subtitle}>
          This will be the first weight recorded on your progress chart.
        </Text>
      </View>

      <View style={styles.segment}>
        {UNITS.map((u) => {
          const isActive = form.weightUnit === u.value;
          return (
            <Pressable
              key={u.value}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => update({ weightUnit: u.value })}
              accessibilityRole="radio"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {u.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 40 }}>
        <WeightStepper
          value={form.weight}
          unit={form.weightUnit}
          onChange={(w) => update({ weight: w })}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <HeightInput value={form.height} onChange={(h) => update({ height: h })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  title: { color: colors.white, fontSize: 28, fontWeight: "bold" },
  subtitle: { marginTop: 20, color: colors.textSecondary, fontSize: 17, maxWidth: 300 },
  segment: {
    flexDirection: "row",
    marginTop: 30,
    padding: 4,
    gap: 4,
    borderRadius: 14,
    backgroundColor: colors.bgbutton,
  },
  option: {
    flex: 1,
    height: 44,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  optionActive: { backgroundColor: "#C6F432" },
  optionText: { color: "#C9CDD1", fontSize: 15, fontWeight: "600" },
  optionTextActive: { color: "#111315", fontWeight: "700" },
});

export default BodyStep;
