import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function ConsumoMateriales() {
  const router = useRouter();

  const todosMateriales = [
    { id: 1, nombre: 'Material A', uso: 10 },
    { id: 2, nombre: 'Material B', uso: 7 },
    { id: 3, nombre: 'Material C', uso: 5 },
    { id: 4, nombre: 'Material D', uso: 3 },
    { id: 5, nombre: 'Material E', uso: 2 },
    { id: 6, nombre: 'Material F', uso: 1 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Heading size="md" className="text-black mb-4">Consumo de todos los materiales</Heading>
        {todosMateriales.map((mat) => (
          <Text key={mat.id} className="text-black">{mat.nombre} - Uso: {mat.uso}</Text>
        ))}
        <Button onPress={() => router.replace('/tecnicos/repoOperativos')} variant="solid" action="secondary" className="mt-4">
          <ButtonText>Volver</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#ffffffff',
    padding: 20,
  },
});