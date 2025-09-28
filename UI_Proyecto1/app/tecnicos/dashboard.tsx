import { View } from '@/components/Themed';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  ArrowLeftIcon,
  EditIcon,
  EyeIcon,
  Icon,
  ThreeDotsIcon
} from '@/components/ui/icon';
import {
  Menu,
  MenuItem,
  MenuItemLabel
} from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useRouter } from 'expo-router';
import { Image, StyleSheet } from 'react-native';


export default function dashboardTecnicos() {

  const router = useRouter();
  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };
  const handleInvent = () => {
    // Redirige al inicio de sesion
      router.replace('/laboratorios/inventario');
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Image
          source={require('../../assets/images/tec.png')} 
          style={{ width: 150, height: 40}}
          resizeMode="contain"
          alt="Logo"
        />
        <Menu
          placement="top"
          offset={5}
          disabledKeys={['Settings']}
          trigger={({ ...triggerProps }) => {
            return (
              <Button action="secondary" {...triggerProps}>
                <ButtonText>Menú</ButtonText>
              </Button>
            );
          }}
        >
          <MenuItem key="GestInvent" textValue="GestInvent">
            <Icon as={EditIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Gestión de Inventario</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Mantenimiento" textValue="Mantenimiento">
            <Icon as={EyeIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Pantalla de Mantenimiento</MenuItemLabel>
          </MenuItem>
          <MenuItem onPress={handleLogout} key="Reportes" textValue="Reportes">
            <Icon as={ThreeDotsIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Panel de Reportes Operativos</MenuItemLabel>
          </MenuItem>
        </Menu>
        <Button variant="solid" size="md" action="secondary">
          <Icon as={ArrowLeftIcon} size="sm" className="mr-2" />
          <ButtonText>Cerrar Sesión</ButtonText>
        </Button>
      </View>
      <View style={styles.line} />
      
      <Card className="p-5 rounded-lg max-w-[360px] m-3 bg-white border border-black" >
        <VStack className="mb-6">
          <Heading size="md" className="mb-4  text-black">
            Solicitud "x"
          </Heading>
          <Text size="sm" className="text-black">
            Descripcion
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  line: {
    marginTop: 10,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  horizontalContainer: {
  flexDirection: 'row',
  alignItems: 'center',       // centra verticalmente los elementos
  justifyContent: 'flex-start', 
  gap: 40,                     // espacio entre botones e imagen
  paddingVertical: 5,          // reduce padding vertical
},  

  });