import React, { useState } from "react";

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Agrupación Política Fuerza Popular
      </h2>

      {/* ACCORDION */}
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

          {filteredParties.length === 0 && (
            <p className="text-gray-500">No se encontraron candidatos.</p>
          )}
        </div>
      </SimpleAccordionItem>

      <SimpleAccordionItem title="Shipping Details">
        <p>
          We offer worldwide shipping through trusted courier partners. Standard
          delivery takes 3-5 business days.
        </p>
      </SimpleAccordionItem>

      <SimpleAccordionItem title="Return Policy">
        <p>30-day return policy. Free return shipping.</p>
      </SimpleAccordionItem>
    </div>
  );
};

export default politicalPartie;
