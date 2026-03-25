import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ListaTareas() {
  type Tarea = {
    id: string;
    texto: string;
  };

  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState(new Array<Tarea>());

  const añadir = () => {
    if (texto.trim() === "") return;

    setTareas([...tareas, { id: Date.now().toString(), texto: texto }]); //Uso la fecha como id porque me da un número único cada milisegundo
  };

  const eliminar = (id: string) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.vista}>
      <Text style={styles.titulo}>Lista de tareas</Text>

      <TextInput
        placeholder="Escribe una tarea..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
      />

      <Pressable style={styles.boton} onPress={añadir}>
        <Text style={styles.textoBoton}>Añadir</Text>
      </Pressable>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => eliminar(item.id)}>
            <Text style={styles.tarea}>• {item.texto}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#6366f1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
  },
  tarea: {
    color: "white",
    padding: 10,
    backgroundColor: "#1e293b",
    borderRadius: 8,
    marginBottom: 5,
  },
});
