import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY; //Aquí va la API_KEY

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState<any[]>([
    {
      role: "assistant",
      content: "¡Hola! ¿Como puedo ayudarte hoy?", //Primer mensaje de bienvenida que no gasta tokens
    },
  ]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;
    setCargando(true);

    const nuevoMensaje = {
      role: "user",
      content: input,
    };
    const nuevosMensajes = [...mensajes, nuevoMensaje];

    setMensajes(nuevosMensajes);
    setInput("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        //Llamada al proveedor de la API
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "minimax/minimax-m2.5:free", //Modelo de IA (este es gratuito)
          messages: nuevosMensajes,
        }),
      });

      const data = await res.json();
      console.log("DATA:", data); //Debug
      const respuesta = data.choices[0].message; //Respuesta de la API

      setMensajes((prev) => [...prev, respuesta]); //Actualizamos
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>🤖 ChatBot</Text>
          <FlatList
            data={[
              ...mensajes,
              ...(cargando
                ? [{ role: "assistant", content: "Escribiendo..." }]
                : []), //Si está cargando añade al array de mensajes el mensaje "Escribiendo..."
            ]}
            keyExtractor={(_, id) => id.toString()}
            renderItem={({ item }) => (
              <Text style={item.role === "user" ? styles.user : styles.bot}>
                {item.content}
              </Text>
            )}
          />

          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Escribe..."
              placeholderTextColor={"white"}
            />

            <Pressable style={styles.btn} onPress={enviarMensaje}>
              <Text style={{ color: "white" }}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0f172a",
  },

  user: {
    alignSelf: "flex-end",
    backgroundColor: "#6366f1",
    color: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },

  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    marginTop: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: "#6366f1",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
});
