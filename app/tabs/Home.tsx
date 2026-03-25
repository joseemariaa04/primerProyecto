import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚀</Text>

      <Text style={styles.title}>Bienvenido</Text>

      <Text style={styles.subtitle}>Navega por la app usando la barra inferior:</Text>

      <View style={styles.lista}>
        <Text style={styles.item}>Tareas: Crea y elimina tareas fácilmente</Text>
        <Text style={styles.item}>Chat: Chatbot con API de IA</Text>
        <Text style={styles.item}>Fotos: Sube o haz fotos con tu cámara</Text>
        <Text style={styles.item}>Pelis: Explora películas desde una API</Text>
        <Text style={styles.item}>Tiempo: muestra el tiempo de una ciudad consumiendo una API gratuita</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    marginTop: 20,
    gap: 10,
    alignItems: "center",
  },
  item: {
    color: "#cbd5f5",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
  },
});
