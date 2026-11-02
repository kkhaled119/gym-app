import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { colors } from "@/theme/colors";
import AboutSteps from "./AboutSteps";
import BodyStep from "./BodyStep";
import TargetSteps from "./TargetSteps";
import { useAppDispatch } from "@/redux/store";
import { doCompleteOnboarding, doUpdateMe } from "@/redux/user/thunk";
import { router } from "expo-router";

const TOTAL_STEPS = 2;
export type OnboardingForm = {
  gender: "MALE" | "FEMALE" | null;
  birthDate: Date;
  weightUnit: "KG" | "LB";
  weight: number;
  height: string;
};

const OnBoarding = () => {
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();
  const isLast = step === TOTAL_STEPS - 1;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<OnboardingForm>({
    gender: null,
    birthDate: new Date(2000, 0, 1),
    weightUnit: "KG",
    weight: 70,
    height: "",
  });

  const update = (falids: Partial<OnboardingForm>) => {
    setForm((prev) => ({ ...prev, ...falids }));
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await dispatch(
        doUpdateMe({
          gender: form.gender ?? undefined,
          birthDate: form.birthDate.toISOString().slice(0, 10),
          weightUnit: form.weightUnit,
          height: Number(form.height),
        }),
      ).unwrap();
      await dispatch(doCompleteOnboarding()).unwrap();
      router.replace("/home");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (isLast) submit();
    else setStep((s) => s + 1);
  };

  const stepValid = step === 0 ? form.gender !== null : form.height.trim() !== "";
  const canNext = stepValid && !submitting;

  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <View key={i} style={[styles.bar, i <= step && styles.barActive]} />
        ))}
      </View>
      <View style={styles.content}>
        {step === 0 && <AboutSteps form={form} update={update} />}
        {step === 1 && <BodyStep form={form} update={update} />}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.actions}>
        {step > 0 && (
          <Pressable style={styles.backButton} onPress={back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.nextButton, !canNext && styles.nextButtonDisabled]}
          onPress={next}
          disabled={!canNext}
        >
          <Text style={styles.nextText}>{isLast ? "Let's go" : "Next"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgBase, padding: 24 },
  content: { flex: 1 },
  actions: { flexDirection: "row", gap: 12 },
  backButton: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2C3034",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#F2F2EE", fontSize: 16, fontWeight: "600" },
  nextButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#C6F432",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonDisabled: { opacity: 0.4 },
  nextText: { color: "#111315", fontSize: 17, fontWeight: "700" },
  errorText: { color: "#FF6B6B", fontSize: 14, marginBottom: 12, textAlign: "center" },
  progress: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 28,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2C3034",
  },
  barActive: {
    backgroundColor: "#C6F432",
  },
});
