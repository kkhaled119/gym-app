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
import { loginInitialValues } from "@/formik/InitialValues";
import { Login_Schema } from "@/formik/Schemes";
import type { LoginValues } from "@/formik/ValuesTypes";
import { useAppDispatch } from "@/redux/store";
import { doLogin } from "@/redux/user/thunk";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginValues, { setStatus }: FormikHelpers<LoginValues>) => {
    setStatus(null);
    try {
      await dispatch(doLogin(values)).unwrap();
      router.replace("/home");
    } catch (message) {
      setStatus(message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={Login_Schema}
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

              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>Sign in and pick up where you left off.</Text>

              <View style={styles.body}>
                {!!status && (
                  <View style={styles.errorBanner}>
                    <View style={styles.errorIcon}>
                      <Text style={styles.errorIconText}>!</Text>
                    </View>
                    <Text style={styles.errorText}>{status}</Text>
                  </View>
                )}

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
                    textContentType="password"
                  />
                  {touched.password && !!errors.password && (
                    <Text style={styles.fieldError}>{errors.password}</Text>
                  )}
                  <Text style={styles.forgot} onPress={() => {}}>
                    Forgot password?
                  </Text>
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={styles.prompt}>
                  Don't have an account?{" "}
                  <Text style={styles.link} onPress={() => router.replace("/sign-up")}>
                    Create one
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

export default SignIn;

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
  forgot: { color: colors.greenColor, fontSize: 13, marginTop: 10, alignSelf: "flex-end" },
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
