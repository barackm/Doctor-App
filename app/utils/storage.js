import AsyncStorage from '@react-native-async-storage/async-storage';
const key = 'authToken';
const storage = {
  getAuthToken: async () => await AsyncStorage.getItem(key),
  setAuthToken: async (token) => await AsyncStorage.setItem(key, token),
  removeAuthToken: async () => await AsyncStorage.removeItem(key),
  get: async (key) => await AsyncStorage.getItem(key),
  set: async (key, value) => await AsyncStorage.setItem(key, value),
  remove: async (key) => await AsyncStorage.removeItem(key),
};

export default storage;
