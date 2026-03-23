import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>

      <View style={styles.botonContainer}>
        <Link href="/ListaTareas" asChild>
          <Pressable style={styles.boton}>
            <Text style={styles.textoBoton}>📋 Lista Tareas</Text>
          </Pressable>
        </Link>

        <Link href="/ListaPeliculas" asChild>
          <Pressable style={styles.boton}>
            <Text style={styles.textoBoton}>🎬 API de peliculas</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  botonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  boton: {
    backgroundColor: "#6366f1",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
  },
});
