import * as SecureStore from "expo-secure-store";

const ACCESS = "accessToken";
const REFRESH = "refreshToken";

export const tokenStorage = {
  getAccess: () => SecureStore.getItemAsync(ACCESS),
  getRefresh: () => SecureStore.getItemAsync(REFRESH),
  save: async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS, accessToken);
    await SecureStore.setItemAsync(REFRESH, refreshToken);
  },
  clear: async () => {
    await SecureStore.deleteItemAsync(ACCESS);
    await SecureStore.deleteItemAsync(REFRESH);
  },
};
