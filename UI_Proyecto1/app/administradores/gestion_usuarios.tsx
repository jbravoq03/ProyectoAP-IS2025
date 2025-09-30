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
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  type User = { nombre: string; correo: string; rol: string };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { nombre: 'Juan Pérez', correo: 'juan.perez@tec.ac.cr', rol: 'Administrador' },
    { nombre: 'María Gómez', correo: 'maria.gomez@tec.ac.cr', rol: 'Tecnico/Encargado' },
    { nombre: 'Carlos Rojas', correo: 'carlos.rojas@itcr.ac.cr', rol: 'Usuario' },
    { nombre: 'Ana Rodríguez', correo: 'ana.rodriguez@itcr.ac.cr', rol: 'TTecnico/Encargado' },
    { nombre: 'Luis Fernández', correo: 'luis.fernandez@estudiante.tec.ac.cr', rol: 'Usuario' },
    { nombre: 'Sofía Ramírez', correo: 'sofia.ramirez@estudiante.tec.ac.cr', rol: 'Tecnico/Encargado' },
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

    // Validación de cambio de rol según correo
    const correo = selectedUser.correo;
    let permitido = false;
    let mensaje = '';
    if (correo.endsWith('@estudiante.tec.ac.cr')) {
      if (["Usuario", "Tecnico/Encargado"].includes(selectedRole)) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Usuario, Tecnico/Encargado a correos de estudiante.';
      }
    } else if (correo.endsWith('@itcr.ac.cr')) {
      if (["Usuario", "Técnico", "Encargado"].includes(selectedRole)) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Usuario, Tecnico o Encargado a correos de profesor.';
      }
    } else if (correo.endsWith('@tec.ac.cr')) {
      if (["Administrador", "Lab/Departamento", "Tecnico/Encargado"].includes(selectedRole)) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Administrador, Lab/Departamento o Tecnico/Encargado a correos institucionales.';
      }
    } else {
      mensaje = 'Dominio de correo no reconocido para cambio de rol.';
    }

    if (!permitido) {
      if (isWeb) {
        window.alert(mensaje);
      } else {
        Alert.alert('No permitido', mensaje);
      }
      return;
    }

    // Confirmación y cambio de rol
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
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      {/* Inicio Menú principal*/}
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.horizontalContainer}
        >
          <Text style={{...styles.title, paddingBottom: 10, paddingLeft: 120, paddingRight: 30 }}>Gestión de usuarios y roles</Text>
          <Button onPress={handleReturn} variant="solid" className="bg-white" size="md" action="primary"
          style={{ alignContent: 'center', justifyContent: 'center' }}>
            <ButtonText className="text-black">Regresar</ButtonText>
          </Button>
        </ScrollView>
      </View>

      {/* 🔹 Filtros */}
      
      <View style={{...styles.filterContainer, flexDirection: 'column' }}>
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
              <View style={[styles.verticalSeparator]} />
              <Text style={styles.headerCellEmail}>Correo</Text>
              {/* Separador vertical */}
              <View style={[styles.verticalSeparator]} />
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
                    setSearchEmail(u.correo);
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
                <Picker.Item label="Usuario" value="Usuario" />
                <Picker.Item label="Lab/Departamento" value="Lab/Departamento" />
                <Picker.Item label="Tecnico/Encargado" value="Tecnico/Encargado" />
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
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
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
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
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
  card: {
    width: 1000,
    padding: 15,
    backgroundColor: '#fff',
    minHeight: 600,
  },
  tableContainer: {
    maxHeight: 1000, // espacio de elem mostrados sin scrollear
    width: '100%',
  },
  // 🔹 ESTILOS MEJORADOS PARA LA TABLA
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10, // Mismo padding que las filas
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10, // Mismo padding que el header
    backgroundColor: '#ffffffff',
  },
  
  // 🔹 HEADER CELLS - MISMOS FLEX QUE LAS CELDAS NORMALES
  headerCellName: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12, // Mismo padding vertical
    textAlign: 'left',
  },
  headerCellEmail: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  headerCellRole: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  
  // 🔹 TABLE CELLS - MISMOS FLEX QUE EL HEADER
  tableCellName: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12, // Mismo padding que header
    textAlign: 'left',
  },
  tableCellEmail: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  tableCellRole: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
  },
  
  verticalSeparator: {
    width: 1, // Reducido de 2 a 1 para mejor alineación
    backgroundColor: '#ccc',
    marginHorizontal: 5, // Espacio consistente
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