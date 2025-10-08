import { View } from '@/components/Themed';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Image , StyleSheet} from 'react-native';


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
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  const handleRespChange =
    (idx: number, field: keyof Responsible) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => {
        const copy = [...v.responsables];
        copy[idx] = { ...copy[idx], [field]: e.target.value };
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
    // Si no pasas onSubmit, por defecto muestra en consola:
    if (!onSubmit) {
      // eslint-disable-next-line no-console
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
          contentContainerStyle={styles.horizontalContainer}
  
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
    <View className="max-h-[90vh] overflow-y-auto pb-4">

      <View className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-black">Perfil de laboratorio</h1>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* Nombre */}
          <label className="block text-sm font-medium text-gray-700">
            Nombre
            <input
              type="text"
              value={values.nombre}
              onChange={handleChange("nombre")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50"
              placeholder=""
            />
          </label>

          {/* Código */}
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Código
            <input
              type="text"
              value={values.codigo}
              onChange={handleChange("codigo")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50"
              placeholder=""
            />
          </label>

          {/* Ubicación */}
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Ubicación y escuela/departamento asociado
            <input
              type="text"
              value={values.ubicacion}
              onChange={handleChange("ubicacion")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50"
              placeholder=""
            />
          </label>

          {/* Responsables */}
          <View className="mt-4">
            <span className="block text-sm font-medium text-gray-700">
              Responsables
            </span>

            {/* Encabezados (visuales) */}
            <View className="mt-2 hidden gap-3 text-xs text-gray-500 md:grid md:grid-cols-12">
              <View className="md:col-span-4">Nombre</View>
              <View className="md:col-span-5">Correo Institucional</View>
              <View className="md:col-span-3">Teléfono</View>
            </View>

            <View className="mt-1 max-h-40 overflow-y-auto rounded-md border border-gray-200 p-2">
              {values.responsables.map((r, idx) => (
                <View
                  key={idx}
                  className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-12"
                >
                  <input
                    type="text"
                    value={r.name}
                    onChange={handleRespChange(idx, "name")}
                    placeholder="Nombre"
                    className="md:col-span-4 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50 text-gray-700"
                  />
                  <input
                    type="email"
                    value={r.email}
                    onChange={handleRespChange(idx, "email")}
                    placeholder="Correo Institucional"
                    className="md:col-span-5 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50 text-gray-700"
                  />
                  <View className="md:col-span-3 flex gap-2">
                    <input
                      type="tel"
                      value={r.phone}
                      onChange={handleRespChange(idx, "phone")}
                      placeholder="Teléfono"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50 text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeResponsible(idx)}
                      className="shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-200 bg-gray-50 text-gray-700"
                      aria-label="Eliminar responsable"
                    >
                      ✕
                    </button>
                  </View>
                </View>
              ))}

              <View className="mt-1">
                <button
                  type="button"
                  onClick={addResponsible}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-200 text-gray-700"
                >
                  +
                </button>
              </View>
            </View>
          </View>

          {/* Políticas */}
          <label className="mt-4 block text-sm font-medium text-gray-700">
            Polticas de uso
            <textarea
              value={values.politicas}
              onChange={handleChange("politicas")}
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 bg-gray-50"
              placeholder=""
            />
          </label>

          {/* Botón Modificar */}
          <View className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-60"
            >
              {submitting ? "Guardando..." : "Modificar"}
            </button>
          </View>
        </form>
      </View>

    </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

