import { useState } from "react";
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { getClima, getCoordenadas } from "../../services/api_tiempo";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;

    try {
      setLoading(true);

      const coords = await getCoordenadas(city);
      const data = await getClima(coords.latitude, coords.longitude);

      setWeather({
        city: coords.name,
        temp: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima 🌍</Text>

      <TextInput
        placeholder="Introduce ciudad"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" />}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.city}</Text>
          <Text style={styles.temp}>{weather.temp}°C</Text>
          <Text>Viento: {weather.wind} km/h</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "white",
    borderColor: "white",
  },
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#d0f0ff",
    alignItems: "center",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 32,
  },
});
