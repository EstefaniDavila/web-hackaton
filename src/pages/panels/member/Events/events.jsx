import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const initialEvents = [
  { name: "Elecciones hoy", date: parseLocalDate("2025-11-18"), place: "Lugar de Votación" },
  { name: "Elecciones hoy", date: parseLocalDate("2026-03-17"), place: "Lugar de Votación" },
  { name: "Capacitación miembros de mesa", date: parseLocalDate("2026-02-22"), place: "Virtual - Zoom" },
];

export default function MeetingsCalendar() {
  const [date, setDate] = useState(new Date());
  const [events] = useState(initialEvents);

  const isNearEvent = (eventDate) => {
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = (eventDate - todayLocal) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  const eventDates = events.map((e) => e.date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-6 w-full min-h-[85vh] place-items-start ">

      {/* IZQUIERDA */}
      <div className="w-full max-w-xl">
        <h2 className="text-center text-4xl font-extrabold mb-6 text-gray-800">
          Próximos Eventos
        </h2>

        <div className="space-y-2">
          {events.map((m, i) => {
            const near = isNearEvent(m.date);

            return (
              <Card
                key={i}
                onClick={() => setDate(m.date)} // 👈 Al hacer clic, mueve el calendario
                className={cn(
                  "cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border-none",
                  near ? "bg-yellow-100" : "bg-white"
                )}
              >
                <CardContent className="flex gap-4 p-5">
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-gray-900 text-xl">{m.name}</p>

                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarIcon size={18} />
                      <span className="text-lg">{m.date.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} />
                      <span className="text-lg">{m.place}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* DERECHA — CALENDARIO CENTRADO Y MÁS GRANDE */}
      <div className="flex flex-col items-center justify-center w-full">
        <Card className="bg-white border-none shadow-lg m-10 w-fit scale-110">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              event: eventDates,
            }}
            modifiersStyles={{
              event: {
                backgroundColor: "#facc15",
                color: "black",
                borderRadius: "6px",
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
}
