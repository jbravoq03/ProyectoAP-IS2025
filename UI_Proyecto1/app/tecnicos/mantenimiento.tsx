import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import {
    ArrowLeftIcon,
    Icon
} from '@/components/ui/icon';
import {
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { materiales } from '@/model/materiales';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function mantenimientos() {
  const router = useRouter();

   const handleMenu = () => {
      router.replace('/tecnicos/dashboard');
    };

    const handleRegistro = () => {
      router.replace(`/tecnicos/registro_mantenimiento`);
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
        <Button variant="solid" style={{backgroundColor: "#ffffffff", 
                                        borderColor: "#000000", 
                                        borderWidth: 2,}}
                                        size="sm" action="secondary" onPress={handleRegistro}>
            <ButtonText style={{ color: "#000" }}>Registrar Mantenimiento</ButtonText>
        </Button>
        
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContentV}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>

                    <Table style={styles.tableContent}>
                        <TableHeader style={styles.tableContent}>
                            <TableRow style={styles.tableContentRow}>
                                <TableHead style={styles.tableContent}>Registro</TableHead>
                                <TableHead style={styles.tableContent}>Responsable</TableHead>
                                <TableHead style={styles.tableContent}>Tipo</TableHead>
                                <TableHead style={styles.tableContent}>Fecha</TableHead>
                                <TableHead style={styles.tableContent}>Observaciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materiales.map((item) => ( 
                                <TableRow style={styles.tableContentRow} key={item.id}>
                                    <TableData style={styles.tableContent}>{item.nombre}</TableData>
                                    <TableData style={styles.tableContent}>{item.cantidad}</TableData>
                                    <TableData style={styles.tableContent}>{item.estado}</TableData>
                                    <TableData style={styles.tableContent}> {item.alerta ? 'Se debe reponer' : 'No es necesario reponer'}</TableData>
                                    <TableData style={styles.tableContent}>
                                    </TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </ScrollView>
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
  horizontalContainer: {
    backgroundColor: '#fff',
    borderColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    gap: 8, 
    paddingVertical: 10,
    paddingBottom: 0,
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
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
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
    marginBottom: 15,
  },
  scrollContentV: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
    paddingRight: 110,
    flexGrow: 1,
  },
  tableContent: {
    backgroundColor: "#ffffff", 
    color: "#000000",
    minWidth: 180 ,
  },
  tableContentRow: {
    borderBottomWidth: 1,
    borderColor: "#000",
  },
});