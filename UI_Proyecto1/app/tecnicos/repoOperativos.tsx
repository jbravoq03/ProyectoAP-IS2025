import { View } from '@/components/Themed';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { solicitudes } from '@/model/solicitudes';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function repoOperativos() {

  const router = useRouter();
 
  const handleGestionInvent = () => {
    // Redirige a gestion al dashboard
      router.replace('/tecnicos/dashboard');
  };
   const handleMantenimiento = () => {
    // Redirige a mantenimiento
      router.replace('/tecnicos/mantenimiento');
  };

  return (
    
    <View style={styles.container}>

      <Text style={styles.title}>Panel de Solicitudes</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {solicitudes.map((item) => (
          <Card
            key={item.id}
            className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} 
          >
            <VStack className="mb-6">
              <Heading size="md" className="mb-4 text-black">
                {item.nombre}
              </Heading>
              <Text size="sm" className="text-black">
                Nombre del solicitante: {item.solicitante}{"\n"}
                Recurso solicitado: {item.recsolicitado}{"\n"}
                Fecha de Solicitud: {item.fechasoli}{"\n"}
                Fecha de entrega: {item.fechaentreg}{"\n"}
              </Text>
            </VStack>
            <Box className="flex-col sm:flex-row">
              <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                <ButtonText size="sm">Aceptar</ButtonText>
              </Button>
              <Button
                variant="solid"
                action="secondary"
                className="px-4 py-2 border-outline-300 sm:flex-1"
              >
                <ButtonText size="sm" className="text-typography-600">
                  Rechazar
                </ButtonText>
              </Button>
            </Box>
          </Card>
        ))}
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
  
  containerCard: {
    flex: 1,
    width: '150%',
    alignItems: 'center', 
    backgroundColor: '#ffffffff',
    padding: 50,
  },
  card: {
    justifyContent: 'center',
    marginTop: 40,
    width: '90%',
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#ffffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  horizontalContainer: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  gap: 8, 
  paddingVertical: 10,
  paddingBottom: 0,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

});