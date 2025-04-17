import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function HomeScreen() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching weather for:", city);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0c29]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center space-y-8">
          <Text className="text-4xl font-extrabold text-cyan-300 tracking-wider">
            Weather<span className="text-white">X</span>
          </Text>

          <TextInput
            placeholder="🔍 Search for your city..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={city}
            onChangeText={setCity}
            className="w-full bg-white/10 text-white px-3 py-3 rounded-2xl border border-white/20 backdrop-blur-md focus:border-cyan-400"
          />

          <TouchableOpacity
            onPress={handleSearch}
            activeOpacity={0.85}
            className="w-full py-3 rounded-full bg-cyan-500/90 shadow-lg shadow-cyan-500/50 items-center"
          >
            <Text className="text-lg font-bold text-white tracking-wide">
              Show Weather
            </Text>
          </TouchableOpacity>

          <Text className="text-sm text-gray-400 italic">
            Powered by WeatherX AI
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
