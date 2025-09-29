import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  ArrowLeftIcon,
  Icon
} from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function repoOperativos() {

  const router = useRouter();
 
  const handleMenu = () => {
    // Redirige al dashboard
      router.replace('/tecnicos/dashboard');
  };
  const handleTopRec = () => {
    // Redirige a gestion al dashboard
      router.replace('/tecnicos/recMasUsados');
  };
  const handleConsumoMat = () => {
    // Redirige a gestion al dashboard
      router.replace('/tecnicos/consumoMats');
  };
  const handleGraficos = () => {
    // Redirige a gestion al dashboard
      router.replace('/tecnicos/graficosUso');
  };
  

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>
          Sistema de Gestión de Laboratorios Académicos del Tecnológico de Costa Rica
      </Text>
      <View style={styles.line} />
      <Button variant="solid" onPress={handleMenu} style={{backgroundColor: "#ffffffff", 
                                      borderColor: "#000000", 
                                      borderWidth: 2,}} size="sm" action="primary">

          <Icon  as={ArrowLeftIcon} color='#000000ff' size="sm" className="mr-2" />
          <ButtonText>Volver al Dashboard</ButtonText>
      </Button>
      <Text style={styles.title}>Pantalla de Mantenimiento</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Card className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} >
          <Text className="text-sm font-normal mb-2 text-typography-700 text-black">
            Recursos más usados
          </Text>
          <Heading size="md" className="mb-4 text-black">
            Consulta los recursos más usados
          </Heading>
          <Button onPress={handleTopRec} variant="solid" className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" size="md" action="primary">
            <ButtonText className="text-black">Consultar</ButtonText>
          </Button>
        </Card>
        <Card className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} >
          <Text className="text-sm font-normal mb-2 text-typography-700 text-black">
            Datos de consumo
          </Text>
          <Heading size="md" className="mb-4 text-black">
            Consulta los datos de consumo de los recursos
          </Heading>
          <Button onPress={handleConsumoMat} variant="solid" className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" size="md" action="primary">
            <ButtonText className="text-black">Consultar</ButtonText>
          </Button>
        </Card>
        <Card className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} >
          <Text className="text-sm font-normal mb-2 text-typography-700 text-black">
            Graficos
          </Text>
          <Heading size="md" className="mb-4 text-black">
            Consulta los gráficos para una mejor visualización
          </Heading>
          <Button onPress={handleGraficos} variant="solid" className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" size="md" action="primary">
            <ButtonText className="text-black">Consultar</ButtonText>
          </Button>
        </Card>
          
      </ScrollView>


    </View>
  );
};

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
    marginTop: 10,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
    marginBottom: 15,
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
  header: {
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

});