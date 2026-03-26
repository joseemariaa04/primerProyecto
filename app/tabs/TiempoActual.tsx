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
  const [ciudad, setCiudad] = useState("");
  const [tiempo, setTiempo] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    if (!ciudad) return;

    try {
      setCargando(true);

      const coords = await getCoordenadas(ciudad);
      const data = await getClima(coords.latitude, coords.longitude);

      setTiempo({
        city: coords.name,
        temp: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima 🌍</Text>

      <TextInput
        placeholder="Introduce ciudad"
        value={ciudad}
        onChangeText={setCiudad}
        style={styles.input}
        placeholderTextColor={"white"}
      />

      <Button title="Buscar" onPress={buscar} />

      {cargando && <ActivityIndicator size="large" />}

      {tiempo && (
        <View style={styles.card}>
          <Text style={styles.city}>{tiempo.city}</Text>
          <Text style={styles.temp}>{tiempo.temp}°C</Text>
          <Text>Viento: {tiempo.wind} km/h</Text>
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
