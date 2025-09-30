import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { bitacoraRec } from '@/model/bitacoraRecursos';
import { recursos, recursosFijos, responsable, setBitRec } from '@/model/listStorage';
import { getUser } from '@/model/login';
import { createBitRecurso, readBitRecursos } from '@/services/moduloTecEnc_service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function registroMantenimeinto() {


    const router = useRouter();
    const userId = getUser();
    const params = useLocalSearchParams<{ mail: string }>();
    const userMail = params.mail;
    const [recurso, setRecurso] = useState("");
    const [showList, setShowList] = useState(false);
    const [observaciones, setObservaciones] = useState("");

    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [anio, setAnio] = useState("");

    const idUser = getUser();
    const idUsrLab = responsable?.idLab
    
    const recursosFijosMostrar = recursos.filter((recurso) =>
        recursosFijos.some((rf) => rf.idRec === recurso.idRec)
    );
    const recursosFijosLabActual = recursosFijosMostrar.filter(
        (recurso) => recurso.idLab === Number(idUsrLab)
    );

    const actualizarLista = async (recurso: Number, desc: String, fecha: Date) => {
       
        const nuevaEntradaRec: bitacoraRec = {
        idBitac: 0,
        idRecurso: Number(recurso),
        idUsuario: Number(idUser),
        accion: "Mantenimiento",
        fecha: fecha,
        descripcion: `${desc}`,
        };
        
        const resp = await createBitRecurso(nuevaEntradaRec);
        const resbitRec = await readBitRecursos();
        setBitRec(resbitRec.data);
        router.replace('/tecnicos/mantenimiento');
        
    }
    

    const handleRegistro = () => {
        const fecha = new Date(Number(anio), Number(mes), Number(dia) )
        console.log("Usuario conectado:", userId);
        console.log(fecha);
        console.log(observaciones);
        console.log(Number(recurso));
        actualizarLista(Number(recurso), observaciones, fecha);
    };
    const handleCancelar = () => {
        router.replace('/tecnicos/mantenimiento');
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContentV}>
                <View style={styles.containerCard}>
                    <FormControl className="p-4 border border-outline-200 rounded-lg w-full" style={styles.card}>
                    <VStack className="gap-4">
                        <Heading className="text-typography-900 text-black">Registrar Mantenimiento</Heading>
                        <Text className="text-typography-500 text-black">Recurso:</Text>

                        <Button
                            action="primary"
                            size="md"
                            onPress={() => setShowList(!showList)}
                        >
                            <ButtonText>{recursos.find((r) => r.idRec === Number(recurso))?.nombre || "Selecciona un recurso"}</ButtonText>
                        </Button>
                        {showList && (
                            <View style={{
                                position: 'absolute',
                                top: 50,
                                left: 0,
                                right: 0,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#fff',
                                maxHeight: 200,
                                zIndex: 10,
                            }}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentV}>
                                    {recursosFijosLabActual.map(item => (
                                    <TouchableOpacity
                                        key={String(item.idRec)}
                                        onPress={() => {
                                        setRecurso(String(item.idRec));
                                        setShowList(false);
                                        }}
                                        style={{ padding: 10 }}
                                    >
                                        <Text className="text-black">{recursos.find((r) => r.idRec === item.idRec)?.nombre || "Desconocido"}</Text>
                                    </TouchableOpacity>
                                    
                                    ))} 
                                </ScrollView>
                            </View>
                            )}
                 

                        <VStack space="xs">
                        <Text className="text-typography-500 text-black">Fecha:</Text>
                        </VStack>
                        <View style={{ flexDirection: "row", gap: 10 , backgroundColor: '#ffffff' }}>
                            <Input style={{ width: 60 }}>
                                <InputField
                                style={{ flex: 1, backgroundColor: '#ffffff'  }}
                                className="text-black"
                                keyboardType="numeric"
                                maxLength={2}
                                placeholder="DD"
                                value={dia}
                                onChangeText={(text) => setDia(text.replace(/[^0-9]/g, ""))}
                                />
                            </Input>

                            <Input style={{ width: 60 }}>
                                <InputField
                                style={{ flex: 1, backgroundColor: '#ffffff'  }}
                                className="text-black"
                                keyboardType="numeric"
                                maxLength={2}
                                placeholder="MM"
                                value={mes}
                                onChangeText={(text) => setMes(text.replace(/[^0-9]/g, ""))}
                                />
                            </Input>

                            <Input style={{ width: 80 }}>
                                <InputField
                                style={{ flex: 1, backgroundColor: '#ffffff' }}
                                className="text-black"
                                keyboardType="numeric"
                                maxLength={4}
                                placeholder="YYYY"
                                value={anio}
                                onChangeText={(text) => setAnio(text.replace(/[^0-9]/g, ""))}
                                />
                            </Input>
                        </View>
                        <Text className="text-typography-500 text-black">Responsable:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            value={userMail || " No hay"}
                            editable={false}
                            />
                        </Input>
                        <Text className="text-typography-500 text-black">Descripcion:</Text>
                        <Input>
                            <InputField
                            className="text-black"
                            placeholder="Escriba observaciones"
                            value={observaciones}
                            onChangeText={setObservaciones}
                            />
                        </Input>
                        <Button className="ml-auto" variant='solid' action="secondary" onPress={handleRegistro}
                                disabled={
                                    !dia || !mes || !anio || !observaciones || !recurso
                                }>
                            <ButtonText>Registrar</ButtonText>
                        </Button>
                        <Button className="ml-auto" variant="solid" action="secondary" onPress={handleCancelar}>
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                    </VStack>
                    </FormControl>
                </View>
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
    containerCard: {
        flex: 1,
        width: '150%',
        alignItems: 'center', 
        backgroundColor: '#ffffffff',
        padding: 50,
        position: 'relative',
    },
    scrollContentV: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 50,
  },
});