import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { political_parties } from "../candidant/partiesData";

// Simple accordion
const SimpleAccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 bg-gray-100 font-semibold"
      >
        {title}
      </button>

      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

const PoliticalPartie = () => {
  const { id } = useParams();

  // Buscar partido por ID
  const partido = political_parties.find((p) => p.id === Number(id));

  if (!partido) {
    return (
      <p className="text-center mt-10 text-red-500">
        Partido no encontrado.
      </p>
    );
  }

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");

  const candidaturasData = partido.otras_candidaturas ?? [];

  // Filtros dinámicos
  const departamentos = [
    ...new Set(candidaturasData.map((c) => c.departamento)),
  ];

  const provincias = departamento
    ? [
        ...new Set(
          candidaturasData
            .filter((c) => c.departamento === departamento)
            .map((c) => c.provincia)
        ),
      ]
    : [];

  const distritos = provincia
    ? [
        ...new Set(
          candidaturasData
            .filter((c) => c.provincia === provincia)
            .map((c) => c.distrito)
        ),
      ]
    : [];

  const filteredCandidatos = candidaturasData.filter((c) => {
    return (
      (!departamento || c.departamento === departamento) &&
      (!provincia || c.provincia === provincia) &&
      (!distrito || c.distrito === distrito)
    );
  });

  return (
    <div className="p-6">

      {/* ENCABEZADO */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={partido.logo}
          className="h-20 w-20 rounded-md"
          alt={partido.nombre}
        />
        <div>
          <h1 className="text-3xl font-bold">{partido.nombre}</h1>
          <p className="text-gray-600">{partido.descripcion}</p>
        </div>
      </div>

      {/* PLANCHA PRESIDENCIAL */}
      <SimpleAccordionItem title="Plancha Presidencial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partido.plancha.map((miembro, index) => (
            <div
              key={index}
              className="shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{miembro.nombre}</h3>
                <p className="text-gray-700 font-medium">{miembro.puesto}</p>
                <p className="text-gray-500 text-sm">
                  {miembro.descripcion}
                </p>
              </div>

              <div className="h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={miembro.imagen}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </SimpleAccordionItem>

      {/* PLAN DE GOBIERNO */}
      <SimpleAccordionItem title="Plan de Gobierno">
        <p>
          {partido.plan_gobierno ??
            "Este partido aún no sube su plan de gobierno."}
        </p>
      </SimpleAccordionItem>

      {/* OTRAS CANDIDATURAS */}
      <SimpleAccordionItem title="Otras Candidaturas">
        
        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border p-2 rounded-md"
            value={departamento}
            onChange={(e) => {
              setDepartamento(e.target.value);
              setProvincia("");
              setDistrito("");
            }}
          >
            <option value="">Departamento</option>
            {departamentos.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={provincia}
            onChange={(e) => {
              setProvincia(e.target.value);
              setDistrito("");
            }}
            disabled={!departamento}
          >
            <option value="">Provincia</option>
            {provincias.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            disabled={!provincia}
          >
            <option value="">Distrito</option>
            {distritos.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidatos.map((cand, i) => (
            <div
              key={i}
              className="shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{cand.nombre}</h3>
                <p className="text-gray-700 font-medium">{cand.puesto}</p>
                <p className="text-gray-500 text-sm">{cand.descripcion}</p>
                <p className="text-sm font-semibold text-blue-600">
                  {cand.tipo}
                </p>
              </div>

              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={cand.imagen}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>
            </div>
          ))}

          {filteredCandidatos.length === 0 && (
            <p className="text-gray-500">No se encontraron candidatos.</p>
          )}
        </div>
      </SimpleAccordionItem>
    </div>
  );
};

export default PoliticalPartie;
