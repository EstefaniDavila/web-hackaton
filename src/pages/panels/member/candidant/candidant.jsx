import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Lista de partidos políticos
const political_parties = [
  {
    nombre: 'Somos Perú',
    description: 'Somos un partido muy bonito.',
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_Partido_Democr%C3%A1tico_Somos_Per%C3%BA.svg",
    fecha: "15/03/1997"
  },
  {
    nombre: 'Partido Morado',
    description: 'Partido moderno con visión de futuro.',
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoBJlOyEu_u1rIl395cSbolf27Ym-iYaIXA&s",
    fecha: "10/12/2016"
  },
  {
    nombre: 'Acción Popular',
    description: 'Tradición democrática y social.',
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Acci%C3%B3n_Popular.svg/1200px-Acci%C3%B3n_Popular.svg.png",
    fecha: "07/07/1956"
  },
  {
    nombre: 'Somos Perú',
    description: 'Somos un partido muy bonito.',
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_Partido_Democr%C3%A1tico_Somos_Per%C3%BA.svg",
    fecha: "15/03/1997"
  },
  {
    nombre: 'Partido Morado',
    description: 'Partido moderno con visión de futuro.',
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoBJlOyEu_u1rIl395cSbolf27Ym-iYaIXA&s",
    fecha: "10/12/2016"
  },
  {
    nombre: 'Acción Popular',
    description: 'Tradición democrática y social.',
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Acci%C3%B3n_Popular.svg/1200px-Acci%C3%B3n_Popular.svg.png",
    fecha: "07/07/1956"
  },
]

const Candidant = () => {

  const [search, setSearch] = useState("")

  // Filtrar partidos según la búsqueda
  const filteredParties = political_parties.filter(p => 
    p.nombre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full flex flex-col items-center p-6 gap-6">

      <h1 className="text-black font-bold text-2xl">
        PARTIDOS POLÍTICOS
      </h1>

      {/* Buscador */}
      <div className="w-full max-w-md">
        <Input
          placeholder="Buscar partido político..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2"
        />
      </div>

      {/* Tarjetas dinámicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
        {filteredParties.map((party, index) => (
          <Card
            key={index}
            className="w-full max-w-sm shadow-md border rounded-xl overflow-hidden bg-flash-400"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">
                {party.nombre}
              </CardTitle>
              <CardDescription>
                {party.description}
              </CardDescription>
            </CardHeader>

            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={party.logo}
                alt="Logo"
                className="h-32 w-32 object-contain"
              />
            </div>

            <CardContent className="mt-4">
              <p className="text-sm text-gray-700">
                Este partido fue creado el{" "}
                <span className="font-semibold">{party.fecha}</span>.
              </p>
            </CardContent>

            <CardFooter className="mt-4">
              <Button className="w-full font-semibold">
                Ver más
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredParties.length === 0 && (
        <p className="text-gray-500">No se encontraron partidos.</p>
      )}

    </div>
  )
}

export default Candidant
