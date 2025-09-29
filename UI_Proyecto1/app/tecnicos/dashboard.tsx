import { View } from '@/components/Themed';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { solicitudes } from '@/model/solicitudes';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';

export default function dashboardTecnicos() {

  const router = useRouter();
  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };
  const handleGestionInvent = () => {
    // Redirige a gestion de inventario
      router.replace('/tecnicos/gestion_inventarios');
  };
   const handleMantenimiento = () => {
    // Redirige a mantenimiento
      router.replace('/tecnicos/mantenimiento');
  };
  const handleRepos = () => {
    // Redirige a Reportes operativos
      router.replace('/tecnicos/repoOperativos');
  };

  return (
    
    <View style={styles.container}>
      {/* Inicio Menú principal*/}
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Image
            source={require('../../assets/images/tec.png')} 
            style={{ width: 150, height: 40}}
            resizeMode="contain"
            alt="Logo"
          />
          <Button onPress={handleGestionInvent} variant="solid" className="bg-white" size="md" action="primary" >
            <ButtonText className="text-black">Gestión de Inventario</ButtonText>
          </Button>
          <Button onPress={handleMantenimiento} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Pantalla de Mantenimiento</ButtonText>
          </Button>
          <Button onPress={handleRepos} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Panel de Reportes Operativos</ButtonText>
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />
      {/* Fin Menú principal*/}

      <Text style={styles.title}>Panel de Solicitudes</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {solicitudes.map((item) => (
          <Card
            key={String(item.idSolic)}
            className="p-5 rounded-lg bg-white border border-black"
            style={styles.card} 
          >
            <VStack className="mb-6">
              <Heading size="md" className="mb-4 text-black">
                {`Solicitud ${item.idSolic}`}
              </Heading>
              <Text size="sm" className="text-black">
                Nombre del solicitante: {String(item.idUsr)}{"\n"}
                Recurso solicitado: {String(item.idRec)}{"\n"}
                Fecha de Solicitud: {String(item.fechaSoli)}{"\n"}
                Fecha de entrega: {String(item.fechaResp)}{"\n"}
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