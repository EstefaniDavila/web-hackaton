import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'

const Candidant = () => {

  const [search, setSearch] = useState("")
  const [parties, setParties] = useState([])
  const navigate = useNavigate()

 useEffect(() => {
  fetch("https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/member/political_parties", {
    headers: {
      "ngrok-skip-browser-warning": "true"
    }
  })
    .then(res => res.json())
    .then(data => {
      setParties(data)
    })
    .catch(err => console.log("Error cargando partidos:", err))
}, [])


  const filteredParties = parties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.acronym.toLowerCase().includes(search.toLowerCase())
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
        {filteredParties.map((party) => (
          <Card
            key={party.id}
            className="w-full max-w-sm shadow-md border rounded-xl overflow-hidden bg-flash-400"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">
                {party.name}
              </CardTitle>

              <CardDescription className="text-gray-700">
                Acrónimo: <strong>{party.acronym}</strong>
              </CardDescription>
            </CardHeader>

            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={party.logo ?? "https://via.placeholder.com/150?text=Sin+Logo"}
                alt="Logo"
                className="h-32 w-32 object-contain"
              />
            </div>

            <CardContent className="mt-4">
              <p className="text-sm text-gray-700">
                Representante:{" "}
                <span className="font-semibold">
                  {party.representative?.full_name ?? "No registrado"}
                </span>
              </p>
            </CardContent>

            <CardFooter className="mt-4">
              <Button
                className="w-full font-semibold"
                onClick={() => navigate(`/candidatos/${party.id}`,{state:party})}
              >
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
