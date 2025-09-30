import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { BitAccion } from '@/model/bitacAcciones';
import { materiales, recursos, recursosFijos, setMateriales, setRecFijos } from '@/model/listStorage';
import { getUser } from '@/model/login';
import { Material } from '@/model/materiales';
import { RecursoFijo } from '@/model/recFijos';
import { createMaterial, createRecursoFijo, readMateriales, readRecFijos } from '@/services/moduloLab_service';
import { createBitAccion } from '@/services/moduloTecEnc_service';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function registroRecurso() {
  const [recurso, setRecurso] = useState(""); // Dropdown de recurso
  const [tipoRecurso, setTipoRecurso] = useState(""); // Dropdown de tipo
  const [showListRecurso, setShowListRecurso] = useState(false);
  const [showListTipo, setShowListTipo] = useState(false);
  const router = useRouter();
  
  const [codInv, setCodInv] = useState("");
  const [estado, setEstado] = useState("");

  const [cantidad, setCantidad] = useState("");
  const [medida, setMedida] = useState("");
  const [reorden, setReorden] = useState("");

  const idUser = getUser();

  console.log(recursos);


  const recursosDisponibles = recursos.filter(
    (r) => !recursosFijos.some((rf) => rf.idRec === r.idRec) && !materiales?.some((m) => m.idRec === r.idRec)
  );

  const tipos = ["Consumible", "Fijo"];

  const crearFijo = async (nuevoRecursoFijo: RecursoFijo) => {
    const resp = await createRecursoFijo(nuevoRecursoFijo);

    const resRecFijos = await readRecFijos();
    setRecFijos(resRecFijos.data);

    const nuevaEntrada: BitAccion = {
        idBitac: 0,
        idUsuario: Number(idUser), 
        accion: "Registro Recurso Fijo",
        descripcion: `Recurso Fijo creado con ID ${nuevoRecursoFijo.idRec} `,
        fecha: new Date(),
    };
    const resp3 = await createBitAccion(nuevaEntrada);

  }

  const crearMat = async (nuevoMat: Material) => {
    const resp = await createMaterial(nuevoMat);

    const resMat = await readMateriales();
    setMateriales(resMat.data);

    const nuevaEntrada: BitAccion = {
        idBitac: 0,
        idUsuario: Number(idUser), 
        accion: "Registro Material",
        descripcion: `Material creado con ID ${nuevoMat.idRec} `,
        fecha: new Date(),
    };
    const resp3 = await createBitAccion(nuevaEntrada);

  }

  const handleCrear = () => {
  if (tipoRecurso === "Fijo") {

    const nuevoRecursoFijo: RecursoFijo = {
        idFijo: 0,
        idRec: Number(recurso),
        codInv: codInv,
        estado: estado,
        ultMante: new Date().toISOString(),
    };

    console.log("Recurso Fijo creado:", nuevoRecursoFijo);
    crearFijo(nuevoRecursoFijo);

  } else if (tipoRecurso === "Consumible") {
    const nuevoMaterial: Material = {
        idMat: 0,
      idRec: Number(recurso),
      cantidad: cantidad,
      medida: medida,
      reorden: reorden,
    };
    console.log("Material creado:", nuevoMaterial);
    crearMat(nuevoMaterial);
  } else {
    console.warn("No se ha seleccionado tipo de recurso");
  }
  router.replace('/tecnicos/gestion_inventarios');
};

  const handleCancelar = () => {
    router.replace('/tecnicos/gestion_inventarios');
    };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentV}>
        <VStack className="gap-4">
         <Heading className="text-typography-900 text-black">Registrar Recurso</Heading>
          <Text className="text-black">Recurso:</Text>
          <Button action="primary" onPress={() => setShowListRecurso(!showListRecurso)}>
            <ButtonText>{recursos.find((r) => r.idRec === Number(recurso))?.nombre || "Selecciona un recurso"}</ButtonText>
          </Button>
          {showListRecurso && (
            <View style={styles.dropdown}>
              <ScrollView>
                {recursosDisponibles.map((r) => (
                  <TouchableOpacity key={Number(r.idRec)} onPress={() => { setRecurso(String(r.idRec)); setShowListRecurso(false); }} style={styles.item}>
                    <Text className="text-black">{r.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text className="text-black">Tipo:</Text>
          <Button action="primary" onPress={() => setShowListTipo(!showListTipo)}>
            <ButtonText>{tipoRecurso || "Selecciona un tipo"}</ButtonText>
          </Button>
          {showListTipo && (
            <View style={styles.dropdown}>
              {tipos.map((t) => (
                <TouchableOpacity key={t} onPress={() => { setTipoRecurso(t); setShowListTipo(false); }} style={styles.item}>
                  <Text className="text-black">{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {tipoRecurso === "Fijo" && (
            <>
              <Text className="text-black">Código Inventario:</Text>
              <Input>
                <InputField value={codInv} onChangeText={setCodInv} placeholder="Código Inventario" className="text-black" />
              </Input>
              <Text className="text-black">Estado:</Text>
              <Input>
                <InputField value={estado} onChangeText={setEstado} placeholder="Estado" className="text-black" />
              </Input>
            </>
          )}

          {tipoRecurso === "Consumible" && (
            <>
              <Text className="text-black">Cantidad:</Text>
              <Input>
                <InputField value={cantidad} onChangeText={setCantidad} placeholder="Cantidad" className="text-black" />
              </Input>
              <Text className="text-black">Medida:</Text>
              <Input>
                <InputField value={medida} onChangeText={setMedida} placeholder="Medida" className="text-black" />
              </Input>
              <Text className="text-black">Reorden:</Text>
              <Input>
                <InputField value={reorden} onChangeText={setReorden} placeholder="Nivel de reorden" className="text-black" />
              </Input>
            </>
          )}

          <Button
            onPress={handleCrear}
            disabled={!recurso || !tipoRecurso}
            action="secondary"
          >
            <ButtonText>Registrar</ButtonText>
          </Button>
          <Button
            onPress={handleCancelar}
            action="secondary"
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  scrollContentV: { flexGrow: 1, width: '100%', gap: 10 },
  dropdown: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', maxHeight: 200, zIndex: 10 },
  item: { padding: 10 },
});