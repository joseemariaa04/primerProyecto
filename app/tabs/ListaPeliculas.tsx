import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import getPeliculas from "../../services/API";

type Pelicula = {
  id: number | string;
  title: string;
  image_url: string;
};

export default function ListaPeliculas() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    const data = await getPeliculas();
    setPeliculas(data);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Películas</Text>

      {loading ? (
        <Text style={styles.loading}>Cargando...</Text>
      ) : (
        <FlatList
          data={peliculas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  loading: {
    color: "#94a3b8",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  nombre: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  imagen: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
});
