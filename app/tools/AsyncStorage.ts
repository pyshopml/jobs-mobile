import { AsyncStorage } from 'react-native';

const PRE_KEY = '@JobsMobileStore';

export async function saveToStorage(key: string, value: any): Promise<void>{
  try {
    await AsyncStorage.setItem(`${PRE_KEY}:${key}`, JSON.stringify(value));
  } catch (error) {
    throw error
  }
}

export async function readFromStorage(key: string): Promise<any> {
  try {
    const value = await AsyncStorage.getItem(`${PRE_KEY}:${key}`);
    return JSON.parse(value);
  } catch (error) {
    throw error
  }
}

export async function removeFromStorage(key: string): Promise<void>{
  try {
    await AsyncStorage.setItem(`${PRE_KEY}:${key}`, '');
  } catch (error) {
    throw error
  }
}
