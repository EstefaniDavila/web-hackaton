export const candidaturasData = [
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
  }
];

export const political_parties = [
  {
    id: 1,
    nombre: "Fuerza Popular",
    descripcion: "Partido con enfoque económico liberal.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_Partido_Democr%C3%A1tico_Somos_Per%C3%BA.svg",

    plancha: [
      {
        nombre: "Keiko Fujimori",
        puesto: "Presidenta del Perú",
        imagen: "https://randomuser.me/api/portraits/women/12.jpg",
        descripcion: "Lo está intentando desde que nací"
      },
      {
        nombre: "Daniel Cabrera",
        puesto: "Primer vicepresidente",
        imagen: "https://randomuser.me/api/portraits/men/22.jpg",
        descripcion: "Partido moderno con visión de futuro."
      },
      {
        nombre: "Estefani Davila",
        puesto: "Segunda vicepresidenta",
        imagen: "https://randomuser.me/api/portraits/women/34.jpg",
        descripcion: "Tradición democrática y social es mi lema."
      }
    ],

    otras_candidaturas: candidaturasData
  },

  {
    id: 2,
    nombre: "Partido Morado",
    descripcion: "Partido moderno con visión progresista.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Partido_Morado_logo.svg",
    plancha: [],
    otras_candidaturas: [],
  }
];
