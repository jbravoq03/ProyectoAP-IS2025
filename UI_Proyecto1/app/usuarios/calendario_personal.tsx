import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import {
  BellIcon,
  Icon
} from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import NotificationTray from '@/components/NotificationTray';

// Mock data for user reservations
const reservasPersonales = [
  {
    id: 1,
    recurso: 'Sala de estudio',
    laboratorio: 'Lab3',
    fecha: '10/09/2025',
    estadoReserva: 'Aprobado',
  },
  {
    id: 2,
    recurso: 'Proyector',
    laboratorio: 'Lab1',
    fecha: '15/09/2025',
    estadoReserva: 'Pendiente',
  },
  {
    id: 3,
    recurso: 'Computadora',
    laboratorio: 'Lab2',
    fecha: '20/09/2025',
    estadoReserva: 'Aprobado',
  },
];

export default function CalendarioPersonal() {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  // Calendar state
  const [selectedMonth, setSelectedMonth] = useState('09');
  const [selectedYear, setSelectedYear] = useState('2025');

  const handleLogout = () => {
    router.replace('/');
  };

  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const closeNotifications = () => {
    setNotificationOpen(false);
  };

  // Filter reservations based on selected month/year
  const filteredReservas = reservasPersonales.filter(reserva => {
    const [day, month, year] = reserva.fecha.split('/');
    return month === selectedMonth && year === selectedYear;
  });

  const handleInicio = () => {
    router.push('/usuarios/dashboard');
  };

  const handleBusquedaLab = () => {
    router.push('/usuarios/busqueda_laboratorios');
  };

  const handleFormulario = () => {
    router.push('/usuarios/formulario_solicitud');
  };

  const handleHistorial = () => {
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
          <Button onPress={handleInicio} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <ButtonText style={{ color: 'black' }}>Inicio de Usuario</ButtonText>
          </Button>
          <Button onPress={handleBusquedaLab} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <ButtonText style={{ color: 'black' }}>Búsqueda de Laboratorios</ButtonText>
          </Button>
          <Button variant="solid" style={{ backgroundColor: '#3b82f6' }} size="md" action="primary">
            <ButtonText style={{ color: 'white' }}>Calendario Personal</ButtonText>
          </Button>
          <Button onPress={handleFormulario} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <ButtonText style={{ color: 'black' }}>Formulario de Solicitud</ButtonText>
          </Button>
          <Button onPress={handleHistorial} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <ButtonText style={{ color: 'black' }}>Historial Personal</ButtonText>
          </Button>
          <Button onPress={handleNotifications} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <Icon as={BellIcon} color='#000000ff' size="sm" style={{ marginRight: 8 }} />
          </Button>
          <Button onPress={handleLogout} variant="solid" style={{ backgroundColor: 'white' }} size="md" action="primary">
            <ButtonText style={{ color: 'black' }}>Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Calendario Personal</Text>

        {/* Month/Year Selection */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Mes a visualizar</Text>
          
          <HStack space="md" style={styles.dateSelectionContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMonth}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              >
                <Picker.Item label="Mes" value="" />
                <Picker.Item label="Enero" value="01" />
                <Picker.Item label="Febrero" value="02" />
                <Picker.Item label="Marzo" value="03" />
                <Picker.Item label="Abril" value="04" />
                <Picker.Item label="Mayo" value="05" />
                <Picker.Item label="Junio" value="06" />
                <Picker.Item label="Julio" value="07" />
                <Picker.Item label="Agosto" value="08" />
                <Picker.Item label="Septiembre" value="09" />
                <Picker.Item label="Octubre" value="10" />
                <Picker.Item label="Noviembre" value="11" />
                <Picker.Item label="Diciembre" value="12" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
              >
                <Picker.Item label="Año" value="" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
              </Picker>
            </View>
          </HStack>
        </View>

        {/* Reservations Table */}
        <Card size="md" variant="elevated" style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Recurso</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.headerCell}>Laboratorio</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.headerCell}>Fecha</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.headerCell}>Estado de reserva</Text>
          </View>

          <ScrollView style={styles.tableContainer}>
            {filteredReservas.length > 0 ? (
              filteredReservas.map((reserva) => (
                <View key={reserva.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{reserva.recurso}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>{reserva.laboratorio}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>{reserva.fecha}</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={[styles.tableCell, { 
                    color: reserva.estadoReserva.toLowerCase() === 'aprobado' ? '#22c55e' :
                           reserva.estadoReserva.toLowerCase() === 'pendiente' ? '#f59e0b' :
                           reserva.estadoReserva.toLowerCase() === 'rechazado' ? '#ef4444' : '#666',
                    fontWeight: reserva.estadoReserva.toLowerCase() !== '---' ? 'bold' : 'normal'
                  }]}>
                    {reserva.estadoReserva}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No hay reservas para el período seleccionado
                </Text>
              </View>
            )}

            {/* Show all reservations as fallback or add empty rows */}
            {selectedMonth === '09' && selectedYear === '2025' && (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Sala de estudio</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>Lab3</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={styles.tableCell}>10/09/2025</Text>
                  <View style={styles.verticalSeparator} />
                  <Text style={[styles.tableCell, { color: '#22c55e', fontWeight: 'bold' }]}>
                    Aprobado
                  </Text>
                </View>
              </>
            )}

            {/* Empty rows to match design */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>---</Text>
              <View style={styles.verticalSeparator} />
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
  },
  filterSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  dateSelectionContainer: {
    width: '60%',
    justifyContent: 'flex-start',
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  picker: {
    height: 50,
    color: '#000',
  },
  tableCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    width: '95%',
    borderWidth: 1,
    borderColor: '#ddd',
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
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  tableContainer: {
    maxHeight: 400,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tableCell: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  verticalSeparator: {
    width: 2,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
