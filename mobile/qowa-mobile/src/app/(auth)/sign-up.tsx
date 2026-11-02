import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { Formik, FormikHelpers } from "formik";
import { signupInitialValues } from "@/formik/InitialValues";
import { Signup_Schema } from "@/formik/Schemes";
import type { SignupValues } from "@/formik/ValuesTypes";
import { useAppDispatch } from "@/redux/store";
import { doSignUp } from "@/redux/user/thunk";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (values: SignupValues, { setStatus }: FormikHelpers<SignupValues>) => {
    setStatus(null);
    try {
      await dispatch(doSignUp(values)).unwrap();
      router.replace("/(onBoarding)");
    } catch (message) {
      setStatus(message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Formik
        initialValues={signupInitialValues}
        validationSchema={Signup_Schema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          status,
          isSubmitting,
        }) => (
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => (router.canGoBack() ? router.back() : router.replace("/intro"))}
                hitSlop={8}
              >
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>One minute and you're logging your workouts.</Text>

              <View style={styles.body}>
                {!!status && (
                  <View style={styles.errorBanner}>
                    <View style={styles.errorIcon}>
                      <Text style={styles.errorIconText}>!</Text>
                    </View>
                    <Text style={styles.errorText}>{status}</Text>
                  </View>
                )}

                <View style={styles.row}>
                  <View style={styles.flex}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.firstName && !!errors.firstName && styles.inputError,
                      ]}
                      placeholder="Khaled"
                      placeholderTextColor={colors.placeholder}
                      selectionColor={colors.greenColor}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      autoCapitalize="words"
                      textContentType="givenName"
                    />
                    {touched.firstName && !!errors.firstName && (
                      <Text style={styles.fieldError}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.lastName && !!errors.lastName && styles.inputError,
                      ]}
                      placeholder="Mahran"
                      placeholderTextColor={colors.placeholder}
                      selectionColor={colors.greenColor}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      autoCapitalize="words"
                      textContentType="familyName"
                    />
                    {touched.lastName && !!errors.lastName && (
                      <Text style={styles.fieldError}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>

                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, touched.email && !!errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.placeholder}
                    selectionColor={colors.greenColor}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                  />
                  {touched.email && !!errors.email && (
                    <Text style={styles.fieldError}>{errors.email}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.password && !!errors.password && styles.inputError,
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={colors.placeholder}
                    selectionColor={colors.greenColor}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="newPassword"
                  />
                  {touched.password && !!errors.password && (
                    <Text style={styles.fieldError}>{errors.password}</Text>
                  )}
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
                <Text style={styles.prompt}>
                  Already have an account?{" "}
                  <Text style={styles.link} onPress={() => router.replace("/sign-in")}>
                    Sign in
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { color: colors.white, fontSize: 26, lineHeight: 28, marginTop: -2 },
  title: { color: colors.white, fontSize: 28, fontWeight: "700", marginTop: 32 },
  subtitle: { color: colors.textSecondary, fontSize: 14, marginTop: 10 },
  body: { marginTop: 28, gap: 20 },
  row: { flexDirection: "row", gap: 12 },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.errorBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  errorIconText: { color: colors.error, fontSize: 10, fontWeight: "800" },
  errorText: { color: colors.error, fontSize: 13, flex: 1 },
  label: { color: colors.label, fontSize: 14, marginBottom: 8 },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    color: colors.white,
    fontSize: 15,
    paddingHorizontal: 16,
  },
  inputError: { borderColor: colors.error },
  fieldError: { color: colors.error, fontSize: 12, marginTop: 8 },
  footer: { marginTop: "auto", paddingTop: 32, gap: 18 },
  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.greenColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.bgBase, fontSize: 16, fontWeight: "700" },
  prompt: { color: colors.textSecondary, fontSize: 14, textAlign: "center" },
  link: { color: colors.greenColor, fontWeight: "700" },
});
