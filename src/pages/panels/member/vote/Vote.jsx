import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

// Icono Leaflet corregido
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

export default function LocationVotingMap() {
  const [userCoords, setUserCoords] = useState(null);
  const [votingPlace, setVotingPlace] = useState("");
  const [votingCoords, setVotingCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("No se pudo obtener la ubicación 😢")
    );
  };

  const searchVotingPlace = async () => {
    if (!votingPlace.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      votingPlace
    )}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) return alert("Lugar no encontrado");

    const place = data[0];
    const coords = {
      lat: Number(place.lat),
      lng: Number(place.lon),
    };
    setVotingCoords(coords);

    if (userCoords) calculateDistance(userCoords, coords);
  };

  const calculateDistance = (u, v) => {
    const R = 6371;
    const dLat = (v.lat - u.lat) * (Math.PI / 180);
    const dLon = (v.lng - u.lng) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(u.lat * (Math.PI / 180)) *
        Math.cos(v.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance((R * c).toFixed(2));
  };

  return (
    <div className="p-6 w-full flex flex-col items-center gap-6">

      {/* Contenedor de dos columnas */}
      <div className="flex w-full max-w-6xl gap-6">

        {/* Columna izquierda: Formulario y datos */}
        <div className="flex-1">
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Ubicación para Votación
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <Button onClick={getUserLocation} className="w-full bg-indigo-600">
                Usar mi ubicación actual
              </Button>

              <Input
                className="w-full"
                placeholder="Ingresa tu lugar de votación (dirección)"
                value={votingPlace}
                onChange={(e) => setVotingPlace(e.target.value)}
              />

              <Button onClick={searchVotingPlace} className="w-full">
                Buscar lugar de votación
              </Button>

              {distance && (
                <p className="text-center font-semibold text-green-600">
                  Distancia aproximada: {distance} km
                </p>
              )}

              {/* Botón ¿Cómo llegar? */}
              {userCoords && votingCoords && (
                <Button
                  className="mt-2 w-full bg-green-600"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/${userCoords.lat},${userCoords.lng}/${votingCoords.lat},${votingCoords.lng}/`,
                      "_blank"
                    );
                  }}
                >
                  ¿Cómo llegar?
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

       {/* Columna derecha: Mapa */}
            <div className="flex-1">
            {userCoords && votingCoords && (
                <MapContainer
                center={userCoords}
                zoom={14}
                className="h-96 w-full rounded-lg shadow-lg"
                >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={userCoords} icon={markerIcon} />
                <Marker position={votingCoords} icon={markerIcon} />

                <Polyline positions={[userCoords, votingCoords]} />
                </MapContainer>
            )}
            </div>


      </div>
    </div>
  );
}
