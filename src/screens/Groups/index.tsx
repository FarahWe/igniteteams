import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native";
import { Container } from "./styles";

export function Groups() {
  const { navigate } = useNavigation();

  const [groups, setGroups] = useState<string[]>(["Time do farah"]);
  const [isLoading, setIsLoading] = useState(true);

  function handleNewGroup() {
    navigate("new");
  }

  function handleOpenGroup(group: string) {
    navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();

      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Turmas", "Não foi possível carregar os grupos.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar Nova Turma" onPress={handleNewGroup} />
    </Container>
  );
}
