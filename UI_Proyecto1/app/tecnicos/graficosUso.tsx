import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function GraficosUso() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Heading size="md" className="text-black mb-4">Gráficos de uso de materiales</Heading>
        {/* Aquí puedes colocar tu componente de gráfico */}
        <Text className="text-black">[Gráfico con los datos]</Text>

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