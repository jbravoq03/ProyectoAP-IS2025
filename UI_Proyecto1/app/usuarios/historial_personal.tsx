import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  BellIcon,
  Icon
} from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import NotificationTray from '@/components/NotificationTray';

export default function HistorialPersonal() {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    router.replace('/');
  };

  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  const handleInicio = () => {
    router.push('/usuarios/dashboard');
  };

  const handleBusquedaLab = () => {
    router.push('/usuarios/busqueda_laboratorios');
  };

  const handleCalendario = () => {
    router.push('/usuarios/calendario_personal');
  };

  const handleFormulario = () => {
    router.push('/usuarios/formulario_solicitud');
  };

  return (
    <View style={styles.container}>
      {/* Header with Navigation */}
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
          <Button onPress={handleInicio} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Inicio de Usuario</ButtonText>
          </Button>
          <Button onPress={handleBusquedaLab} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Búsqueda de Laboratorios</ButtonText>
          </Button>
          <Button onPress={handleCalendario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Calendario Personal</ButtonText>
          </Button>
          <Button onPress={handleFormulario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Formulario de Solicitud</ButtonText>
          </Button>
          <Button variant="solid" className="bg-blue-500" size="md" action="primary">
            <ButtonText className="text-white">Historial Personal</ButtonText>
          </Button>
          <Button onPress={handleNotifications} variant="solid" className="bg-white" size="md" action="primary">
            <Icon as={BellIcon} color='#000000ff' size="sm" className="mr-2" />
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Historial Personal</Text>
        <Text style={styles.placeholder}>Contenido pendiente - Pantalla en desarrollo</Text>
      </View>

      {/* Notification Tray */}
      <NotificationTray 
        visible={notificationOpen} 
        onClose={closeNotifications} 
      />
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
  horizontalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 10,
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
