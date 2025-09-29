import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import {
  BellIcon,
  Icon
} from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import NotificationTray from '@/components/NotificationTray';

// Mock data for upcoming reservations
const proximasReservas = [
  {
    id: 1,
    recurso: 'Sala de estudio',
    laboratorio: 'Lab3',
    fechaReservada: '18/09/2025',
  },
  // Add more mock data as needed
];

export default function dashboardUsuarios() {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    // Redirige al inicio de sesion
    router.replace('/');
  };

  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  const handleBusquedaLab = () => {
    // Navigate to laboratory search
    router.push('/usuarios/busqueda_laboratorios');
  };

  const handleCalendario = () => {
    // Navigate to personal calendar
    router.push('/usuarios/calendario_personal');
  };

  const handleFormulario = () => {
    // Navigate to request form
    router.push('/usuarios/formulario_solicitud');
  };

  const handleHistorial = () => {
    // Navigate to personal history
    router.push('/usuarios/historial_personal');
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
          <Button variant="solid" style={{ backgroundColor: '#3b82f6' }} size="md" action="primary">
            <ButtonText style={{ color: '#ffffff' }}>Inicio de Usuario</ButtonText>
          </Button>
          <Button onPress={handleBusquedaLab} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <ButtonText style={{ color: '#000000' }}>Búsqueda de Laboratorios</ButtonText>
          </Button>
          <Button onPress={handleCalendario} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <ButtonText style={{ color: '#000000' }}>Calendario Personal</ButtonText>
          </Button>
          <Button onPress={handleFormulario} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <ButtonText style={{ color: '#000000' }}>Formulario de Solicitud</ButtonText>
          </Button>
          <Button onPress={handleHistorial} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <ButtonText style={{ color: '#000000' }}>Historial Personal</ButtonText>
          </Button>
          <Button onPress={handleNotifications} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <Icon as={BellIcon} color='#000000ff' size="sm" className="mr-2" />
          </Button>
          <Button onPress={handleLogout} variant="solid" style={{ backgroundColor: '#ffffff' }} size="md" action="primary">
            <ButtonText style={{ color: '#000000' }}>Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Próximas Reservas</Text>

        {/* Reservations Table */}
        <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Recurso</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.headerCell}>Laboratorio</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.headerCell}>Fecha reservada</Text>
          </View>

          <ScrollView style={styles.tableContainer}>
            {proximasReservas.length > 0 ? (
              proximasReservas.map((reserva) => (
                <View key={reserva.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{reserva.recurso}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>{reserva.laboratorio}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>{reserva.fechaReservada}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Sala de estudio</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCell}>Lab3</Text>
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCell}>18/09/2025</Text>
              </View>
            )}
            {/* Empty rows to match the design */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>---</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.tableCell}>---</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.tableCell}>---</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>---</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.tableCell}>---</Text>
              <View style={styles.verticalSeparator} />
              <Text style={styles.tableCell}>---</Text>
            </View>
          </ScrollView>
        </Card>
      </ScrollView>

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
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 300,
  },
  tableContainer: {
    maxHeight: 400,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  tableCell: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  verticalSeparator: {
    width: 2,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
  },
});