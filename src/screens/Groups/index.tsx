import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";

export function Groups() {
  const { navigate } = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigate("new");
  }

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        renderItem={({ item }) => <GroupCard title={item} />}
        keyExtractor={(item) => item}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar Nova Turma" onPress={handleNewGroup} />
    </Container>
  );
}
