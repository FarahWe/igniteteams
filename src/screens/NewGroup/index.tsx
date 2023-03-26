import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Alert, KeyboardAvoidingView } from "react-native";
import { Container, Icon } from "./styles";

export function NewGroup() {
  const { navigate } = useNavigation();

  const [group, setGroup] = useState("");

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group);
      navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Icon />

          <Highlight
            title="Nova Turma"
            subtitle="Crie a turma para adicionar as pessoas"
          />

          <Input
            placeholder="Nome da turma"
            onChangeText={setGroup}
            value={group}
          />
        </ScrollView>
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </KeyboardAvoidingView>
    </Container>
  );
}
