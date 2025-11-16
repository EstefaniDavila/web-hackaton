import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import useFetchEvents from "@/composables/events/hooks/useFetchEvents";
import { TbPlus } from 'react-icons/tb' 
import { Button } from '@/components/ui/button'
import ModalNewEvent from "@/composables/events/Modals/modalNewEvent";

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
  const [typeModal, setTypeModal] = useState("")
  const [event, setEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const [search, setSearch] = useState("")
  const [searchFields, setSearchFields] = useState(["tittle"])

  const searchParams = {search, fields: searchFields.join(',') }
  const { data: eventsData, refetch: refetchEvents } = useFetchEvents(pagination, searchParams)

  const parseApiDate = (dateString) => {
    return new Date(dateString);
  };

  const isNearEvent = (eventDate) => {
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = (eventDate - todayLocal) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  // const eventDates = events.map((e) => e.date);
  // Para el calendario, necesitamos convertir las fechas de la API a objetos Date
  const eventDates = [
    ...events.map((e) => e.date),
    ...(eventsData?.events?.map(event => parseApiDate(event.date)) || [])
  ];

  const handleOpenModal = (type, data = null) => {
    setIsModalOpen(true)
    setTypeModal(type)
    setEvent(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal("")
    setEvent(null)
  }

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-6 w-full min-h-[85vh] place-items-start ">

      {/* IZQUIERDA */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Próximos Eventos
          </h2>

          <Button
            variant="outline"
            onClick={() => handleOpenModal("new")}
            className="bg-amberCustom text-black hover:bg-amber-600"
          >
            <TbPlus />
          </Button>
        </div>

        <div className="space-y-2">
          {eventsData?.events?.map((m, i) => {
            const eventDate = parseApiDate(m.date);
            const near = isNearEvent(eventDate);

            return (
              <Card
                key={i}
                onClick={() => setDate(eventDate)}
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
                      <span className="text-lg">{eventDate.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} />
                      <span className="text-lg">{m.description || 'Sin descripción'}</span>
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
    {typeModal === 'new' && (
      <ModalNewEvent
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        typeModal={typeModal}
        fetchData={refetchEvents}
      />
    )}
    {/*
    {typeModal === 'edit' && (
      <ModalUpdateCategory
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        category={category}
        fetchData={refetchCategories}
      />
    )} */}
    </>
  );
}
