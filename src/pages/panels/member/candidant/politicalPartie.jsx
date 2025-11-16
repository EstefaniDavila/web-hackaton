import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState(null);
  const [candidaturas, setCandidaturas] = useState([]);

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");

  useEffect(() => {
    fetch(
      `https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/member/candidates/all_by_party//${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setParty(data);

        // UNIFICAR TODAS LAS CANDIDATURAS
        const all = [];

        const sections = ["presidential", "vice_1", "vice_2", "senate"];

        sections.forEach((sec) => {
          if (data[sec]) {
            data[sec].forEach((cand) =>
              all.push({
                ...cand,
                tipo: sec,
                departamento: cand.circumscription || "Nacional",
                provincia: "",
                distrito: "",
              })
            );
          }
        });

        setCandidaturas(all);
      })
      .catch((e) => console.log("Error cargando partid →", e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!party) return <p className="p-6 text-red-500">Partido no encontrado.</p>;

  const departamentos = [...new Set(candidaturas.map((c) => c.departamento))];

  const provincias = departamento ? [] : [];
  const distritos = provincia ? [] : [];

  const filtered = candidaturas.filter((c) => {
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
          src={party.logo || "/no-logo.png"}
          className="h-20 w-20 rounded-md"
          alt={party.name}
        />
        <div>
          <h1 className="text-3xl font-bold">{party.name}</h1>
          <p className="text-gray-600">
            Representante: {party.representative?.full_name || "No registrado"}
          </p>
          <p className="text-gray-600">Siglas: {party.acronym}</p>
        </div>
      </div>

      {/* PLANCHA PRESIDENCIAL */}
      <SimpleAccordionItem title="Plancha Presidencial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {party.presidential?.map((m) => (
            <div
              key={m.id}
              className="shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{m.full_name}</h3>
                <p className="text-gray-700 font-medium">
                  Candidato Presidencial
                </p>
              </div>

              <div className="h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={m.photo_url || "/no-photo.jpg"}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
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
            disabled
          >
            <option value="">Provincia (viene después)</option>
          </select>

          <select
            className="border p-2 rounded-md"
            value={distrito}
            disabled
          >
            <option value="">Distrito (viene después)</option>
          </select>
        </div>

        {/* LISTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cand) => (
            <div
              key={cand.id}
              className="shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{cand.full_name}</h3>
                <p className="text-gray-700 font-medium">
                  {cand.position_type.toUpperCase()}
                </p>
                <p className="text-sm text-blue-600">
                  {cand.circumscription}
                </p>
              </div>

              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={cand.photo_url || "/no-photo.jpg"}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-500">No se encontraron candidatos.</p>
          )}
        </div>
      </SimpleAccordionItem>
    </div>
  );
};

export default PoliticalPartie;
