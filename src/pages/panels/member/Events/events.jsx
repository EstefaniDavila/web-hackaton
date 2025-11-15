import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";


const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); 
};

// Lista de eventos con fechas locales
const initialEvents = [
  { name: "Elecciones hoy", date: parseLocalDate("2025-11-18"), place: "Lugar de Votación" },
  { name: "Elecciones hoy", date: parseLocalDate("2026-03-17"), place: "Lugar de Votación" },
  { name: "Capacitación miembros de mesa", date: parseLocalDate("2026-02-22"), place: "Virtual - Zoom" },
];

export default function MeetingsCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);

  // Función para saber si un evento está cerca (3 días antes)
  const isNearEvent = (eventDate) => {
    const today = new Date();
    // Solo fecha, sin tiempo
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = eventDate - todayLocal;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays <= 3;
  };

  // Fechas del calendario con eventos
  const eventDates = events.map((e) => e.date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-white min-h-screen">
      {/* IZQUIERDA */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-black">
          Próximos Eventos
        </h2>

        <div className="space-y-6">
          {events.map((m, i) => {
            const near = isNearEvent(m.date);

            return (
              <Card
                key={i}
                className={cn(
                  "border-none text-white transition-all",
                  near ? "bg-red-700 shadow-lg shadow-red-400" : "bg-[#1e293b]"
                )}
              >
                <CardContent className="flex gap-4 p-5">
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{m.name}</p>

                    <div className="flex items-center text-gray-300 gap-2 text-sm">
                      <CalendarIcon size={15} />
                      <span>{m.date.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center text-gray-400 gap-2 text-sm">
                      <MapPin size={15} />
                      <span>{m.place}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex flex-col items-center gap-6">
        <Card className="bg-[#1e293b] border-none text-white p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              event: eventDates, // ya son objetos Date locales
            }}
            modifiersStyles={{
              event: {
                backgroundColor: "#facc15", // amarillo
                color: "black",
                borderRadius: "8px",
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
}
