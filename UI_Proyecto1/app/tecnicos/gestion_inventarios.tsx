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
import { getResponsables, materiales, recursos } from '@/model/listStorage';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function gestionInventarios() {
  const router = useRouter();
  const labId = getResponsables()?.idLab;


   const handleMenu = () => {
    // Redirige al inicio de sesion
      router.replace('/tecnicos/dashboard');
    };

    const handleRegistro = (id: String) => {
      console.log(id);
      router.replace(`/tecnicos/entrada?id=${id}`);
    };

    const handleSalida = (id: String) => {
      router.replace(`/tecnicos/salida?id=${id}`);
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
        <Text style={styles.title}>Gestion de Inventario</Text>
        <ScrollView  showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>

                  <Table style={styles.tableContent}>
                      <TableHeader style={styles.tableContent}>
                          <TableRow>
                              <TableHead style={styles.tableContent}>Elemento</TableHead>
                              <TableHead style={styles.tableContent}>Cantidad</TableHead>
                              <TableHead style={styles.tableContent}>Medida</TableHead>
                              <TableHead style={styles.tableContent}>Reorden</TableHead>
                              <TableHead style={styles.tableContent}>Acciones</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {materiales.filter((m) =>
                                recursos.some(
                                  (r) => r.idRec === Number(m.idRec) && r.idLab === Number(labId)
                                )
                              ).map((item) => ( 
                              <TableRow key={String(item.idMat)}>
                                  <TableData style={styles.tableContent}>{recursos.find(r => r.idRec === item.idRec)?.nombre ?? "Recurso desconocido"}</TableData>
                                  <TableData style={styles.tableContent}>{String(item.cantidad)}</TableData>
                                  <TableData style={styles.tableContent}>{String(item.medida)}</TableData>
                                  <TableData style={styles.tableContent}> {String(item.reorden)}</TableData>
                                  <TableData style={styles.tableContent}>
                                    <View style={styles.horizontalContainer}>
                                      <Button variant="solid" style={{backgroundColor: "#ffffffff", 
                                          borderColor: "#000000", 
                                          borderWidth: 2,}}
                                          size="sm" action="secondary" onPress={() => handleRegistro(String(item.idMat))}>
                                          <ButtonText style={{ color: "#000" }}>Entrada</ButtonText>
                                      </Button>
                                      <Button variant="solid" style={{backgroundColor: "#ffffffff", 
                                          borderColor: "#000000", 
                                          borderWidth: 2,}}
                                          size="sm" action="secondary" onPress={() => handleSalida(String(item.idMat))}>
                                          <ButtonText style={{ color: "#000" }}>Salida</ButtonText>
                                      </Button>
                                    </View>
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
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 80,
    paddingRight: 110,
  },
  tableContent: {
    backgroundColor: "#ffffff", 
    color: "#000000",
  }
});