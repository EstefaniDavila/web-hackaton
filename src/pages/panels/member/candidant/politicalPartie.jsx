import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { title: "Trabajo por la seguridad ciudadana" },
  { title: "Impulso al desarrollo económico" },
  { title: "Mejoras en educación y salud" },
];

// Generador simple de hoja de vida corta
const generarHojaDeVidaCorta = (nombre) => {
  const universidades = [
    "Universidad Autónoma",
    "Universidad Tecnológica",
    "Universidad Nacional",
    "Instituto Superior Moderno",
    "Universidad del Caribe",
    "Universidad Central",
  ];

  return {
    full_name: nombre,
    edad: Math.floor(Math.random() * (65 - 30 + 1)) + 30,
    universidad: universidades[Math.floor(Math.random() * universidades.length)],
  };
};

/* --------------------- MODAL --------------------- */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
/* ------------------------------------------------ */

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

export default function PoliticalPartie() {
  const { id } = useParams();
  const { state: partyInfo } = useLocation();

  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState({ presidential: [], vice_1: [], vice_2: [], senate: [], diputy: [], andean_parliament: [] });
  const [candidaturas, setCandidaturas] = useState([]);
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState("");

  // Modal CV
  const [openModal, setOpenModal] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);
  const [curriculum, setCurriculum] = useState(null);

  const verHojaDeVida = async (candidateId) => {
    setOpenModal(true);
    setLoadingCV(true);

    // Intentar encontrar candidato en los datos cargados
    const candidato = (party?.presidential || []).find((p) => p.id === candidateId) ||
      (party?.vice_1 || []).find((p) => p.id === candidateId) ||
      (party?.vice_2 || []).find((p) => p.id === candidateId);

    if (!candidato) {
      // Si no lo encontramos, generamos un CV genérico con el id
      setCurriculum(generarHojaDeVidaCorta(`Candidato ${candidateId}`));
      setLoadingCV(false);
      return;
    }

    const cvSimulada = generarHojaDeVidaCorta(candidato.full_name);
    // Simular pequeña latencia
    await new Promise((res) => setTimeout(res, 400));

    setCurriculum(cvSimulada);
    setLoadingCV(false);
  };

  useEffect(() => {
    const base =
      "https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/member/candidates";

    const presidentsURL = `${base}/only_presidents_by_party/${id}`;
    const webURL = `${base}/web_by_party/${id}`;

    setLoading(true);

    Promise.all([
      fetch(presidentsURL, {
        headers: { "ngrok-skip-browser-warning": "1" },
      }).then((r) => r.json()).catch(() => ({ presidential: [], vice_1: [], vice_2: [] })),

      fetch(webURL, {
        headers: { "ngrok-skip-browser-warning": "1" },
      }).then((r) => r.json()).catch(() => ({ senate: [], deputy: [], andean_parliament: [] })),
    ])
      .then(([presidents, web]) => {
        const fullData = {
          presidential: presidents.presidential || [],
          vice_1: presidents.vice_1 || [],
          vice_2: presidents.vice_2 || [],

          senate: web.senate || [],
          diputy: web.deputy || [],
          andean_parliament: web.andean_parliament || [],
        };

        setParty(fullData);

        const all = [];
        Object.keys(fullData).forEach((key) => {
          fullData[key]?.forEach((cand) => {
            all.push({
              ...cand,
              cargo: key,
              departamento: cand.circumscription || "Nacional",
            });
          });
        });

        setCandidaturas(all);
      })
      .catch((e) => console.log("ERROR:", e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6">
      {/* ENCABEZADO */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={partyInfo?.logo || "/no-logo.png"}
          className="h-20 w-20 rounded-md"
          alt={partyInfo?.name}
        />
        <div>
          <h1 className="text-2xl font-bold">{partyInfo?.name}</h1>
          <p className="text-gray-600">
            Siglas: {partyInfo?.acronym?.toUpperCase()}
          </p>
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
                <p className="text-gray-700 font-medium">Candidato Presidencial</p>
              </div>

              <div className="h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={m.photo_url || "/no-photo.jpg"}
                  className="h-44 w-44 object-cover rounded-md"
                  alt={m.full_name}
                />
              </div>

              <div className="p-4 flex justify-center">
                <button
                  onClick={() => verHojaDeVida(m.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Ver Hoja de Vida
                </button>
              </div>
            </div>
          ))}
        </div>
      </SimpleAccordionItem>

      {/* OTRAS CANDIDATURAS */}
      <SimpleAccordionItem title="Otras Candidaturas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border p-2 rounded-md"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="senate">Senado</option>
            <option value="diputy">Diputados</option>
            <option value="andean_parliament">Parlamento Andino</option>
          </select>

          <select
            className="border p-2 rounded-md"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          >
            <option value="">Departamento</option>
            {[...new Set(candidaturas.map((c) => c.departamento))].map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidaturas
            .filter((c) => (!cargo || c.cargo === cargo) && (!departamento || c.departamento === departamento))
            .map((cand) => (
              <div key={cand.id} className="shadow-md border rounded-xl overflow-hidden bg-white">
                <div className="text-center p-4">
                  <h3 className="text-xl font-semibold">{cand.full_name}</h3>
                  <p className="text-gray-700 font-medium">{cand.position_type?.toUpperCase()}</p>
                  <p className="text-sm text-blue-600">{cand.circumscription}</p>
                </div>

                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img src={cand.photo_url || "/no-photo.jpg"} className="h-44 w-44 object-cover rounded-md" alt={cand.full_name} />
                </div>
              </div>
            ))}
        </div>
      </SimpleAccordionItem>

      {/* PLANES DE GOBIERNO */}
      <SimpleAccordionItem title="Planes de Gobierno">
        <iframe
          src={partyInfo?.pdf_url || "https://perulibre.pe/plan-bicentenario.pdf"}
          className="w-full h-[600px] border rounded-lg"
          title="Plan de Gobierno"
        />
      </SimpleAccordionItem>

      {/* COMPROMISOS */}
      <SimpleAccordionItem title="Compromisos del Candidato">
        <ul className="space-y-4 text-lg">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full">{i + 1}</span>
              {s.title}
            </motion.li>
          ))}
        </ul>
      </SimpleAccordionItem>

      {/* MODAL CV */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {loadingCV ? (
          <p>Cargando hoja de vida...</p>
        ) : curriculum ? (
          <div>
            <h2 className="text-xl font-bold mb-2">{curriculum.full_name}</h2>
            <p className="text-gray-700 mb-1"><strong>Edad:</strong> {curriculum.edad}</p>
            <p className="text-gray-700 mb-1"><strong>Universidad:</strong> {curriculum.universidad}</p>
          </div>
        ) : (
          <p>No se pudo cargar la hoja de vida.</p>
        )}
      </Modal>
    </div>
  );
}
