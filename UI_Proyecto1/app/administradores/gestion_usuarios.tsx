import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Picker } from '@react-native-picker/picker';


import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';

export default function gestionusuariosAdmins() {

  const router = useRouter();

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [searchName, setSearchName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  type User = { nombre: string; correo: string; rol: string };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { nombre: 'Juan Pérez', correo: 'juan.perez@tec.cr', rol: 'Administrador' },
    { nombre: 'María Gómez', correo: 'maria.gomez@tec.cr', rol: 'Encargado' },
    { nombre: 'Carlos Rojas', correo: 'carlos.rojas@tec.cr', rol: 'Docente' },
    { nombre: 'Ana Rodríguez', correo: 'ana.rodriguez@tec.cr', rol: 'Técnico' },
    { nombre: 'Luis Fernández', correo: 'luis.fernandez@tec.cr', rol: 'Usuario' },
    { nombre: 'Sofía Ramírez', correo: 'sofia.ramirez@tec.cr', rol: 'Técnico' },
  ];

  const handleModify = () => {
    console.log('Botón Modificar presionado');
    console.log('selectedUser:', selectedUser);
    console.log('selectedRole:', selectedRole);
    // Detecta plataforma
    const isWeb = typeof window !== 'undefined' && window.document;
    if (!selectedUser) {
      if (isWeb) {
        window.alert('Por favor, selecciona un usuario primero.');
      } else {
        Alert.alert('Aviso', 'Por favor, selecciona un usuario primero.');
      }
      console.log(`Seleccione un usuario`);
      return;
    }
    if (isWeb) {
      const confirm = window.confirm(`¿Deseas cambiar el rol de ${selectedUser.nombre} a ${selectedRole}?`);
      if (confirm) {
        console.log(`Rol actualizado: ${selectedUser.nombre} → ${selectedRole}`);
      }
    } else {
      Alert.alert(
        'Confirmar cambio',
        `¿Deseas cambiar el rol de ${selectedUser.nombre} a ${selectedRole}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: () => {
              console.log(`Rol actualizado: ${selectedUser.nombre} → ${selectedRole}`);
            },
          },
        ]
      );
    }
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
          <Text style={{...styles.title, paddingBottom: 10, paddingLeft: 70 }}>Gestión de usuarios y roles</Text>
          <Button onPress={handleReturn} variant="solid" className="bg-white" size="md" action="primary"
          style={{ alignContent: 'center', justifyContent: 'center' }}>
            <ButtonText className="text-black">Regresar</ButtonText>
          </Button>
        </ScrollView>
      </View>

      {/* 🔹 Filtros */}
      
      <View style={styles.filterContainer}>
          <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={styles.filterTitle}>Buscar por nombre:</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor="#777"
            value={searchName}
            onChangeText={setSearchName}
          />
          <Button 
            variant="solid" 
            size="sm" 
            action="primary" 
            className="bg-white" 
            style={styles.searchButton}
          >
          <ButtonText className="text-black">Buscar</ButtonText>
          </Button>
        </ScrollView>
      </View>

      {/* 🔹 Tabla */}
      <View style={styles.horizontalContainer}>
          <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.horizontalContainer}
          >
          {/* Tabla de usuarios */}
          <Card size="md" variant="elevated" className="m-3 w-11/12" style={{...styles.card, backgroundColor: '#f0f0f0' }}>
          
            {/* Encabezado tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerCellName}>Nombre Completo</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator, { right: 1.5, paddingRight: 2.5 }]} />
              <Text style={styles.headerCellEmail}>Correo</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator, { right: 12, paddingLeft: 2.2 }]} />
              <Text style={styles.headerCellRole}>Rol</Text>
            </View>

            {/* Contenido tabla */}
            <ScrollView style={styles.tableContainer}>
              {users.map((u, i) => (
                <TouchableOpacity
                    key={i}
                    style={[
                    styles.tableRow,
                    selectedUser?.correo === u.correo && { backgroundColor: '#d0e6ff' }, // resaltado
                    ]}
                    onPress={() => {
                    setSelectedUser(u);
                    setSelectedRole(u.rol);
                    }}
                    activeOpacity={0.7} // le da feedback visual
                >
                    <Text style={styles.tableCellName}>{u.nombre}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellEmail}>{u.correo}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellRole}>{u.rol}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* 🔹 Selector de rol + botón */}
            <View style={styles.modifyContainer}>
                <Picker
                selectedValue={selectedRole}
                style={styles.picker}
                dropdownIconColor="#000"
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                >
                <Picker.Item label="Administrador" value="Administrador" />
                <Picker.Item label="Técnico" value="Técnico" />
                <Picker.Item label="Encargado" value="Encargado" />
                <Picker.Item label="Docente" value="Docente" />
                <Picker.Item label="Estudiante" value="Estudiante" />
                </Picker>

                <Button
                onPress={handleModify}
                variant="solid"
                size="sm"
                action="primary"
                className="bg-blue-500"
                style={styles.modifyButton}
                >
                <ButtonText className="text-white">Modificar</ButtonText>
                </Button>
            </View>

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
    width: '25%',
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
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#000',
    fontWeight: '500',
    backgroundColor: '#f0f0f0',
  },
  searchButton: {
    height: 40,
    justifyContent: 'center',
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
    width: 1000,
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
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    backgroundColor: '#ffffffff',
  },
  headerCellName: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  headerCellEmail: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  headerCellRole: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    paddingLeft: 7,
    marginTop: 8,
    marginBottom: 8,
  },
  tableCellName: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 8,
    paddingLeft: 15,
  },
  tableCellEmail: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 8,
    paddingLeft: 15,
  },
  tableCellRole: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    paddingLeft: 15,
    paddingVertical: 8,
  },
  verticalSeparator: {
    width: 2,              // grosor de la línea
    backgroundColor: '#ccc', // color gris claro
    alignSelf: 'stretch',    // 🔹 hace que cubra toda la altura de la fila
  },
    actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    backgroundColor: '#f0f0f0',
  },
    picker: {
    height: 40,
    width: 200,
    backgroundColor: '#fdfdfdff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    color: '#000',
    fontWeight: '600',
  },
    modifyButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
    modifyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
    backgroundColor: '#f0f0f0',
  },

});