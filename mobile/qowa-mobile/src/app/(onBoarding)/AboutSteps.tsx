import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "@/theme/colors";
import GenderOption from "./components/GenderOption";
import DateTimePicker from "@react-native-community/datetimepicker";
import { OnboardingForm } from ".";

const AboutSteps = ({
  form,
  update,
}: {
  form: OnboardingForm;
  update: (fields: Partial<OnboardingForm>) => void;
}) => {
  const [show, setShow] = useState(false);
  const date = form.birthDate;

  const parts = [
    { label: "Day", value: String(date.getDate()) },
    { label: "Month", value: String(date.getMonth() + 1) },
    { label: "Year", value: String(date.getFullYear()) },
  ];

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "white", fontSize: 30 }}>Introduce us to you</Text>
        <Text style={{ marginTop: 20, color: colors.textSecondary, fontSize: 16, maxWidth: 250 }}>
          We use this data to calculate your figures accurately.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}> Gender</Text>
        <View style={styles.genderContainer}>
          <GenderOption
            label="Male"
            icon="gender-male"
            selected={form.gender === "MALE"}
            onPress={() => update({ gender: "MALE" })}
          />
          <GenderOption
            label="Female"
            icon="gender-female"
            selected={form.gender === "FEMALE"}
            onPress={() => update({ gender: "FEMALE" })}
          />
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.title}>Birth date</Text>
        <Pressable style={styles.row} onPress={() => setShow(true)}>
          {parts.map((p) => (
            <View key={p.label} style={styles.col}>
              <Text style={styles.small}>{p.label}</Text>
              <View style={styles.box}>
                <Text style={styles.value}>{p.value}</Text>
              </View>
            </View>
          ))}
        </Pressable>
        {show && (
          <View>
            <DateTimePicker
              value={form.birthDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={new Date()}
              minimumDate={new Date(1920, 0, 1)}
              themeVariant="dark"
              onChange={(event, selected) => {
                if (Platform.OS === "android") setShow(false);
                if (event.type === "set" && selected) update({ birthDate: selected });
              }}
            />
            {Platform.OS === "ios" && (
              <Pressable style={styles.doneButton} onPress={() => setShow(false)}>
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default AboutSteps;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 30,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  label: { color: "#C9CDD1", fontSize: 18, fontWeight: "500", marginBottom: 10 },
  title: { color: "#C9CDD1", fontSize: 14, fontWeight: "500", marginBottom: 10 },
  row: { flexDirection: "row", gap: 10 },
  box: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2C3034",
    backgroundColor: "#1B1E21",
    alignItems: "center",
    justifyContent: "center",
  },
  value: { color: "#F2F2EE", fontSize: 18, fontWeight: "600" },
  col: { flex: 1, gap: 6 },
  small: { color: "#9AA0A6", fontSize: 12 },
  doneButton: { alignSelf: "flex-end", paddingVertical: 8, paddingHorizontal: 16 },
  doneText: { color: "#C6F432", fontSize: 16, fontWeight: "600" },
});
