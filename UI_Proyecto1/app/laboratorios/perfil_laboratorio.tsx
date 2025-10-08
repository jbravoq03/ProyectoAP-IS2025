import { router } from "expo-router";
import React, { useState } from "react";

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

export default function LaboratoryProfileForm({
  initialValues,
  onSubmit,
  submitting = false,
}: Props) {
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

  const handleLaboratorios = () => {
    // Redirige al inicio de sesion
      router.replace('/laboratorios/dashboard');
  };

  return (
    
    <div className="p-4">
      <button
        type="button"
        onClick={handleLaboratorios}
        className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-60"
      >
        Atras
      </button>

    {/* scroll view */}
    <div className="max-h-[90vh] overflow-y-auto pb-4">

    <div className="w-full max-w-3xl mx-auto">
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
        <div className="mt-4">
          <span className="block text-sm font-medium text-gray-700">
            Responsables
          </span>

          {/* Encabezados (visuales) */}
          <div className="mt-2 hidden gap-3 text-xs text-gray-500 md:grid md:grid-cols-12">
            <div className="md:col-span-4">Nombre</div>
            <div className="md:col-span-5">Correo Institucional</div>
            <div className="md:col-span-3">Teléfono</div>
          </div>

          <div className="mt-1 max-h-40 overflow-y-auto rounded-md border border-gray-200 p-2">
            {values.responsables.map((r, idx) => (
              <div
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
                <div className="md:col-span-3 flex gap-2">
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
                </div>
              </div>
            ))}

            <div className="mt-1">
              <button
                type="button"
                onClick={addResponsible}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-200 text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

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
        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-60"
          >
            {submitting ? "Guardando..." : "Modificar"}
          </button>
        </div>
      </form>
    </div>

    </div>

    </div>
  );
}
