import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme/colors";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgBase },
        }}
      />
    </Provider>
  );
}
