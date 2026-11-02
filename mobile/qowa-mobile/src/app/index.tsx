import { tokenStorage } from "@/lib/tokenStorage";
import { useAppDispatch } from "@/redux/store";
import { doGetMe } from "@/redux/user/thunk";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      const token = await tokenStorage.getRefresh();

      if (!token) {
        router.replace("/intro");
        return;
      }
      try {
        const user = await dispatch(doGetMe({})).unwrap();
        router.replace(user.onboardedAt ? "/home" : "/(onBoarding)");
      } catch (err) {
        await tokenStorage.clear();
        router.replace("/(auth)/sign-in");
      }
    };
    bootstrap();
  }, [dispatch]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111315",
      }}
    >
      <ActivityIndicator color="#C6F432" />
    </View>
  );
}
