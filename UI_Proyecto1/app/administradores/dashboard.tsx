import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import {
  BellIcon,
  Icon
}from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';


import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { P } from '@expo/html-elements';

export default function dashboardAdmins() {

  const router = useRouter();

  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };

  const handleGestionUsuarios = () => {
    // Redirige a gestion de usuarios
      router.replace('/administradores/gestion_usuarios');
  }

  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('09');

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
          <Button onPress={handleGestionUsuarios} variant="solid" className="bg-white" size="md" action="primary" >
            <ButtonText className="text-black">Gestión de Usuarios</ButtonText>
          </Button>
          <Button variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Configuración de Parámetros</ButtonText>
          </Button>
          <Button variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Bitácora</ButtonText>
          </Button>
          <Button variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Reportes Institucionales</ButtonText>
          </Button>
          <Button variant="solid" className="bg-white" size="md" action="primary">
            <Icon as={BellIcon} color='#000000ff' size="sm" className="mr-2" />
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />
      {/* Fin Menú principal*/}

      <Text style={styles.title}>Métricas Globales</Text>

      {/* 🔹 Filtros */}
      
      <View style={styles.filterContainer}>
          <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={styles.filterTitle}>Filtrar por:</Text>
    
          <Picker
            selectedValue={selectedMonth}
            style={{...styles.picker, backgroundColor: '#f0f0f0', marginRight: 9}}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            <Picker.Item label="Enero" value="1" />
            <Picker.Item label="Febrero" value="2" />
            <Picker.Item label="Marzo" value="3" />
            <Picker.Item label="Abril" value="4" />
            <Picker.Item label="Mayo" value="5" />
            <Picker.Item label="Junio" value="6" />
            <Picker.Item label="Julio" value="7" />
            <Picker.Item label="Agosto" value="8" />
            <Picker.Item label="Septiembre" value="9" />
            <Picker.Item label="Octubre" value="10" />
            <Picker.Item label="Noviembre" value="11" />
            <Picker.Item label="Diciembre" value="12" />
          </Picker>

          <Picker
            selectedValue={selectedYear}
            style={{...styles.picker, backgroundColor: '#f0f0f0'}}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2014" value="2014" />
            <Picker.Item label="2013" value="2013" />
            <Picker.Item label="2012" value="2012" />
            <Picker.Item label="2011" value="2011" />
            <Picker.Item label="2010" value="2010" />
          </Picker>
        </ScrollView>
      </View>

      {/* 🔹 Cards */}
      <View style={styles.horizontalContainer}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.horizontalContainer}
          >
          {/* Card 1: Reservas Totales */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Reservas Totales</Text>
              {/* Separador vertical */}
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Fecha Reservada</Text>
            </View>

            <ScrollView style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio A</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>12 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio B</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>8 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio C</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>15 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio D</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>12 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio E</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>8 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio F</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>15 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio G</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>10 reservas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laboratorio H</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>5 reservas</Text>
              </View>
            </ScrollView>
          </Card>

          {/* Card 2: Mantenimientos Activos */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Mantenimientos Activos</Text>
              {/* Separador vertical */}
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Fecha finalización</Text>
            </View>
            <ScrollView style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Proyector A</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>En curso</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Computadora B</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>Pendiente</Text>
              </View>
            </ScrollView>
          </Card>

          {/* Card 3: Recursos Más Usados */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellLeft}>Recursos más usados</Text>
              {/* Separador vertical */}
              <View style={styles.verticalSeparator} />
              <Text style={styles.headerCellRight}>Usos</Text>
            </View>
            <ScrollView style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Proyector</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>48 usos</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Laptop</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>35 usos</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLeft}>Pizarra</Text>
                {/* Separador vertical */}
                <View style={styles.verticalSeparator} />
                <Text style={styles.tableCellRight}>20 usos</Text>
              </View>
            </ScrollView>
          </Card>
        </ScrollView>
      </View>

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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginRight: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '21%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterBox: {
    flex: 1,
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  picker: {
    height: 40,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000',
    fontWeight: 500,
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
    gap: 20,
  },
  card: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 600,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: 550,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  tableCellLeft: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    fontWeight: '500',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  tableCellRight: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    flex: 1,
    paddingLeft: 25,
    marginTop: 8,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
  },
  headerCellLeft: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 15,
  },
  headerCellRight: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 25,
  },
  verticalSeparator: {
    width: 2,              // grosor de la línea
    backgroundColor: '#ccc', // color gris claro
    alignSelf: 'stretch',    // 🔹 hace que cubra toda la altura de la fila
  },

});