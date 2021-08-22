import * as SecureStore from 'expo-secure-store';
const key = 'authToken';
const storage = {
  getAuthToken: async () => await SecureStore.getItemAsync(key),
  setAuthToken: async (token) => await SecureStore.setItemAsync(key, token),
  removeAuthToken: async () => await SecureStore.deleteItemAsync(key),
};

export default storage;
