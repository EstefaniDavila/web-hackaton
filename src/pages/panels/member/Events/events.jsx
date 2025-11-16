import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MeetingsCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Leer usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("current_user"));
  const isMesaMember = user?.member_role === "mesa_member";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/events",
          {
            headers: {
              "ngrok-skip-browser-warning": "1",
            },
          }
        );

        const data = await res.json();

        // Convertir fecha ISO → objeto Date
        const parsed = data.map((e) => ({
          ...e,
          date: new Date(e.date),
        }));

        // FILTRO según type_member
        const filtered = parsed.filter((evt) => {
          if (evt.type_member === 0) return true; // Todos
          if (evt.type_member === 1 && isMesaMember) return true; // Solo mesa
          return false;
        });

        setEvents(filtered);
      } catch (err) {
        console.log("Error cargando eventos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isMesaMember]);

  if (loading) return <p className="p-6">Cargando eventos…</p>;

  const eventDates = events.map((e) => e.date);

  const isNearEvent = (eventDate) => {
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = (eventDate - todayLocal) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-6 w-full min-h-[85vh] place-items-start ">
      
      {/* LISTA IZQUIERDA */}
      <div className="w-full max-w-xl">
        <h2 className="text-center text-4xl font-extrabold mb-6 text-gray-800">
          Próximos Eventos
        </h2>

        {events.length === 0 && (
          <p className="text-gray-500 text-center">No hay eventos disponibles.</p>
        )}

        <div className="space-y-2">
          {events.map((m, i) => {
            const near = isNearEvent(m.date);

            return (
              <Card
                key={i}
                onClick={() => setDate(m.date)}
                className={cn(
                  "cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border-none",
                  near ? "bg-yellow-100" : "bg-white"
                )}
              >
                <CardContent className="flex gap-4 p-5">
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-gray-900 text-xl">{m.tittle}</p>

                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarIcon size={18} />
                      <span className="text-lg">{m.date.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} />
                      <span className="text-lg">{m.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CALENDARIO DERECHA */}
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
