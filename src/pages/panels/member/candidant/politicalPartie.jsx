import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const candidaturasData = [
  {
    tipo: "Diputado",
    departamento: "Lima",
    provincia: "Lima",
    distrito: "Miraflores",
    nombre: "Juan Pérez",
    puesto: "Diputado",
    descripcion: "Comprometido con la transparencia.",
    imagen: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    tipo: "Senador",
    departamento: "Lima",
    provincia: "Lima",
    distrito: "Miraflores",
    nombre: "Ana Torres",
    puesto: "Senadora",
    descripcion: "Modernización del Estado.",
    imagen: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    tipo: "Parlamento Andino",
    departamento: "Cusco",
    provincia: "Cusco",
    distrito: "Santiago",
    nombre: "Luis Ramos",
    puesto: "Representante Andino",
    descripcion: "Integración regional y desarrollo.",
    imagen: "https://randomuser.me/api/portraits/men/89.jpg",
  },
];

const political_people = [
  {
    nombre: "Keiko Fujimori",
    puesto: "Presidenta del Perú",
    descripcion: "Lo está intentando desde que nací",
    imagen:
      "https://img.lpderecho.pe/wp-content/uploads/2025/11/KEIKO-MP-LPDERECHO.jpg",
  },
  {
    nombre: "Daniel Cabrera",
    puesto: "Primer vicepresidente",
    descripcion: "Partido moderno con visión de futuro.",
    imagen:
      "https://diariocorreo.pe/resizer/4_PVKx9cEC0vQ1VU9vbs7cacQtM=/800x445/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/6JJBHFZGTNEQHNII4EAJKDTW7M.jpg",
  },
  {
    nombre: "Estefani Davila",
    puesto: "Segunda vicepresidenta",
    descripcion: "Tradición democrática y social es mi lema.",
    imagen:
      "https://api.infocongresistasperu.pe/uploads/images/image-1692913441040-tania-estefany-ramirez-garcia.jpg",
  },
];


// ACORDEÓN SIMPLE

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

const politicalPartie = () => {
  const filteredParties = political_people;
  // Filtros
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");

  // Opciones dinámicas
    const departamentos = [...new Set(candidaturasData.map(c => c.departamento))];

    const provincias = departamento
        ? [...new Set(
            candidaturasData
            .filter(c => c.departamento === departamento)
            .map(c => c.provincia)
        )]
        : [];

    const distritos = provincia
        ? [...new Set(
            candidaturasData
            .filter(c => c.provincia === provincia)
            .map(c => c.distrito)
        )]
        : [];

    // Filtrado final
    const filteredCandidatos = candidaturasData.filter(c => {
        return (
        (departamento ? c.departamento === departamento : true) &&
        (provincia ? c.provincia === provincia : true) &&
        (distrito ? c.distrito === distrito : true)
        );
    });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Agrupación Política Fuerza Popular
      </h2>

      {/* =======================
        PLANCHA PRESIDENCIAL
      ======================== */}
      <SimpleAccordionItem title="Plancha Presidencial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {filteredParties.map((party, index) => (
            <div
              key={index}
              className="w-full max-w-sm shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{party.nombre}</h3>
                <p className="text-gray-700 font-medium">{party.puesto}</p>
                <p className="text-gray-500 text-sm">{party.descripcion}</p>
              </div>

              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={party.imagen}
                  alt={party.nombre}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>

              <div className="p-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </SimpleAccordionItem>

      {/* ===================================
          PLAN DE GOBIERNO
      =================================== */}
      <SimpleAccordionItem title="Plan de Gobierno">
        <p>
          El plan de gobierno de Acción Popular se centra en reducir la pobreza,
          fortalecer la institucionalidad, promover la conciencia ambiental
          y modernizar la gestión pública.
        </p>
      </SimpleAccordionItem>

      {/* ===================================
          OTRAS CANDIDATURAS + FILTROS
      =================================== */}
      <SimpleAccordionItem title="Otras Candidaturas">

        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Departamento */}
          <select
            className="border p-2 rounded-md"
            value={departamento}
            onChange={(e) => {
              setDepartamento(e.target.value);
              setProvincia("");
              setDistrito("");
            }}
          >
            <option value="">Seleccionar departamento</option>
            {departamentos.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          {/* Provincia */}
          <select
            className="border p-2 rounded-md"
            value={provincia}
            onChange={(e) => {
              setProvincia(e.target.value);
              setDistrito("");
            }}
            disabled={!departamento}
          >
            <option value="">Seleccionar provincia</option>
            {provincias.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>

          {/* Distrito */}
          <select
            className="border p-2 rounded-md"
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            disabled={!provincia}
          >
            <option value="">Seleccionar distrito</option>
            {distritos.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* TARJETAS EXACTAS AL ESTILO PLANCHA PRESIDENTIAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {filteredCandidatos.map((cand, index) => (
            <div
              key={index}
              className="w-full max-w-sm shadow-md border rounded-xl overflow-hidden bg-white"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold">{cand.nombre}</h3>
                <p className="text-gray-700 font-medium">{cand.puesto}</p>
                <p className="text-gray-500 text-sm">{cand.descripcion}</p>
                <p className="text-sm font-semibold text-blue-600 mt-1">
                  {cand.tipo}
                </p>
              </div>

              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={cand.imagen}
                  alt={cand.nombre}
                  className="h-44 w-44 object-cover rounded-md"
                />
              </div>

              <div className="p-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
                  Ver más
                </button>
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

export default politicalPartie;
