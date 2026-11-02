import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout, selectCurrentUser } from "@/redux/user";
import { tokenStorage } from "@/lib/tokenStorage";

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const onLogout = async () => {
    await tokenStorage.clear();
    dispatch(logout());
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi{user ? `, ${user.firstName}` : ""}</Text>
        <Text style={styles.subtitle}>You're signed in.</Text>

        <TouchableOpacity style={styles.button} onPress={onLogout} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 32 },
  title: { color: colors.white, fontSize: 28, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, fontSize: 14, marginTop: 10 },
  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.bgbutton,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "700" },
});
