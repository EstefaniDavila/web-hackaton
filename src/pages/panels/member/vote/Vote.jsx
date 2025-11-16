import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icono personalizado
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

export default function LugarVotacion() {
  const [userCoords, setUserCoords] = useState(null);
  const [votingPlace, setVotingPlace] = useState("Calle la Merced 504 Arequipa");
  const [votingCoords, setVotingCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("No se pudo obtener la ubicación")
    );
  };

  const searchVotingPlace = async () => {
    if (!votingPlace.trim()) return alert("Ingresa una dirección");

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      votingPlace
    )}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.length === 0) return alert("Lugar no encontrado");

      const coords = { lat: Number(data[0].lat), lng: Number(data[0].lon) };
      setVotingCoords(coords);

      if (userCoords) calculateDistance(userCoords, coords);
    } catch {
      alert("Error realizando la búsqueda");
    }
  };

  const calculateDistance = (start, end) => {
    const R = 6371;
    const dLat = ((end.lat - start.lat) * Math.PI) / 180;
    const dLng = ((end.lng - start.lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(start.lat * (Math.PI / 180)) *
        Math.cos(end.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance((R * c).toFixed(2));
  };

  const openGoogleMaps = () => {
    if (!userCoords || !votingCoords) return alert("Debes obtener ambas ubicaciones");
    window.open(
      `https://www.google.com/maps/dir/${userCoords.lat},${userCoords.lng}/${votingCoords.lat},${votingCoords.lng}`,
      "_blank"
    );
  };

  return (
    <div className="text-black text-xl space-y-6 p-4 sm:p-6 lg:p-10">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-900">
        ¿DÓNDE TE TOCA VOTAR?
      </h1>

      {/* Botones ONPE */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
        <Button
          onClick={() =>
            window.open(
              "https://eg2026.onpe.gob.pe/para-electores/elige-tu-local-de-votacion/",
              "_blank"
            )
          }
          className="w-full sm:w-auto"
        >
          Conoce tu Lugar de Votación
        </Button>

        <Button
          onClick={() =>
            window.open(
              "https://eg2026.onpe.gob.pe/para-electores/elige-tu-local-de-votacion/",
              "_blank"
            )
          }
          className="w-full sm:w-auto"
        >
          Elige tu Lugar de Votación
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Panel de acciones */}
        <Card className="flex-1 m-2 lg:m-4">
          <CardHeader>
            <CardTitle>¿Cómo llegar a tu lugar de votación?</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full"
              onClick={getUserLocation}
            >
              Usar mi ubicación actual
            </Button>

            <Input
              placeholder="Ingresa tu lugar de votación (dirección)"
              value={votingPlace}
              onChange={(e) => setVotingPlace(e.target.value)}
              className="rounded-full py-4 px-5 text-lg"
            />

            <Button
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full"
              onClick={searchVotingPlace}
            >
              Buscar lugar de votación
            </Button>

            {distance && (
              <p className="text-green-600 font-bold">Distancia aproximada: {distance} km</p>
            )}

            <Button
              className="w-full sm:w-1/2 bg-green-600 text-white font-semibold py-3 rounded-full"
              onClick={openGoogleMaps}
              disabled={!userCoords || !votingCoords}
            >
              ¿Cómo llegar?
            </Button>
          </CardContent>
        </Card>

        {/* Mapa */}
        <div className="flex-1 m-2 lg:m-4">
          {votingCoords ? (
            <MapContainer
              center={votingCoords}
              zoom={16}
              scrollWheelZoom={false}
              className="h-[350px] sm:h-[450px] w-full rounded-2xl overflow-hidden"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={votingCoords} icon={markerIcon} />
            </MapContainer>
          ) : (
            <div className="h-[350px] sm:h-[450px] bg-blue-200 rounded-2xl flex items-center justify-center text-center p-4">
              <p>Ingresa y busca tu lugar de votación para mostrar el mapa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}