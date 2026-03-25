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
export default function ChatBot() {
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState<any[]>([
    {
      role: "assistant",
      content: "¡Hola! ¿Como puedo ayudarte hoy?",
    },
  ]);

  const enviarMensaje = async () => {
    setCargando(true);
    if (!input.trim()) return;

    const nuevoMensaje = {
      role: "user",
      content: input,
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInput("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [...mensajes, nuevoMensaje],
        }),
      });

      const data = await res.json();

      const respuesta = data.choices[0].message;

      setMensajes((prev) => [...prev, respuesta]);
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
    paddingTop: 20,
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
