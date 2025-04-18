import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, FlatList } from "react-native";

const ExplorePage = () => {
  const [city, setCity] = useState("");
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherForCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=2e3bc7b9adb64b9c9b9102345251804&q=${cityName}`
      );
      const data = await res.json();
      
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherList((prevList) => [
          ...prevList,
          { city: cityName, weather: data.current }
        ]);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherForCity(city);
      setCity(""); // Reset city input after search
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0c29] px-6 py-4">
      <View className="mb-6">
        <TextInput
          placeholder="Search for a city..."
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={city}
          onChangeText={setCity}
          className="w-full bg-white/20 text-white px-4 py-3 rounded-xl border border-white/30 backdrop-blur-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition-all"
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="mt-4 w-full py-3 rounded-full bg-cyan-600 shadow-lg shadow-cyan-500/50 items-center"
        >
          <Text className="text-lg font-bold text-white tracking-wide">Add City</Text>
        </TouchableOpacity>
      </View>

      {loading && <Text className="text-white text-center">Loading...</Text>}
      {error && <Text className="text-red-500 text-center">{error}</Text>}

      <FlatList
        data={weatherList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mt-4 bg-white/20 p-4 rounded-xl shadow-lg">
            <Text className="text-white text-xl font-bold">{item.city}</Text>
            <Text className="text-white text-lg">
              {item.weather.temp_c}°C / {item.weather.temp_f}°F
            </Text>
            <Text className="text-white text-md">{item.weather.condition.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
};

export default ExplorePage;
