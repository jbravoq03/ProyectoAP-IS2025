import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Picker } from '@react-native-picker/picker';


import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Rol } from '@/model/roles';
import { usuario } from '@/model/usuarios';
import { buscarUsuarios, readRoles, readUsuarios, updateRolUsuario } from '@/services/moduloAdmin_service';

export default function gestionusuariosAdmins() {

  const router = useRouter();

  const handleReturn = () => {
    // Redirige al inicio de sesion
      router.replace('/administradores/dashboard');
  };

  const [searchName, setSearchName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Number>(0);
  const [selectedUser, setSelectedUser] = useState<usuario | null>(null);
  const [users, setUsers] = useState<usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el nombre del rol basado en el idRol
  const getNombreRol = (idRol: Number): string => {
    const rol = roles.find(r => r.idRol === idRol);
    return rol ? rol.nombre : 'Desconocido';
  };

  // Cargar usuarios y roles
  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usuariosRes, rolesRes] = await Promise.all([
        readUsuarios(),
        readRoles(),
      ]);

      if (usuariosRes.data && rolesRes.data) {
        setUsers(usuariosRes.data);
        setRoles(rolesRes.data);
      } else {
        setError('Error al cargar los datos');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Buscar usuarios por nombre
  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchName.trim() === '') {
        // Si el campo de búsqueda está vacío, recargar todos los usuarios
        await cargarDatos();
        return;
      }

      const resultado = await buscarUsuarios(searchName);
      
      if (resultado.data) {
        setUsers(resultado.data);
      } else {
        setError('Error en la búsqueda');
      }
    } catch (err) {
      setError('Error al buscar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = async () => {
    const isWeb = typeof window !== 'undefined' && window.document;
    
    if (!selectedUser) {
      if (isWeb) {
        window.alert('Por favor, selecciona un usuario primero.');
      } else {
        Alert.alert('Aviso', 'Por favor, selecciona un usuario primero.');
      }
      return;
    }

    if (!selectedRole || selectedRole === 0) {
      if (isWeb) {
        window.alert('Por favor, selecciona un rol.');
      } else {
        Alert.alert('Aviso', 'Por favor, selecciona un rol.');
      }
      return;
    }

    // Validación de cambio de rol según correo
    const correo = selectedUser.correoInsti;

    let permitido = false;
    let mensaje = '';

    // Lógica de validación basada en el dominio del correo
    if (correo.endsWith('@estudiante.tec.ac.cr') || correo.endsWith('@estudiantec.cr')) {
      if (["2", "4"].includes(selectedRole.toString())) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Usuario o Tecnico/Encargado a correos de estudiante.';
        console.log("Rol actual: " + selectedUser.idRol);
        console.log("Rol a cambiar: " + selectedRole);
      }
    } else if (correo.endsWith('@itcr.ac.cr')) {
      if (["2", "4"].includes(selectedRole.toString())) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Usuario o Tecnico/Encargado a correos de profesor.';
        console.log("Rol actual: " + selectedUser.idRol);
        console.log("Rol a cambiar: " + selectedRole);
      }
    } else if (correo.endsWith('@tec.ac.cr')) {
      if (["1", "3", "4"].includes(selectedRole.toString())) {
        permitido = true;
      } else {
        mensaje = 'Solo puede asignar Administrador, Lab/Departamento o Tecnico/Encargado a correos institucionales.';
        console.log("Rol actual: " + selectedUser.idRol);
        console.log("Rol a cambiar: " + selectedRole);
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
    const confirmMessage = `¿Deseas cambiar el rol de ${selectedUser.nombre} a ${getNombreRol(Number(selectedRole))}?`;
    
    if (isWeb) {
      const confirm = window.confirm(confirmMessage);
      if (confirm) {
        try {
          const resultado = await updateRolUsuario(selectedUser.idUsr, selectedRole);
          
          if (resultado.success) {
            window.alert('Rol actualizado correctamente.');
            // Recargar la lista de usuarios
            await cargarDatos();
            // Limpiar selección
            setSelectedUser(null);
            setSelectedRole(0);
          } else {
            window.alert('Error al actualizar el rol.');
          }
        } catch (error) {
          window.alert('Error al actualizar el rol.');
        }
      }
    } else {
      Alert.alert(
        'Confirmar cambio',
        confirmMessage,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                const resultado = await updateRolUsuario(selectedUser.idUsr, selectedRole);
                
                if (resultado.success) {
                  Alert.alert('Éxito', 'Rol actualizado correctamente.');
                  // Recargar la lista de usuarios
                  await cargarDatos();
                  // Limpiar selección
                  setSelectedUser(null);
                  setSelectedRole(0);
                } else {
                  Alert.alert('Error', 'Error al actualizar el rol.');
                }
              } catch (error) {
                Alert.alert('Error', 'Error al actualizar el rol.');
              }
            },
          },
        ]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={cargarDatos} variant="solid" size="sm">
          <ButtonText>Reintentar</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.horizontalScrollContent}
    >
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
            onPress={handleSearch}
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
                    selectedUser?.correoInsti === u.correoInsti && { backgroundColor: '#d0e6ff' }, // resaltado
                    ]}
                    onPress={() => {
                      setSelectedUser(u);
                      setSelectedRole(Number(u.idRol));
                    }}
                    activeOpacity={0.7} // le da feedback visual
                >
                    <Text style={styles.tableCellName}>{u.nombre}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellEmail}>{u.correoInsti}</Text>
                    <View style={styles.verticalSeparator} />
                    <Text style={styles.tableCellRole}>{getNombreRol(u.idRol)}</Text>
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
                <Picker.Item label="Seleccione un rol" value={0} />
                  {roles.map((rol) => (
                    <Picker.Item label={rol.nombre} value={rol.idRol} />
                  ))}
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
  horizontalScrollContent: {
    flexGrow: 1,
  },
  horizontalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginRight: 15,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
    backgroundColor : '#ffff',
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
    backgroundColor : '#ffff',
  },
  headerCellEmail: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  headerCellRole: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  
  // 🔹 TABLE CELLS - MISMOS FLEX QUE EL HEADER
  tableCellName: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12, // Mismo padding que header
    textAlign: 'left',
    backgroundColor : '#ffff',
  },
  tableCellEmail: {
    flex: 2,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
  },
  tableCellRole: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 12,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor : '#ffff',
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