import { Text, View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput } from 'react-native';


type Responsible = {
  name: string;
  email: string;
  phone: string;
};

export interface LaboratoryProfileValues {
  nombre: string;
  codigo: string;
  ubicacion: string;
  responsables: Responsible[];
  politicas: string;
}

interface Props {
  initialValues?: Partial<LaboratoryProfileValues>;
  onSubmit?: (values: LaboratoryProfileValues) => void;
  submitting?: boolean;
}

const defaultValues: LaboratoryProfileValues = {
  nombre: "",
  codigo: "",
  ubicacion: "",
  responsables: [{ name: "", email: "", phone: "" }],
  politicas: "",
};




export default function dashboardLabs({
  initialValues,
  onSubmit,
  submitting = false,
}: Props) {
  
  const router = useRouter();
  const handleLogout = () => {
    // Redirige al inicio de sesion
      router.replace('/');
  };

  
  const [values, setValues] = useState<LaboratoryProfileValues>({
    ...defaultValues,
    ...initialValues,
    responsables:
      initialValues?.responsables && initialValues.responsables.length > 0
        ? initialValues.responsables
        : defaultValues.responsables,
  });

  const handleChange =
    (field: keyof LaboratoryProfileValues) =>
    (text: string) => {
      setValues((v) => ({ ...v, [field]: text }));
    };

  const handleRespChange =
  (idx: number, field: keyof Responsible) =>
  (text: string) => {
    setValues((v) => {
      const copy = [...v.responsables];
      copy[idx] = { ...copy[idx], [field]: text };
      return { ...v, responsables: copy };
    });
  };

  const addResponsible = () =>
    setValues((v) => ({
      ...v,
      responsables: [...v.responsables, { name: "", email: "", phone: "" }],
    }));

  const removeResponsible = (idx: number) =>
    setValues((v) => ({
      ...v,
      responsables: v.responsables.filter((_, i) => i !== idx),
    }));

  const submit = () => {
    onSubmit?.(values);
    if (!onSubmit) {
      console.log("Perfil de laboratorio enviado:", values);
    }
  };

  const handlePerfilLaboratorio = () => {
    // Redirige al inicio de sesion
      router.replace('/laboratorios/perfil_laboratorio');
  };
  const handleEquipo = () => {
    // Redirige al equipo
      router.replace('/laboratorios/equipo');
  };
  const handleCalendario = () => {
    // Redirige al calendario
      router.replace('/laboratorios/calendario');
  };
  const handleRecursos = () => {
    // Redirige a recursos
      router.replace('/laboratorios/recursos');
  };
  const handleHistorial = () => {
    // Redirige al historial del laboratorio
      router.replace('/laboratorios/historialLaboratorio');
  }

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, gap: 8 }}
  
        >
          <Image
            source={require('../../assets/images/tec.png')} 
            style={{ width: 150, height: 40}}
            resizeMode="contain"
            alt="Logo"
          />
          <Button onPress={handleEquipo} variant="solid" className="bg-white" size="md" action="primary" >
            <ButtonText className="text-black">Equipo</ButtonText>
          </Button>
          <Button onPress={handleCalendario} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Calendario de disponibilidad</ButtonText>
          </Button>
          <Button onPress={handleRecursos} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Recuros reservables</ButtonText>
          </Button>
          <Button onPress={handleHistorial} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Historial del laboratorio</ButtonText>
          </Button>
          <Button onPress={handleLogout} variant="solid" className="bg-white" size="md" action="primary">
            <ButtonText className="text-black">Cerrar Sesión</ButtonText>
          </Button>
        </ScrollView>
      </View>
      
      <View style={styles.line} />
      {/* Fin Menú principal*/}

      {/* scroll view */}
      <ScrollView
        style={{ maxHeight: '90%', backgroundColor: '#fff', }}
        contentContainerStyle={{ paddingBottom: 16, backgroundColor: '#fff', }}
      >
        <View style={{ width: '100%', maxWidth: 768, alignSelf: 'center', backgroundColor: '#fff', }}>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#000', backgroundColor: '#fff', }}>
            Perfil de laboratorio
          </Text>

          {/* Formulario */}
          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              backgroundColor: '#fff',
              padding: 20,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
          >
            {/* Nombre */}
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Nombre</Text>
            <TextInput
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              placeholder=""
              style={styles.input}
            />

            {/* Código */}
            <Text style={[styles.label, { marginTop: 16 }]}>Código</Text>
            <TextInput
              value={values.codigo}
              onChangeText={handleChange('codigo')}
              placeholder=""
              style={styles.input}
            />

            {/* Ubicación */}
            <Text style={[styles.label, { marginTop: 16 }]}>
              Ubicación y escuela/departamento asociado
            </Text>
            <TextInput
              value={values.ubicacion}
              onChangeText={handleChange('ubicacion')}
              placeholder=""
              style={styles.input}
            />

            {/* Responsables */}
            <View style={{ marginTop: 16, backgroundColor: '#fff', }}>
              <Text style={styles.label}>Responsables</Text>

              {/* Encabezado visual */}
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 4,
                  backgroundColor: '#fff',
                }}
              >
                <Text style={styles.headerSmall}>Nombre</Text>
                <Text style={styles.headerSmall}>Correo</Text>
                <Text style={styles.headerSmall}>Teléfono</Text>
              </View>

              {/* Lista de responsables */}
              <ScrollView
                style={{
                  marginTop: 8,
                  maxHeight: 160,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {values.responsables.map((r, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                      gap: 6,
                      backgroundColor: '#fff',
                    }}
                  >
                    <TextInput
                      value={r.name}
                      onChangeText={handleRespChange(idx, 'name')}
                      placeholder="Nombre"
                      style={[styles.input, { flex: 4 }]}
                    />
                    <TextInput
                      value={r.email}
                      onChangeText={handleRespChange(idx, 'email')}
                      placeholder="Correo Institucional"
                      keyboardType="email-address"
                      style={[styles.input, { flex: 5 }]}
                    />
                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', }}>
                      <TextInput
                        value={r.phone}
                        onChangeText={handleRespChange(idx, 'phone')}
                        placeholder="Teléfono"
                        keyboardType="phone-pad"
                        style={[styles.input, { flex: 1 }]}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onPress={() => removeResponsible(idx)}
                        style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}
                      >
                        <ButtonText>✕</ButtonText>
                      </Button>
                    </View>
                  </View>
                ))}

                <View style={{ marginTop: 8 }}>
                  <Button
                    variant="outline"
                    onPress={addResponsible}
                    style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}
                  >
                    <ButtonText>+</ButtonText>
                  </Button>
                </View>
              </ScrollView>
            </View>

            {/* Políticas */}
            <Text style={[styles.label, { marginTop: 16 }]}>Políticas de uso</Text>
            <TextInput
              value={values.politicas}
              onChangeText={handleChange('politicas')}
              placeholder=""
              multiline
              numberOfLines={3}
              style={[styles.input, { textAlignVertical: 'top' }]}
            />

            {/* Botón Modificar */}
            <View style={{ marginTop: 24 }}>
              <Button
                onPress={submit}
                isDisabled={submitting}
                style={{
                  backgroundColor: '#000',
                  borderRadius: 8,
                  paddingVertical: 10,
                  justifyContent: 'center',
                }}
              >
                <ButtonText style={{ color: '#fff' }}>
                  {submitting ? 'Guardando...' : 'Modificar'}
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    backgroundColor: '#fff',
  },
  horizontalContainer: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  gap: 8, 
  paddingVertical: 10,
  paddingBottom: 0,
  maxWidth: '100%',
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#fff',
  },
   label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    backgroundColor: '#fff',
  },
  headerSmall: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    fontSize: 14,
    color: '#374151',
    
  },
});

